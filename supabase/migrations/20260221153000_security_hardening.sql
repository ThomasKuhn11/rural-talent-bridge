-- Security hardening migration for frontend-only Supabase architecture.
-- Ensures RLS is enabled and ownership is enforced with auth.uid().

-- Enable RLS on all application tables.
alter table if exists public.user_roles enable row level security;
alter table if exists public.professional_profiles enable row level security;
alter table if exists public.employer_profiles enable row level security;
alter table if exists public.jobs enable row level security;
alter table if exists public.applications enable row level security;
alter table if exists public.messages enable row level security;

-- Remove legacy policies if they exist so this migration is idempotent.
drop policy if exists "user_roles_select_own" on public.user_roles;
drop policy if exists "user_roles_insert_own" on public.user_roles;
drop policy if exists "user_roles_update_own" on public.user_roles;
drop policy if exists "user_roles_delete_own" on public.user_roles;

drop policy if exists "professional_profiles_select_allowed" on public.professional_profiles;
drop policy if exists "professional_profiles_insert_own" on public.professional_profiles;
drop policy if exists "professional_profiles_update_own" on public.professional_profiles;
drop policy if exists "professional_profiles_delete_own" on public.professional_profiles;

drop policy if exists "employer_profiles_select_allowed" on public.employer_profiles;
drop policy if exists "employer_profiles_insert_own" on public.employer_profiles;
drop policy if exists "employer_profiles_update_own" on public.employer_profiles;
drop policy if exists "employer_profiles_delete_own" on public.employer_profiles;

drop policy if exists "jobs_select_authenticated" on public.jobs;
drop policy if exists "jobs_insert_own" on public.jobs;
drop policy if exists "jobs_update_own" on public.jobs;
drop policy if exists "jobs_delete_own" on public.jobs;

drop policy if exists "applications_select_allowed" on public.applications;
drop policy if exists "applications_insert_own" on public.applications;
drop policy if exists "applications_update_employer_owned_jobs" on public.applications;
drop policy if exists "applications_delete_own" on public.applications;

drop policy if exists "messages_select_participant" on public.messages;
drop policy if exists "messages_insert_sender_only" on public.messages;
drop policy if exists "messages_update_recipient_only" on public.messages;
drop policy if exists "messages_delete_participant" on public.messages;

-- user_roles: each user can only manage their own role row.
create policy "user_roles_select_own"
on public.user_roles
for select
using (user_id = auth.uid());

create policy "user_roles_insert_own"
on public.user_roles
for insert
with check (user_id = auth.uid());

create policy "user_roles_update_own"
on public.user_roles
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "user_roles_delete_own"
on public.user_roles
for delete
using (user_id = auth.uid());

-- professional_profiles:
-- - professionals can fully manage their own profile
-- - employers can read profiles only if the professional has applied to one of their jobs
create policy "professional_profiles_select_allowed"
on public.professional_profiles
for select
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.applications a
    join public.jobs j on j.id = a.job_id
    where a.professional_id = professional_profiles.user_id
      and j.employer_id = auth.uid()
  )
);

create policy "professional_profiles_insert_own"
on public.professional_profiles
for insert
with check (user_id = auth.uid());

create policy "professional_profiles_update_own"
on public.professional_profiles
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "professional_profiles_delete_own"
on public.professional_profiles
for delete
using (user_id = auth.uid());

-- employer_profiles:
-- - employers can fully manage their own profile
-- - authenticated users can read profiles for employers with active jobs
create policy "employer_profiles_select_allowed"
on public.employer_profiles
for select
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.jobs j
    where j.employer_id = employer_profiles.user_id
  )
);

create policy "employer_profiles_insert_own"
on public.employer_profiles
for insert
with check (user_id = auth.uid());

create policy "employer_profiles_update_own"
on public.employer_profiles
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "employer_profiles_delete_own"
on public.employer_profiles
for delete
using (user_id = auth.uid());

-- jobs:
-- - authenticated users can browse jobs
-- - only job owners can create/update/delete their own rows
create policy "jobs_select_authenticated"
on public.jobs
for select
using (auth.uid() is not null);

create policy "jobs_insert_own"
on public.jobs
for insert
with check (employer_id = auth.uid());

create policy "jobs_update_own"
on public.jobs
for update
using (employer_id = auth.uid())
with check (employer_id = auth.uid());

create policy "jobs_delete_own"
on public.jobs
for delete
using (employer_id = auth.uid());

-- applications:
-- - professionals read/create/delete their own applications
-- - employers read applications only for their own jobs
-- - employers update status only on applications for their own jobs
create policy "applications_select_allowed"
on public.applications
for select
using (
  professional_id = auth.uid()
  or exists (
    select 1
    from public.jobs j
    where j.id = applications.job_id
      and j.employer_id = auth.uid()
  )
);

create policy "applications_insert_own"
on public.applications
for insert
with check (professional_id = auth.uid());

create policy "applications_update_employer_owned_jobs"
on public.applications
for update
using (
  exists (
    select 1
    from public.jobs j
    where j.id = applications.job_id
      and j.employer_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.jobs j
    where j.id = applications.job_id
      and j.employer_id = auth.uid()
  )
);

create policy "applications_delete_own"
on public.applications
for delete
using (professional_id = auth.uid());

-- messages:
-- - participants can read their own conversations
-- - only sender can insert as sender
-- - only recipient can update rows (mark read)
create policy "messages_select_participant"
on public.messages
for select
using (from_user_id = auth.uid() or to_user_id = auth.uid());

create policy "messages_insert_sender_only"
on public.messages
for insert
with check (from_user_id = auth.uid());

create policy "messages_update_recipient_only"
on public.messages
for update
using (to_user_id = auth.uid())
with check (to_user_id = auth.uid());

create policy "messages_delete_participant"
on public.messages
for delete
using (from_user_id = auth.uid() or to_user_id = auth.uid());
