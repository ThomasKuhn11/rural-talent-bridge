import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs, useEmployerProfiles, useApplications } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Gift, 
  FileText, 
  ArrowLeft,
  X,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getJob } = useJobs();
  const { profiles: employerProfiles } = useEmployerProfiles();
  const { hasApplied, applyToJob, withdrawApplication } = useApplications();
  const navigate = useNavigate();

  const job = id ? getJob(id) : null;
  const employer = job ? employerProfiles.find(p => p.userId === job.employerId) : null;
  const applied = job && user ? hasApplied(job.id, user.id) : false;

  if (!job) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('jobs.noJobs')}</p>
          <Button onClick={() => navigate('/jobs')} variant="link">
            {t('common.back')}
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const result = applyToJob(job.id, user.id);
    if (result) {
      toast.success(t('jobs.applicationSent'));
    }
  };

  const handleWithdraw = async () => {
    if (!user) return;
    const success = await withdrawApplication(job.id);
    if (success) {
      toast.success(t('jobs.applicationWithdrawn'));
    }
  };

  const handleMessage = () => {
    if (employer) {
      navigate(`/messages/${employer.userId}`);
    }
  };

  const getEmployerTypeLabel = (type: string) => {
    switch (type) {
      case 'farm': return t('companyType.farm');
      case 'cooperative': return t('companyType.cooperative');
      case 'retailer': return t('companyType.retailer');
      case 'service_provider': return t('companyType.serviceProvider');
      default: return type;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </Button>

        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                <Badge variant={job.jobType === 'permanent' ? 'default' : 'secondary'}>
                  {job.jobType === 'permanent' ? t('jobs.permanent') : t('jobs.seasonal')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{job.city}, {job.state}</span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-5 w-5" />
                <span>{job.salary}</span>
              </div>
            )}

            {job.benefits && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <Gift className="h-5 w-5 mt-0.5" />
                <span>{job.benefits}</span>
              </div>
            )}

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('jobs.requirements')}
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
            </div>

            {user?.role === 'professional' && (
              <div className="flex gap-3 pt-4">
                {applied ? (
                  <Button onClick={handleWithdraw} variant="destructive" className="flex-1 gap-2">
                    <X className="h-4 w-4" />
                    {t('jobs.withdraw')}
                  </Button>
                ) : (
                  <Button onClick={handleApply} className="flex-1 gap-2">
                    <Briefcase className="h-4 w-4" />
                    {t('jobs.apply')}
                  </Button>
                )}
                <Button onClick={handleMessage} variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {t('messages.sendMessage')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {employer && (
          <Card>
             <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={employer.photoUrl} alt={employer.companyName} />
                  <AvatarFallback className="bg-muted">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {t('auth.employer')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg">{employer.companyName}</h3>
              <Badge variant="secondary" className="mt-1">
                {getEmployerTypeLabel(employer.employerType)}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-2">
                <MapPin className="h-4 w-4" />
                {employer.city}, {employer.state}
              </div>
              {employer.description && (
                <p className="text-muted-foreground mt-3">{employer.description}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default JobDetail;
