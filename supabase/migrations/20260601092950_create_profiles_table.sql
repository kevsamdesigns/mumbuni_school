-- Create profiles table with role-based fields
create table profiles (
  user_id uuid references auth.users not null primary key,
  role text not null check (role in ('student', 'teacher', 'admin')),
  
  -- Student fields
  admission_no text unique,
  full_name text,
  form text,
  stream text,
  gender text,
  parent_name text,
  parent_phone text,
  kcpe_index text,
  approved boolean default false,
  
  -- Teacher fields
  staff_no text unique,
  national_id text,
  tsc_no text,
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
  
  -- Common fields
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for profiles
alter table profiles enable row level security;

-- Create indexes for faster lookups
create index idx_profiles_role on profiles (role);
create index idx_profiles_admission_no on profiles (admission_no);
create index idx_profiles_staff_no on profiles (staff_no);

-- Create function to update timestamps
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for timestamp updates
create trigger handle_updated_at before update on profiles
  for each row execute procedure update_updated_at();