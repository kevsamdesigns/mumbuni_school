BEGIN;

-- Reset old app-owned schema objects so the database matches the current app.
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;
DROP TABLE IF EXISTS public.admin_invites CASCADE;
DROP TABLE IF EXISTS public.results CASCADE;
DROP TABLE IF EXISTS public.media_items CASCADE;
DROP TABLE IF EXISTS public.content_blocks CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.claim_admin_invite() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;

CREATE TABLE public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),

  admission_no text UNIQUE,
  full_name text,
  form text,
  stream text,
  gender text,
  parent_name text,
  parent_phone text,
  kcpe_index text,
  kcpe_assessment text,

  staff_no text UNIQUE,
  national_id text,
  tsc_no text,
  date_of_birth date,
  phone text,
  email text,
  department text,
  subject1 text,
  subject2 text,
  qualification text,
  employment_type text,
  date_joined date,
  address text,
  emergency_contact text,
  passport_photo text,

  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_role ON public.profiles (role);
CREATE INDEX idx_profiles_admission_no ON public.profiles (admission_no);
CREATE INDEX idx_profiles_staff_no ON public.profiles (staff_no);

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = 'admin'
      AND approved = true
  )
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Users update own non-admin profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND role <> 'admin');

CREATE POLICY "Admins manage profiles"
ON public.profiles FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Approved teachers view students"
ON public.profiles FOR SELECT
TO authenticated
USING (
  role = 'student'
  AND EXISTS (
    SELECT 1
    FROM public.profiles teacher_profile
    WHERE teacher_profile.user_id = auth.uid()
      AND teacher_profile.role = 'teacher'
      AND teacher_profile.approved = true
  )
);

CREATE TABLE public.content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  kind text NOT NULL DEFAULT 'text',
  value text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page, section)
);

CREATE TRIGGER content_blocks_updated_at
BEFORE UPDATE ON public.content_blocks
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read content"
ON public.content_blocks FOR SELECT
USING (true);

CREATE POLICY "Admins manage content"
ON public.content_blocks FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection text NOT NULL,
  storage_path text NOT NULL,
  alt text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read media"
ON public.media_items FOR SELECT
USING (true);

CREATE POLICY "Admins manage media"
ON public.media_items FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_no text NOT NULL,
  student_name text,
  term text NOT NULL,
  year integer NOT NULL,
  subject text NOT NULL,
  marks numeric NOT NULL,
  grade text,
  remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (admission_no, term, year, subject)
);

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own results"
ON public.results FOR SELECT
TO authenticated
USING (
  public.is_admin(auth.uid())
  OR admission_no = (
    SELECT admission_no
    FROM public.profiles
    WHERE user_id = auth.uid()
      AND role = 'student'
      AND approved = true
  )
);

CREATE POLICY "Admins manage results"
ON public.results FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.admin_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz,
  consumed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage invites"
ON public.admin_invites FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Users view own invite"
ON public.admin_invites FOR SELECT
TO authenticated
USING (lower(email) = lower(auth.jwt() ->> 'email'));

CREATE OR REPLACE FUNCTION public.claim_admin_invite()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text := lower(auth.jwt() ->> 'email');
  v_invite_id uuid;
BEGIN
  IF v_user_id IS NULL OR v_email IS NULL THEN
    RETURN false;
  END IF;

  SELECT id INTO v_invite_id
  FROM public.admin_invites
  WHERE lower(email) = v_email
    AND consumed_at IS NULL
  LIMIT 1;

  IF v_invite_id IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.profiles (user_id, role, full_name, email, approved)
  VALUES (v_user_id, 'admin', coalesce(auth.jwt() ->> 'email', ''), v_email, true)
  ON CONFLICT (user_id) DO UPDATE
    SET role = 'admin',
        email = excluded.email,
        approved = true,
        updated_at = now();

  UPDATE public.admin_invites
  SET consumed_at = now(),
      consumed_by = v_user_id
  WHERE id = v_invite_id;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_admin_invite() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin_invite() TO authenticated;

INSERT INTO public.admin_invites (email)
VALUES ('kevinwambua96@gmail.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('site-media', 'site-media', true),
  ('teacher-photos', 'teacher-photos', true)
ON CONFLICT (id) DO UPDATE SET public = excluded.public;

DROP POLICY IF EXISTS "Public read site-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload site-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins update site-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete site-media" ON storage.objects;
DROP POLICY IF EXISTS "Public read teacher-photos" ON storage.objects;
DROP POLICY IF EXISTS "Users upload teacher photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins manage teacher photos" ON storage.objects;

CREATE POLICY "Public read site-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-media');

CREATE POLICY "Admins upload site-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins update site-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-media' AND public.is_admin(auth.uid()))
WITH CHECK (bucket_id = 'site-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins delete site-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Public read teacher-photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'teacher-photos');

CREATE POLICY "Users upload teacher photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'teacher-photos' AND owner = auth.uid());

CREATE POLICY "Admins manage teacher photos"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'teacher-photos' AND public.is_admin(auth.uid()))
WITH CHECK (bucket_id = 'teacher-photos' AND public.is_admin(auth.uid()));

COMMIT;
