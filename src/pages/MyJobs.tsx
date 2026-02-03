import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs, useApplications } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Users, Plus } from 'lucide-react';

const MyJobs = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getJobsByEmployer } = useJobs();
  const { getApplicationsByJob } = useApplications();
  const navigate = useNavigate();

  const myJobs = user ? getJobsByEmployer(user.id) : [];

  // Sort by date, newest first
  const sortedJobs = [...myJobs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">{t('nav.myJobs')}</h1>
          <Button onClick={() => navigate('/post-job')} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('nav.postJob')}
          </Button>
        </div>

        {sortedJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">{t('jobs.noJobs')}</p>
              <Button onClick={() => navigate('/post-job')} className="gap-2">
                <Plus className="h-4 w-4" />
                {t('nav.postJob')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedJobs.map(job => {
              const applicants = getApplicationsByJob(job.id);
              
              return (
                <Card 
                  key={job.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          {job.city}, {job.state}
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant={job.jobType === 'permanent' ? 'default' : 'secondary'}>
                            {job.jobType === 'permanent' ? t('jobs.permanent') : t('jobs.seasonal')}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {applicants.length} {t('nav.applicants').toLowerCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        Ver Vaga
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/applicants/${job.id}`)}
                        className="gap-1"
                      >
                        <Users className="h-4 w-4" />
                        {t('jobs.viewApplicants')} ({applicants.length})
                      </Button>
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

export default MyJobs;
