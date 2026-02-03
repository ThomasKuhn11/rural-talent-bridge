export type UserRole = 'professional' | 'employer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ProfessionalProfile {
  userId: string;
  fullName: string;
  photoUrl?: string;
  city: string;
  state: string;
  mainRole: string;
  yearsExperience: number;
  availability: 'available' | 'not_available' | 'open_to_offers';
  bio: string;
  skills: string[];
}

export interface EmployerProfile {
  userId: string;
  companyName: string;
  city: string;
  state: string;
  employerType: 'farm' | 'cooperative' | 'retailer' | 'service_provider';
  description: string;
  contactPhone: string;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  city: string;
  state: string;
  jobType: 'permanent' | 'seasonal';
  requirements: string;
  salary?: string;
  benefits?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  professionalId: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: string;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  oderId: string;
  lastMessage: Message;
  unreadCount: number;
}
