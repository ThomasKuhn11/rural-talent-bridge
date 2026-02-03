import { useState, useEffect, useCallback } from 'react';
import { 
  ProfessionalProfile, 
  EmployerProfile, 
  Job, 
  Application, 
  Message 
} from '@/types';
import { 
  getStoredData, 
  saveStoredData,
  DEMO_PROFESSIONAL_PROFILES,
  DEMO_EMPLOYER_PROFILES,
  DEMO_JOBS,
  DEMO_APPLICATIONS,
  DEMO_MESSAGES
} from '@/data/demoData';

// Professional Profiles
export const useProfessionalProfiles = () => {
  const [profiles, setProfiles] = useState<ProfessionalProfile[]>([]);

  useEffect(() => {
    setProfiles(getStoredData('trampo-professional-profiles', DEMO_PROFESSIONAL_PROFILES));
  }, []);

  const getProfile = useCallback((userId: string) => {
    return profiles.find(p => p.userId === userId);
  }, [profiles]);

  const saveProfile = useCallback((profile: ProfessionalProfile) => {
    const updated = profiles.filter(p => p.userId !== profile.userId);
    updated.push(profile);
    setProfiles(updated);
    saveStoredData('trampo-professional-profiles', updated);
  }, [profiles]);

  return { profiles, getProfile, saveProfile };
};

// Employer Profiles
export const useEmployerProfiles = () => {
  const [profiles, setProfiles] = useState<EmployerProfile[]>([]);

  useEffect(() => {
    setProfiles(getStoredData('trampo-employer-profiles', DEMO_EMPLOYER_PROFILES));
  }, []);

  const getProfile = useCallback((userId: string) => {
    return profiles.find(p => p.userId === userId);
  }, [profiles]);

  const saveProfile = useCallback((profile: EmployerProfile) => {
    const updated = profiles.filter(p => p.userId !== profile.userId);
    updated.push(profile);
    setProfiles(updated);
    saveStoredData('trampo-employer-profiles', updated);
  }, [profiles]);

  return { profiles, getProfile, saveProfile };
};

// Jobs
export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getStoredData('trampo-jobs', DEMO_JOBS));
  }, []);

  const getJob = useCallback((jobId: string) => {
    return jobs.find(j => j.id === jobId);
  }, [jobs]);

  const getJobsByEmployer = useCallback((employerId: string) => {
    return jobs.filter(j => j.employerId === employerId);
  }, [jobs]);

  const addJob = useCallback((job: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...job,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...jobs, newJob];
    setJobs(updated);
    saveStoredData('trampo-jobs', updated);
    return newJob;
  }, [jobs]);

  const refreshJobs = useCallback(() => {
    setJobs(getStoredData('trampo-jobs', DEMO_JOBS));
  }, []);

  return { jobs, getJob, getJobsByEmployer, addJob, refreshJobs };
};

// Applications
export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setApplications(getStoredData('trampo-applications', DEMO_APPLICATIONS));
  }, []);

  const getApplicationsByProfessional = useCallback((professionalId: string) => {
    return applications.filter(a => a.professionalId === professionalId);
  }, [applications]);

  const getApplicationsByJob = useCallback((jobId: string) => {
    return applications.filter(a => a.jobId === jobId);
  }, [applications]);

  const hasApplied = useCallback((jobId: string, professionalId: string) => {
    return applications.some(a => a.jobId === jobId && a.professionalId === professionalId);
  }, [applications]);

  const applyToJob = useCallback((jobId: string, professionalId: string) => {
    if (hasApplied(jobId, professionalId)) return null;
    
    const newApplication: Application = {
      id: crypto.randomUUID(),
      jobId,
      professionalId,
      status: 'applied',
      createdAt: new Date().toISOString(),
    };
    const updated = [...applications, newApplication];
    setApplications(updated);
    saveStoredData('trampo-applications', updated);
    return newApplication;
  }, [applications, hasApplied]);

  const updateApplicationStatus = useCallback((applicationId: string, status: Application['status']) => {
    const updated = applications.map(a => 
      a.id === applicationId ? { ...a, status } : a
    );
    setApplications(updated);
    saveStoredData('trampo-applications', updated);
  }, [applications]);

  const refreshApplications = useCallback(() => {
    setApplications(getStoredData('trampo-applications', DEMO_APPLICATIONS));
  }, []);

  return { 
    applications, 
    getApplicationsByProfessional, 
    getApplicationsByJob, 
    hasApplied, 
    applyToJob,
    updateApplicationStatus,
    refreshApplications
  };
};

// Messages
export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(getStoredData('trampo-messages', DEMO_MESSAGES));
  }, []);

  const getConversation = useCallback((userId1: string, userId2: string) => {
    return messages.filter(m => 
      (m.fromUserId === userId1 && m.toUserId === userId2) ||
      (m.fromUserId === userId2 && m.toUserId === userId1)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [messages]);

  const getConversationPartners = useCallback((userId: string) => {
    const partnerIds = new Set<string>();
    messages.forEach(m => {
      if (m.fromUserId === userId) partnerIds.add(m.toUserId);
      if (m.toUserId === userId) partnerIds.add(m.fromUserId);
    });
    return Array.from(partnerIds);
  }, [messages]);

  const getUnreadCount = useCallback((userId: string) => {
    return messages.filter(m => m.toUserId === userId && !m.read).length;
  }, [messages]);

  const sendMessage = useCallback((fromUserId: string, toUserId: string, body: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      fromUserId,
      toUserId,
      body,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [...messages, newMessage];
    setMessages(updated);
    saveStoredData('trampo-messages', updated);
    return newMessage;
  }, [messages]);

  const markAsRead = useCallback((messageIds: string[]) => {
    const updated = messages.map(m => 
      messageIds.includes(m.id) ? { ...m, read: true } : m
    );
    setMessages(updated);
    saveStoredData('trampo-messages', updated);
  }, [messages]);

  const refreshMessages = useCallback(() => {
    setMessages(getStoredData('trampo-messages', DEMO_MESSAGES));
  }, []);

  return { 
    messages, 
    getConversation, 
    getConversationPartners, 
    getUnreadCount, 
    sendMessage,
    markAsRead,
    refreshMessages
  };
};
