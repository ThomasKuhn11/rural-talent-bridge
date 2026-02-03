import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useJobs, useEmployerProfiles, useApplications } from '@/hooks/useData';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Building2, DollarSign } from 'lucide-react';

const Jobs = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { profiles: employerProfiles } = useEmployerProfiles();
  const { hasApplied } = useApplications();
  const navigate = useNavigate();

  const getEmployerName = (employerId: string) => {
    const employer = employerProfiles.find(p => p.userId === employerId);
    return employer?.companyName || 'Empresa';
  };

  // Sort jobs by date, newest first
  const sortedJobs = [...jobs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.jobs')}</h1>

        {sortedJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('jobs.noJobs')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedJobs.map(job => {
              const applied = user ? hasApplied(job.id, user.id) : false;
              
              return (
                <Card 
                  key={job.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <Building2 className="h-4 w-4" />
                          {getEmployerName(job.employerId)}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          {job.city}, {job.state}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={job.jobType === 'permanent' ? 'default' : 'secondary'}>
                          {job.jobType === 'permanent' ? t('jobs.permanent') : t('jobs.seasonal')}
                        </Badge>
                        {applied && (
                          <Badge variant="outline" className="text-accent border-accent">
                            {t('jobs.applied')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {job.requirements}
                    </p>
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

export default Jobs;
