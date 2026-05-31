-- Admin invitation flow
create table if not exists public.admin_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  invited_by uuid,
  created_at timestamptz not null default now(),
  consumed_at timestamptz,
  consumed_by uuid
);

alter table public.admin_invites enable row level security;

create policy "Admins manage invites"
on public.admin_invites for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Users view own invite"
on public.admin_invites for select
to authenticated
using (lower(email) = lower((auth.jwt() ->> 'email')));

-- Claim function: promotes the calling user to admin if their verified email
-- matches a pending invite. Uses SECURITY DEFINER to bypass RLS safely.
create or replace function public.claim_admin_invite()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := lower(auth.jwt() ->> 'email');
  v_invite_id uuid;
begin
  if v_user_id is null or v_email is null then
    raise exception 'Not authenticated';
  end if;

  select id into v_invite_id
  from public.admin_invites
  where lower(email) = v_email and consumed_at is null
  limit 1;

  if v_invite_id is null then
    return false;
  end if;

  insert into public.user_roles (user_id, role)
  values (v_user_id, 'admin')
  on conflict do nothing;

  update public.admin_invites
  set consumed_at = now(), consumed_by = v_user_id
  where id = v_invite_id;

  return true;
end;
$$;

-- Seed bootstrap invite for the project owner
insert into public.admin_invites (email)
values ('kevinwambua96@gmail.com')
on conflict (email) do nothing;
