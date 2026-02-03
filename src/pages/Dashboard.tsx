import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useJobs, useApplications, useMessages, useProfessionalProfiles, useEmployerProfiles } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Briefcase, 
  MessageSquare, 
  FileText,
  Plus,
  Users,
  MapPin,
  Building2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { jobs, getJobsByEmployer } = useJobs();
  const { getApplicationsByProfessional, getApplicationsByJob } = useApplications();
  const { getUnreadCount } = useMessages();
  const { getProfile: getProfessionalProfile } = useProfessionalProfiles();
  const { getProfile: getEmployerProfile, profiles: employerProfiles } = useEmployerProfiles();
  const navigate = useNavigate();

  const isProfessional = user?.role === 'professional';
  
  // Get stats
  const professionalProfile = user ? getProfessionalProfile(user.id) : null;
  const employerProfile = user ? getEmployerProfile(user.id) : null;
  const myApplications = user ? getApplicationsByProfessional(user.id) : [];
  const myJobs = user ? getJobsByEmployer(user.id) : [];
  const unreadMessages = user ? getUnreadCount(user.id) : 0;
  
  // Count total applicants for employer
  const totalApplicants = myJobs.reduce((sum, job) => 
    sum + getApplicationsByJob(job.id).length, 0
  );

  // Get recent jobs for professional
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const getEmployerName = (employerId: string) => {
    const employer = employerProfiles.find(p => p.userId === employerId);
    return employer?.companyName || 'Empresa';
  };

  const profileName = isProfessional 
    ? professionalProfile?.fullName 
    : employerProfile?.companyName;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {profileName || user?.email.split('@')[0]}! 👋
          </h1>
          {!profileName && (
            <p className="text-muted-foreground">
              {t('dashboard.completeProfile')}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {isProfessional ? (
            <>
              <Card className="cursor-pointer" onClick={() => navigate('/applications')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{myApplications.length}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.applicationsSent')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer" onClick={() => navigate('/messages')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{unreadMessages}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.newMessages')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="cursor-pointer" onClick={() => navigate('/my-jobs')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{myJobs.length}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.jobsPosted')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalApplicants}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.totalApplicants')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer" onClick={() => navigate('/messages')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{unreadMessages}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.newMessages')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/profile')}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                {t('nav.profile')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {profileName ? profileName : t('dashboard.completeProfile')}
              </p>
              <Button size="sm" variant="outline">
                {profileName ? t('common.edit') : t('profile.editProfile')}
              </Button>
            </CardContent>
          </Card>
          
          {isProfessional ? (
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/jobs')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-accent" />
                  {t('nav.jobs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {jobs.length} {t('nav.jobs').toLowerCase()} {t('availability.available').toLowerCase()}
                </p>
                <Button size="sm" variant="outline">
                  {t('dashboard.viewAll')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/post-job')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plus className="h-5 w-5 text-accent" />
                  {t('nav.postJob')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('jobs.postJob')}
                </p>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  {t('nav.postJob')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Jobs (for professionals) or Messages */}
        {isProfessional && recentJobs.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {t('dashboard.recentJobs')}
                </CardTitle>
                <Button variant="link" size="sm" onClick={() => navigate('/jobs')}>
                  {t('dashboard.viewAll')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentJobs.map(job => (
                <div 
                  key={job.id}
                  className="flex items-start justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <div>
                    <h4 className="font-medium text-foreground">{job.title}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      {getEmployerName(job.employerId)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {job.city}, {job.state}
                    </div>
                  </div>
                  <Badge variant={job.jobType === 'permanent' ? 'default' : 'secondary'} className="text-xs">
                    {job.jobType === 'permanent' ? t('jobs.permanent') : t('jobs.seasonal')}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
