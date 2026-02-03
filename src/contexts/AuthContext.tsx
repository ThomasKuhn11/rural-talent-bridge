import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'professional' | 'employer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fetch user role from user_roles table
const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
  
  return data?.role as UserRole | null;
};

// Convert Supabase user to app User
const toAppUser = async (supabaseUser: SupabaseUser): Promise<User | null> => {
  const role = await fetchUserRole(supabaseUser.id);
  
  if (!role) {
    console.error('No role found for user:', supabaseUser.id);
    return null;
  }
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    role,
    createdAt: supabaseUser.created_at,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Use setTimeout to avoid potential race conditions with Supabase
          setTimeout(async () => {
            const appUser = await toAppUser(session.user);
            setUser(appUser);
            setIsLoading(false);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const appUser = await toAppUser(session.user);
        setUser(appUser);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      return { success: false, error: 'auth.loginError' };
    }
    
    if (data.user) {
      const appUser = await toAppUser(data.user);
      if (appUser) {
        setUser(appUser);
        return { success: true };
      }
      return { success: false, error: 'auth.noRoleAssigned' };
    }
    
    return { success: false, error: 'auth.loginError' };
  };

  const signup = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          role, // Store role in user metadata for the trigger to use
        },
      },
    });
    
    if (error) {
      console.error('Signup error:', error);
      if (error.message.includes('already registered')) {
        return { success: false, error: 'auth.emailExists' };
      }
      return { success: false, error: 'auth.signupError' };
    }
    
    if (data.user) {
      // If email confirmation is required, user won't be logged in yet
      if (!data.session) {
        return { success: true, error: 'auth.checkEmail' };
      }
      
      // User is logged in, fetch their role
      const appUser = await toAppUser(data.user);
      if (appUser) {
        setUser(appUser);
        return { success: true };
      }
    }
    
    return { success: true }; // Signup succeeded but may need email confirmation
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
