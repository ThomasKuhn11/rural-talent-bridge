import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "professional" | "employer";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to fetch user role from user_roles table
  const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle();

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
    return (data?.role as UserRole) ?? null;
  };

  // Build User object from Supabase user and role
  const buildUser = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    const metaRole = supabaseUser.user_metadata?.role as UserRole | undefined;

    // se tiver no metadata, perfeito
    if (metaRole) {
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        role: metaRole,
        createdAt: supabaseUser.created_at,
      };
    }

    // fallback opcional: tenta tabela
    const role = await fetchUserRole(supabaseUser.id);
    if (!role) return null;

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      role,
      createdAt: supabaseUser.created_at,
    };
  };

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Use setTimeout to avoid blocking the auth state change
        setTimeout(async () => {
          const appUser = await buildUser(session.user);
          setUser(appUser);
          setIsLoading(false);
        }, 0);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const appUser = await buildUser(session.user);
        setUser(appUser);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      if (error.message.includes("Email not confirmed")) {
        return { success: false, error: "auth.emailNotConfirmed" };
      }
      return { success: false, error: "auth.loginError" };
    }

    if (data.user) {
      const appUser = await buildUser(data.user);
      if (!appUser) {
        return { success: false, error: "auth.loginError" };
      }
      setUser(appUser);
      return { success: true };
    }
    return { success: false, error: "auth.loginError" };
  };

  const signup = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { role }, // <- salva no metadata
      },
    });

    if (error) {
      console.error("Signup error (raw):", error);
      console.error("Signup error details:", {
        name: (error as any).name,
        status: (error as any).status,
        code: (error as any).code,
        message: (error as any).message,
      });

      if (error.message?.toLowerCase().includes("already")) {
        return { success: false, error: "auth.emailExists" };
      }
      return { success: false, error: "auth.signupError, cacete" };
    }

    if (data.user) {
      // Insert user role
      console.log(data);
      const { error: roleError } = await supabase.from("user_roles").insert({ user_id: data.user.id, role });

      if (roleError) {
        console.error("Error creating user role:", roleError);
        return { success: false, error: "auth.signupError" };
      }

      // Create empty profile based on role
      if (role === "professional") {
        const { error: profileError } = await supabase.from("professional_profiles").insert({ user_id: data.user.id });

        if (profileError) {
          console.error("Error creating professional profile:", profileError);
        }
      } else {
        const { error: profileError } = await supabase.from("employer_profiles").insert({ user_id: data.user.id });

        if (profileError) {
          console.error("Error creating employer profile:", profileError);
        }
      }

      // Return success - user needs to confirm email
      return { success: true };
    }

    return { success: false, error: "auth.signupError" };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
