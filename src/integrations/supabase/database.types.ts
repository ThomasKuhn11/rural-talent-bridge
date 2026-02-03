export type AppRole = 'professional' | 'employer';

export type Availability = 'available' | 'not_available' | 'open_to_offers';

export type EmployerType = 'farm' | 'cooperative' | 'retailer' | 'service_provider';

export type JobType = 'permanent' | 'seasonal';

export type ApplicationStatus = 'applied' | 'shortlisted' | 'rejected' | 'hired';

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: AppRole;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: AppRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: AppRole;
          created_at?: string;
        };
      };
      professional_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          photo_url: string | null;
          city: string;
          state: string;
          main_role: string;
          years_experience: number;
          availability: Availability;
          bio: string;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string;
          photo_url?: string | null;
          city?: string;
          state?: string;
          main_role?: string;
          years_experience?: number;
          availability?: Availability;
          bio?: string;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          photo_url?: string | null;
          city?: string;
          state?: string;
          main_role?: string;
          years_experience?: number;
          availability?: Availability;
          bio?: string;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      employer_profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          city: string;
          state: string;
          employer_type: EmployerType;
          description: string;
          contact_phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name?: string;
          city?: string;
          state?: string;
          employer_type?: EmployerType;
          description?: string;
          contact_phone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_name?: string;
          city?: string;
          state?: string;
          employer_type?: EmployerType;
          description?: string;
          contact_phone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          employer_id: string;
          title: string;
          city: string;
          state: string;
          job_type: JobType;
          requirements: string;
          salary: string | null;
          benefits: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employer_id: string;
          title: string;
          city: string;
          state: string;
          job_type: JobType;
          requirements: string;
          salary?: string | null;
          benefits?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employer_id?: string;
          title?: string;
          city?: string;
          state?: string;
          job_type?: JobType;
          requirements?: string;
          salary?: string | null;
          benefits?: string | null;
          created_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          professional_id: string;
          status: ApplicationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          professional_id: string;
          status?: ApplicationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          professional_id?: string;
          status?: ApplicationStatus;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          body: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          body: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_user_id?: string;
          to_user_id?: string;
          body?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
    Functions: {
      get_user_role: {
        Args: { _user_id: string };
        Returns: AppRole | null;
      };
    };
  };
}
