

## Plan: Profile Picture Upload for All Users

### Overview
Add profile picture upload using Supabase Storage. Both professionals and employers can upload a photo that appears on their profile and wherever their profile is shown to others (applicants list, job detail employer card, messages).

### Changes Required

#### 1. Database Migration
- Add `photo_url` column to `employer_profiles` table (professionals already have it)
- Create a `profile-photos` storage bucket (public)
- Add RLS policies: authenticated users can upload/update/delete their own files, anyone can read

#### 2. Update Types
- **`src/types/index.ts`**: Add `photoUrl?: string` to `EmployerProfile`
- **`src/integrations/supabase/database.types.ts`**: Add `photo_url` to employer_profiles types

#### 3. Update Data Hook
- **`src/hooks/useData.ts`**: Include `photo_url` in employer profile select/upsert, map to `photoUrl`

#### 4. New Component: `src/components/ProfilePhotoUpload.tsx`
- Circular avatar showing current photo or fallback icon
- Click to select file (accept images only)
- Uploads to `profile-photos/{userId}` in Supabase Storage
- Returns the public URL to parent via callback
- Shows loading state during upload

#### 5. Update Profile Page (`src/pages/Profile.tsx`)
- In edit mode: render `ProfilePhotoUpload` component for both professional and employer
- In view mode: show the uploaded photo in the avatar circle (replace the static icon)

#### 6. Show Photos Elsewhere
- **`src/pages/Applicants.tsx`**: Show professional's photo in the applicant card avatar
- **`src/pages/JobDetail.tsx`**: Show employer's photo in the employer card
- **`src/pages/Messages.tsx`**: Show conversation partner's photo in message list

#### 7. Translations
- Add keys: `profile.uploadPhoto`, `profile.changePhoto` to `src/contexts/LanguageContext.tsx`

