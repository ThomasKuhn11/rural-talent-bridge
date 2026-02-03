

# Updated Plan: Connect to External Supabase

## Critical Discovery: Environment Variable Prefix

Your secrets are stored as:
- `EXTERNAL_SUPABASE_URL`  
- `EXTERNAL_SUPABASE_ANON_KEY`

However, **Vite only exposes environment variables prefixed with `VITE_`** to the frontend code. 

### You Need To Add Two More Secrets

Before I can implement the code, please add these secrets with the **exact same values** as your existing ones:
- `VITE_EXTERNAL_SUPABASE_URL` (same value as EXTERNAL_SUPABASE_URL)
- `VITE_EXTERNAL_SUPABASE_ANON_KEY` (same value as EXTERNAL_SUPABASE_ANON_KEY)

This is required because:
1. Supabase Edge Functions use secrets WITHOUT the VITE_ prefix
2. Frontend React code needs the VITE_ prefix to access them

---

## Implementation Summary

Once the secrets are ready, I will create/update these files:

### New Files
| File | Purpose |
|------|---------|
| `src/integrations/supabase/client.ts` | Supabase client initialization |
| `src/integrations/supabase/types.ts` | TypeScript types for database schema |

### Modified Files  
| File | Changes |
|------|---------|
| `src/contexts/AuthContext.tsx` | Replace localStorage auth with Supabase Auth |
| `src/hooks/useData.ts` | Replace localStorage CRUD with Supabase queries |
| `src/pages/Login.tsx` | Remove demo accounts, handle real auth errors |
| `src/pages/Signup.tsx` | Show email confirmation message after signup |
| `src/contexts/LanguageContext.tsx` | Add new translation keys for email confirmation |
| `src/data/demoData.ts` | Remove initialization logic (keep types) |
| `src/main.tsx` | Remove demo data initialization call |

---

## New Translation Keys to Add

```text
auth.checkEmail: "Verifique seu e-mail para confirmar sua conta" / "Check your email to confirm your account"
auth.emailNotConfirmed: "Por favor, confirme seu e-mail antes de entrar" / "Please confirm your email before logging in"  
auth.signupSuccess: "Conta criada! Verifique seu e-mail." / "Account created! Check your email."
```

---

## User Flow After Implementation

1. User goes to /signup
2. Selects role (Professional or Employer)
3. Enters email and password
4. Clicks "Sign Up"
5. Sees "Check your email" message
6. Clicks confirmation link in email
7. Goes to /login
8. Enters email and password
9. Redirected to /dashboard with role-based navigation

---

## Next Step

Please add the `VITE_EXTERNAL_SUPABASE_URL` and `VITE_EXTERNAL_SUPABASE_ANON_KEY` secrets, then approve this plan so I can implement the changes.

