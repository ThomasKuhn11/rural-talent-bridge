import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get users from localStorage
const getStoredUsers = (): { email: string; password: string; id: string; role: UserRole; createdAt: string }[] => {
  const stored = localStorage.getItem('trampo-users');
  return stored ? JSON.parse(stored) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: { email: string; password: string; id: string; role: UserRole; createdAt: string }[]) => {
  localStorage.setItem('trampo-users', JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('trampo-current-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      };
      setUser(loggedInUser);
      localStorage.setItem('trampo-current-user', JSON.stringify(loggedInUser));
      return { success: true };
    }
    
    return { success: false, error: 'auth.loginError' };
  };

  const signup = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'auth.emailExists' };
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const loggedInUser: User = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
    
    setUser(loggedInUser);
    localStorage.setItem('trampo-current-user', JSON.stringify(loggedInUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trampo-current-user');
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
