
-- Fix search_path on remaining functions
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

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

-- Restrict EXECUTE so anon/authenticated cannot call security-definer fns directly via PostgREST
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Replace overly broad public storage SELECT policy with one that doesn't allow listing
drop policy if exists "Public read site-media" on storage.objects;
-- Direct object access via /object/public/site-media/<path> still works with bucket marked public,
-- so we don't need a SELECT policy for object reads. We only re-add a narrow policy for authenticated listing by admins.
create policy "Admins list site-media" on storage.objects for select to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
