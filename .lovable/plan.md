

## Trampo no Campo - MVP Implementation Plan

### Overview
A mobile-first professional networking platform for Brazilian agribusiness, connecting rural workers with farms and agricultural companies. Modern, professional design with bilingual support (PT-BR default + English toggle).

---

### Phase 1: Foundation & Authentication
**Goal: Working signup/login with role selection**

- **Landing page** with hero section explaining the platform, featuring "Entrar" (Login) and "Cadastrar" (Sign up) buttons
- **Authentication system** with email/password
- **Role selection** during signup: "Profissional" or "Empregador"
- **Language toggle** (🇧🇷/🇺🇸) in the header
- Role-based routing to different dashboards after login

---

### Phase 2: Database & Core Data Model
**Goal: Backend structure that persists all data**

We'll set up these tables in Supabase:
- **profiles** (user_id, role, language preference)
- **professional_profiles** (full_name, photo, city, state, main_role, experience, availability, bio, skills)
- **employer_profiles** (company_name, city, state, employer_type, description, contact_phone)
- **jobs** (employer_id, title, location, job_type, requirements, salary, benefits)
- **applications** (job_id, professional_id, status)
- **messages** (from_user, to_user, body, timestamp)

Proper Row Level Security (RLS) policies for data protection.

---

### Phase 3: Professional Worker Flow
**Goal: Complete journey from signup to job application**

- **Professional Dashboard** - Welcome message, quick stats (applications sent, messages), and navigation
- **Profile page** - Create/edit profile with:
  - Photo upload
  - Personal info (name, city, state)
  - Professional details (main role, years of experience)
  - Skills tags
  - Availability status
  - Bio
- **Jobs Feed** - List of available positions with:
  - Job cards showing title, company, location, job type
  - Quick preview of requirements
- **Job Detail page** - Full job information with "Candidatar-se" (Apply) button
- **My Applications page** - Track all submitted applications with status (Applied, Shortlisted, Rejected, Hired)
- **Messages page** - Chat interface to communicate with employers

---

### Phase 4: Employer Flow
**Goal: Complete journey from signup to hiring**

- **Employer Dashboard** - Overview of posted jobs, new applications, messages
- **Company Profile page** - Create/edit with:
  - Company name and type (Farm, Cooperative, Retailer, Service Provider)
  - Location (city, state)
  - Description
  - Contact information
- **Post Job page** - Form to create new job listing:
  - Job title
  - Location
  - Type (Permanent/Seasonal)
  - Requirements
  - Salary (optional)
  - Benefits (optional)
- **My Jobs page** - List of all posted jobs with applicant count
- **Applicants page** - View candidates per job, click to see full profile
- **Messages page** - Chat interface to communicate with candidates

---

### Phase 5: Messaging System
**Goal: Real-time communication between users**

- Chat interface between professional and employer
- Message threads organized by conversation
- Real-time message updates (using Supabase realtime)
- Notification indicator for unread messages

---

### Phase 6: Demo Data & Polish
**Goal: Platform looks alive and ready for presentation**

**Seed Data:**
- 8 professional profiles (tractor operators, agronomists, veterinarians, etc.)
- 3 employer profiles (farms and agricultural companies)
- 10 job postings across employers
- Sample applications and message threads

**Demo Accounts (displayed on login page):**
- Professional: `worker@demo.com` / `demo123`
- Employer: `farm@demo.com` / `demo123`

**UI Polish:**
- Success confirmations for all actions
- Loading states
- Error handling
- Mobile-responsive navigation
- Clean, professional styling with subtle green accents

---

### Design System
- **Primary color**: Professional blue (#3B82F6)
- **Accent color**: Agricultural green (#22C55E)
- **Clean white backgrounds** with subtle gray cards
- **Mobile-first** responsive layout
- **Clear typography** in Portuguese (PT-BR)

---

### Demo Flow Script
After implementation, I'll provide step-by-step instructions for your mentor presentation showing both complete user journeys.

---

### Technical Notes
- Built with React + TypeScript + Tailwind CSS
- Backend: Lovable Cloud (Supabase)
- Authentication: Supabase Auth
- Real-time: Supabase Realtime for messaging
- Fully deployable to a shareable URL

