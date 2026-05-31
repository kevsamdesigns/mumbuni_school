
-- ============ ROLES ============
create type public.app_role as enum ('admin', 'student');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ PROFILES (students) ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  admission_no text unique,
  email text,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Users view own profile" on public.profiles for select to authenticated
  using (auth.uid() = id or public.has_role(auth.uid(), 'admin'));
create policy "Users update own profile" on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins update any profile" on public.profiles for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete profiles" on public.profiles for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Insert own profile" on public.profiles for insert to authenticated
  with check (auth.uid() = id);

-- Trigger: auto-create profile + assign student role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, admission_no)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    nullif(new.raw_user_meta_data->>'admission_no', '')
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'student')
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

-- ============ CONTENT BLOCKS (CMS) ============
create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  page text not null,           -- e.g. 'home', 'about'
  section text not null,        -- e.g. 'hero.title', 'principal.message'
  kind text not null default 'text', -- text | richtext | image | url | number
  value text,
  updated_at timestamptz not null default now(),
  unique (page, section)
);
alter table public.content_blocks enable row level security;

create policy "Public read content" on public.content_blocks for select using (true);
create policy "Admins write content" on public.content_blocks for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create trigger content_blocks_updated_at before update on public.content_blocks
for each row execute function public.set_updated_at();

-- ============ MEDIA (gallery / hero images) ============
create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  collection text not null,     -- 'gallery' | 'hero'
  storage_path text not null,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.media_items enable row level security;

create policy "Public read media" on public.media_items for select using (true);
create policy "Admins manage media" on public.media_items for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ RESULTS ============
create table public.results (
  id uuid primary key default gen_random_uuid(),
  admission_no text not null,
  student_name text,
  term text not null,           -- e.g. 'Term 1'
  year int not null,
  subject text not null,
  marks numeric not null,
  grade text,
  remarks text,
  created_at timestamptz not null default now(),
  unique (admission_no, term, year, subject)
);
alter table public.results enable row level security;

create policy "Students view own results" on public.results for select to authenticated
  using (
    public.has_role(auth.uid(), 'admin')
    or admission_no = (select admission_no from public.profiles where id = auth.uid())
  );
create policy "Admins manage results" on public.results for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE BUCKET for media ============
insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "Public read site-media" on storage.objects for select
  using (bucket_id = 'site-media');
create policy "Admins upload site-media" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update site-media" on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete site-media" on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
