-- =====================================================
-- TRAMPO NO CAMPO - SUPABASE DATABASE SETUP
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- 1. Create custom types/enums
create type public.app_role as enum ('professional', 'employer');
create type public.availability_status as enum ('available', 'not_available', 'open_to_offers');
create type public.employer_type as enum ('farm', 'cooperative', 'retailer', 'service_provider');
create type public.job_type as enum ('permanent', 'seasonal');
create type public.application_status as enum ('applied', 'shortlisted', 'rejected', 'hired');

-- 2. Create user_roles table (for secure role management)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role app_role not null,
  created_at timestamptz default now() not null
);

alter table public.user_roles enable row level security;

-- 3. Create security definer function to check roles (prevents RLS recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 4. Create professional_profiles table
create table public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text not null default '',
  photo_url text,
  city text not null default '',
  state text not null default '',
  main_role text not null default '',
  years_experience integer not null default 0,
  availability availability_status not null default 'available',
  bio text not null default '',
  skills text[] not null default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.professional_profiles enable row level security;

-- 5. Create employer_profiles table
create table public.employer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  company_name text not null default '',
  city text not null default '',
  state text not null default '',
  employer_type employer_type not null default 'farm',
  description text not null default '',
  contact_phone text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.employer_profiles enable row level security;

-- 6. Create jobs table
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  city text not null,
  state text not null,
  job_type job_type not null default 'permanent',
  requirements text not null,
  salary text,
  benefits text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.jobs enable row level security;

-- 7. Create applications table
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  professional_id uuid references auth.users(id) on delete cascade not null,
  status application_status not null default 'applied',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(job_id, professional_id)
);

alter table public.applications enable row level security;

-- 8. Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references auth.users(id) on delete cascade not null,
  to_user_id uuid references auth.users(id) on delete cascade not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz default now() not null
);

alter table public.messages enable row level security;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- user_roles policies
create policy "Users can read own role"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

-- professional_profiles policies
create policy "Anyone can view professional profiles"
  on public.professional_profiles for select
  to authenticated
  using (true);

create policy "Users can update own professional profile"
  on public.professional_profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own professional profile"
  on public.professional_profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- employer_profiles policies
create policy "Anyone can view employer profiles"
  on public.employer_profiles for select
  to authenticated
  using (true);

create policy "Users can update own employer profile"
  on public.employer_profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own employer profile"
  on public.employer_profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- jobs policies
create policy "Anyone can view jobs"
  on public.jobs for select
  to authenticated
  using (true);

create policy "Employers can create jobs"
  on public.jobs for insert
  to authenticated
  with check (
    auth.uid() = employer_id 
    and public.has_role(auth.uid(), 'employer')
  );

create policy "Employers can update own jobs"
  on public.jobs for update
  to authenticated
  using (auth.uid() = employer_id);

create policy "Employers can delete own jobs"
  on public.jobs for delete
  to authenticated
  using (auth.uid() = employer_id);

-- applications policies
create policy "Professionals can view own applications"
  on public.applications for select
  to authenticated
  using (
    auth.uid() = professional_id 
    or exists (
      select 1 from public.jobs 
      where jobs.id = applications.job_id 
      and jobs.employer_id = auth.uid()
    )
  );

create policy "Professionals can create applications"
  on public.applications for insert
  to authenticated
  with check (
    auth.uid() = professional_id 
    and public.has_role(auth.uid(), 'professional')
  );

create policy "Employers can update applications to their jobs"
  on public.applications for update
  to authenticated
  using (
    exists (
      select 1 from public.jobs 
      where jobs.id = applications.job_id 
      and jobs.employer_id = auth.uid()
    )
  );

-- messages policies
create policy "Users can view own messages"
  on public.messages for select
  to authenticated
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

create policy "Users can send messages"
  on public.messages for insert
  to authenticated
  with check (auth.uid() = from_user_id);

create policy "Users can mark messages as read"
  on public.messages for update
  to authenticated
  using (auth.uid() = to_user_id);

-- =====================================================
-- TRIGGER: Auto-create role and profile on signup
-- =====================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_role app_role;
begin
  -- Get role from user metadata (set during signup)
  user_role := (new.raw_user_meta_data->>'role')::app_role;
  
  -- If no role specified, default to 'professional'
  if user_role is null then
    user_role := 'professional';
  end if;
  
  -- Create user_roles entry
  insert into public.user_roles (user_id, role)
  values (new.id, user_role);
  
  -- Create empty profile based on role
  if user_role = 'professional' then
    insert into public.professional_profiles (user_id)
    values (new.id);
  else
    insert into public.employer_profiles (user_id)
    values (new.id);
  end if;
  
  return new;
end;
$$;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- DEMO DATA (Optional - for testing)
-- =====================================================

-- Note: Demo users must be created through Supabase Auth
-- After creating users via Auth, run the following to add demo data:

-- Example: After creating demo professional user with ID 'PROFESSIONAL_USER_ID':
-- insert into public.professional_profiles (user_id, full_name, city, state, main_role, years_experience, availability, bio, skills)
-- values ('PROFESSIONAL_USER_ID', 'João Silva', 'Ribeirão Preto', 'SP', 'Operador de Máquinas', 5, 'available', 'Profissional experiente...', array['Colheitadeira', 'Trator']);

-- Example: After creating demo employer user with ID 'EMPLOYER_USER_ID':
-- insert into public.employer_profiles (user_id, company_name, city, state, employer_type, description, contact_phone)
-- values ('EMPLOYER_USER_ID', 'Fazenda Santa Maria', 'Ribeirão Preto', 'SP', 'farm', 'Fazenda de grande porte...', '(16) 99999-0000');
