import { ProfessionalProfile, EmployerProfile, Job, Application, Message } from '@/types';

// These exports are kept for type reference but are no longer used for initialization
// All data is now stored in and fetched from Supabase

export const DEMO_USERS = [] as const;

export const DEMO_PROFESSIONAL_PROFILES: ProfessionalProfile[] = [];

export const DEMO_EMPLOYER_PROFILES: EmployerProfile[] = [];

export const DEMO_JOBS: Job[] = [];

export const DEMO_APPLICATIONS: Application[] = [];

export const DEMO_MESSAGES: Message[] = [];

// These functions are deprecated - data is now in Supabase
// Kept for backwards compatibility during migration
export const initializeDemoData = () => {
  console.log('Demo data initialization is deprecated - using Supabase now');
};

export const getStoredData = <T>(key: string, defaultValue: T[]): T[] => {
  console.warn('getStoredData is deprecated - using Supabase hooks instead');
  return defaultValue;
};

export const saveStoredData = <T>(key: string, data: T[]) => {
  console.warn('saveStoredData is deprecated - using Supabase hooks instead');
};
