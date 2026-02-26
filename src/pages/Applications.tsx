import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs, useApplications, useEmployerProfiles } from '@/hooks/useData';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, FileText, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';

const Applications = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { getApplicationsByProfessional, withdrawApplication } = useApplications();
  const { profiles: employerProfiles } = useEmployerProfiles();
  const navigate = useNavigate();

  const myApplications = user ? getApplicationsByProfessional(user.id) : [];

  // Sort by date, newest first
  const sortedApplications = [...myApplications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getJob = (jobId: string) => jobs.find(j => j.id === jobId);
  const getEmployer = (employerId: string) => employerProfiles.find(p => p.userId === employerId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <Badge variant="secondary">{t('applications.applied')}</Badge>;
      case 'shortlisted':
        return <Badge className="bg-accent">{t('applications.shortlisted')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('applications.rejected')}</Badge>;
      case 'hired':
        return <Badge className="bg-green-600">{t('applications.hired')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.applications')}</h1>

        {sortedApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('applications.noApplications')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedApplications.map(application => {
              const job = getJob(application.jobId);
              const employer = job ? getEmployer(job.employerId) : null;
              
              if (!job) return null;

              return (
                <Card 
                  key={application.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        {employer && (
                          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                            <Building2 className="h-4 w-4" />
                            {employer.companyName}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          {job.city}, {job.state}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(application.createdAt)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(application.status)}
                        {application.status === 'applied' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive gap-1 h-7 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              withdrawApplication(job.id).then(success => {
                                if (success) toast.success(t('jobs.applicationWithdrawn'));
                              });
                            }}
                          >
                            <X className="h-3 w-3" />
                            {t('jobs.withdraw')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Applications;
