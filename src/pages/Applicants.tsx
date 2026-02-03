import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useJobs, useApplications, useProfessionalProfiles } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Briefcase, 
  Calendar,
  MessageSquare,
  Users
} from 'lucide-react';

const Applicants = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { t } = useLanguage();
  const { getJob } = useJobs();
  const { getApplicationsByJob, updateApplicationStatus } = useApplications();
  const { profiles: professionalProfiles } = useProfessionalProfiles();
  const navigate = useNavigate();

  const job = jobId ? getJob(jobId) : null;
  const applications = jobId ? getApplicationsByJob(jobId) : [];

  const getProfessional = (professionalId: string) => 
    professionalProfiles.find(p => p.userId === professionalId);

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

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return t('availability.available');
      case 'not_available': return t('availability.notAvailable');
      case 'open_to_offers': return t('availability.openToOffers');
      default: return availability;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!job) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('jobs.noJobs')}</p>
          <Button onClick={() => navigate('/my-jobs')} variant="link">
            {t('common.back')}
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/my-jobs')} 
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t('nav.applicants')} - {job.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              {job.city}, {job.state}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {applications.length} {t('nav.applicants').toLowerCase()}
            </p>
          </CardContent>
        </Card>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('applications.noApplications')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map(application => {
              const professional = getProfessional(application.professionalId);
              
              if (!professional) return null;

              return (
                <Card key={application.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{professional.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{professional.mainRole}</p>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {professional.city}, {professional.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {professional.yearsExperience} anos
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(application.createdAt)}
                          </span>
                        </div>

                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {getAvailabilityLabel(professional.availability)}
                          </Badge>
                        </div>

                        {professional.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {professional.skills.slice(0, 4).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {professional.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{professional.skills.length - 4}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-4">
                          <Select
                            value={application.status}
                            onValueChange={(value: 'applied' | 'shortlisted' | 'rejected' | 'hired') => 
                              updateApplicationStatus(application.id, value)
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="applied">{t('applications.applied')}</SelectItem>
                              <SelectItem value="shortlisted">{t('applications.shortlisted')}</SelectItem>
                              <SelectItem value="rejected">{t('applications.rejected')}</SelectItem>
                              <SelectItem value="hired">{t('applications.hired')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/messages/${professional.userId}`)}
                            className="gap-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            {t('messages.sendMessage')}
                          </Button>
                        </div>
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

export default Applicants;
