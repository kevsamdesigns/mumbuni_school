BEGIN;

CREATE OR REPLACE FUNCTION public.is_approved_teacher(_user_id uuid)
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
      AND role = 'teacher'
      AND approved = true
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_approved_teacher(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_approved_teacher(uuid) TO authenticated;

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own non-admin profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Approved teachers view students" ON public.profiles;

CREATE POLICY "Users insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

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
  AND public.is_approved_teacher(auth.uid())
);

COMMIT;
