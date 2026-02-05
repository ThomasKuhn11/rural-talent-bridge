import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  ProfessionalProfile, 
  EmployerProfile, 
  Job, 
  Application, 
  Message 
} from '@/types';

// Professional Profiles
export const useProfessionalProfiles = () => {
  const [profiles, setProfiles] = useState<ProfessionalProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfiles = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('professional_profiles')
      .select('*');
    
    if (error) {
      console.error('Error fetching professional profiles:', error);
      setProfiles([]);
    } else {
      // Map database columns to our type format
      const mapped = (data || []).map((p: Record<string, unknown>) => ({
        userId: p.user_id as string,
        fullName: p.full_name as string || '',
        photoUrl: p.photo_url as string || '',
        city: p.city as string || '',
        state: p.state as string || '',
        mainRole: p.main_role as string || '',
        yearsExperience: p.years_experience as number || 0,
        availability: p.availability as 'available' | 'not_available' | 'open_to_offers' || 'available',
        bio: p.bio as string || '',
        skills: (p.skills as string[]) || [],
      }));
      setProfiles(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const getProfile = useCallback((userId: string) => {
    return profiles.find(p => p.userId === userId);
  }, [profiles]);

  const saveProfile = useCallback(async (profile: ProfessionalProfile) => {
    const { error } = await supabase
      .from('professional_profiles')
      .upsert({
        user_id: profile.userId,
        full_name: profile.fullName,
        photo_url: profile.photoUrl,
        city: profile.city,
        state: profile.state,
        main_role: profile.mainRole,
        years_experience: profile.yearsExperience,
        availability: profile.availability,
        bio: profile.bio,
        skills: profile.skills,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    
    if (error) {
      console.error('Error saving professional profile:', error);
      return false;
    }
    
    await fetchProfiles();
    return true;
  }, [fetchProfiles]);

  return { profiles, getProfile, saveProfile, isLoading, refreshProfiles: fetchProfiles };
};

// Employer Profiles
export const useEmployerProfiles = () => {
  const [profiles, setProfiles] = useState<EmployerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfiles = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('employer_profiles')
      .select('*');
    
    if (error) {
      console.error('Error fetching employer profiles:', error);
      setProfiles([]);
    } else {
      const mapped = (data || []).map((p: Record<string, unknown>) => ({
        userId: p.user_id as string,
        companyName: p.company_name as string || '',
        city: p.city as string || '',
        state: p.state as string || '',
        employerType: p.employer_type as 'farm' | 'cooperative' | 'retailer' | 'service_provider' || 'farm',
        description: p.description as string || '',
        contactPhone: p.contact_phone as string || '',
      }));
      setProfiles(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const getProfile = useCallback((userId: string) => {
    return profiles.find(p => p.userId === userId);
  }, [profiles]);

  const saveProfile = useCallback(async (profile: EmployerProfile) => {
    const { error } = await supabase
      .from('employer_profiles')
      .upsert({
        user_id: profile.userId,
        company_name: profile.companyName,
        city: profile.city,
        state: profile.state,
        employer_type: profile.employerType,
        description: profile.description,
        contact_phone: profile.contactPhone,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    
    if (error) {
      console.error('Error saving employer profile:', error);
      return false;
    }
    
    await fetchProfiles();
    return true;
  }, [fetchProfiles]);

  return { profiles, getProfile, saveProfile, isLoading, refreshProfiles: fetchProfiles };
};

// Jobs
export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } else {
      const mapped = (data || []).map((j: Record<string, unknown>) => ({
        id: j.id as string,
        employerId: j.employer_id as string,
        title: j.title as string,
        city: j.city as string,
        state: j.state as string,
        jobType: j.job_type as 'permanent' | 'seasonal',
        requirements: j.requirements as string,
        salary: j.salary as string || '',
        benefits: j.benefits as string || '',
        createdAt: j.created_at as string,
      }));
      setJobs(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const getJob = useCallback((jobId: string) => {
    return jobs.find(j => j.id === jobId);
  }, [jobs]);

  const getJobsByEmployer = useCallback((employerId: string) => {
    return jobs.filter(j => j.employerId === employerId);
  }, [jobs]);

  const addJob = useCallback(async (job: Omit<Job, 'id' | 'createdAt'>) => {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        employer_id: job.employerId,
        title: job.title,
        city: job.city,
        state: job.state,
        job_type: job.jobType,
        requirements: job.requirements,
        salary: job.salary,
        benefits: job.benefits,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding job:', error);
      return null;
    }
    
    await fetchJobs();
    return data ? {
      id: data.id,
      employerId: data.employer_id,
      title: data.title,
      city: data.city,
      state: data.state,
      jobType: data.job_type,
      requirements: data.requirements,
      salary: data.salary || '',
      benefits: data.benefits || '',
      createdAt: data.created_at,
    } as Job : null;
  }, [fetchJobs]);

  const updateJob = useCallback(async (jobId: string, updates: Partial<Omit<Job, 'id' | 'createdAt' | 'employerId'>>) => {
    const { error } = await supabase
      .from('jobs')
      .update({
        title: updates.title,
        city: updates.city,
        state: updates.state,
        job_type: updates.jobType,
        requirements: updates.requirements,
        salary: updates.salary,
        benefits: updates.benefits,
      })
      .eq('id', jobId);
    
    if (error) {
      console.error('Error updating job:', error);
      return false;
    }
    
    await fetchJobs();
    return true;
  }, [fetchJobs]);

  const deleteJob = useCallback(async (jobId: string) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);
    
    if (error) {
      console.error('Error deleting job:', error);
      return false;
    }
    
    await fetchJobs();
    return true;
  }, [fetchJobs]);

  return { jobs, getJob, getJobsByEmployer, addJob, updateJob, deleteJob, isLoading, refreshJobs: fetchJobs };
};

// Applications
export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } else {
      const mapped = (data || []).map((a: Record<string, unknown>) => ({
        id: a.id as string,
        jobId: a.job_id as string,
        professionalId: a.professional_id as string,
        status: a.status as 'applied' | 'shortlisted' | 'rejected' | 'hired',
        createdAt: a.created_at as string,
      }));
      setApplications(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getApplicationsByProfessional = useCallback((professionalId: string) => {
    return applications.filter(a => a.professionalId === professionalId);
  }, [applications]);

  const getApplicationsByJob = useCallback((jobId: string) => {
    return applications.filter(a => a.jobId === jobId);
  }, [applications]);

  const hasApplied = useCallback((jobId: string, professionalId: string) => {
    return applications.some(a => a.jobId === jobId && a.professionalId === professionalId);
  }, [applications]);

  const applyToJob = useCallback(async (jobId: string, professionalId: string) => {
    if (hasApplied(jobId, professionalId)) return null;
    
    const { data, error } = await supabase
      .from('applications')
      .insert({
        job_id: jobId,
        professional_id: professionalId,
        status: 'applied',
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error applying to job:', error);
      return null;
    }
    
    await fetchApplications();
    return data ? {
      id: data.id,
      jobId: data.job_id,
      professionalId: data.professional_id,
      status: data.status,
      createdAt: data.created_at,
    } as Application : null;
  }, [hasApplied, fetchApplications]);

  const updateApplicationStatus = useCallback(async (applicationId: string, status: Application['status']) => {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId);
    
    if (error) {
      console.error('Error updating application status:', error);
      return false;
    }
    
    await fetchApplications();
    return true;
  }, [fetchApplications]);

  return { 
    applications, 
    getApplicationsByProfessional, 
    getApplicationsByJob, 
    hasApplied, 
    applyToJob,
    updateApplicationStatus,
    isLoading,
    refreshApplications: fetchApplications
  };
};

// Messages
export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } else {
      const mapped = (data || []).map((m: Record<string, unknown>) => ({
        id: m.id as string,
        fromUserId: m.from_user_id as string,
        toUserId: m.to_user_id as string,
        body: m.body as string,
        createdAt: m.created_at as string,
        read: m.read as boolean,
      }));
      setMessages(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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

  const sendMessage = useCallback(async (fromUserId: string, toUserId: string, body: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        from_user_id: fromUserId,
        to_user_id: toUserId,
        body,
        read: false,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      return null;
    }
    
    await fetchMessages();
    return data ? {
      id: data.id,
      fromUserId: data.from_user_id,
      toUserId: data.to_user_id,
      body: data.body,
      createdAt: data.created_at,
      read: data.read,
    } as Message : null;
  }, [fetchMessages]);

  const markAsRead = useCallback(async (messageIds: string[]) => {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIds);
    
    if (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }
    
    await fetchMessages();
    return true;
  }, [fetchMessages]);

  return { 
    messages, 
    getConversation, 
    getConversationPartners, 
    getUnreadCount, 
    sendMessage,
    markAsRead,
    isLoading,
    refreshMessages: fetchMessages
  };
};
