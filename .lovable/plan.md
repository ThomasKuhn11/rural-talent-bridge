
# Real User Authentication with Supabase

## Overview
We'll migrate from localStorage-based mock authentication to real Supabase authentication, enabling:
- Real email signup with verification
- Secure password storage and login
- Data persistence in a real database
- Multi-device access for users

---

## Phase 1: Enable Supabase
**First step - requires your approval**

I'll enable Lovable Cloud (managed Supabase) which will:
- Create a Supabase project automatically
- Set up authentication infrastructure
- Provide a PostgreSQL database for all app data

---

## Phase 2: Database Schema

We'll create these tables to store all user and app data:

### User Roles Table (Security)
```text
user_roles
  - id (uuid, primary key)
  - user_id (references auth.users)
  - role ('professional' | 'employer')
```

### Professional Profiles
```text
professional_profiles
  - id (uuid, primary key)
  - user_id (references auth.users)
  - full_name, photo_url, city, state
  - main_role, years_experience
  - availability, bio, skills (array)
```

### Employer Profiles
```text
employer_profiles
  - id (uuid, primary key)
  - user_id (references auth.users)
  - company_name, city, state
  - employer_type, description, contact_phone
```

### Jobs, Applications, Messages
Same structure as current types but with proper foreign keys and timestamps.

---

## Phase 3: Row Level Security (RLS)
**Data protection rules**

- Users can only read/update their own profiles
- Jobs are publicly readable, but only employers can create/edit their own jobs
- Applications: professionals see their own, employers see applications to their jobs
- Messages: users can only see conversations they're part of

---

## Phase 4: Code Migration

### AuthContext Updates
- Replace localStorage with Supabase Auth
- Real `signUp()` with email verification
- Real `signIn()` with password
- Session management with `onAuthStateChange`

### Data Hooks Updates
- Replace localStorage hooks with Supabase queries
- Use React Query for caching and real-time updates
- Add proper error handling

### Page Updates
- Login/Signup pages call Supabase Auth
- All data pages use new Supabase hooks
- Add email verification flow

---

## Phase 5: Demo Data Seeding
- Create SQL script to seed demo data
- Keep demo accounts (worker@demo.com, farm@demo.com) working
- Allow real signups alongside demo accounts

---

## What Changes for Users

| Before (localStorage) | After (Supabase) |
|----------------------|------------------|
| Data only in browser | Data saved to cloud |
| No email verification | Real email verification |
| Anyone can claim any email | Secure, verified accounts |
| Data lost on browser clear | Persistent across devices |
| Demo only | Ready for real testing |

---

## Next Steps

1. **Enable Supabase** - I'll trigger the connection
2. **Create database schema** - Tables and RLS policies
3. **Update AuthContext** - Real authentication
4. **Update data hooks** - Real database queries
5. **Test complete flow** - Signup, login, all features

---

## Technical Details

### Security Architecture
- Roles stored in separate `user_roles` table (prevents privilege escalation)
- RLS policies use security definer functions
- No sensitive data exposed through SELECT policies

### Trigger for Role Assignment
When a user signs up, a trigger will:
1. Create entry in `user_roles` with their selected role
2. Create empty profile in appropriate table (professional or employer)

### Migration Strategy
- Keep demo data seeding for testing
- Existing localStorage data won't transfer (fresh start)
- Demo accounts will work immediately after setup
