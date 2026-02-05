import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
  'SP', 'SE', 'TO'
];

const EditJob = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { getJob, updateJob, isLoading } = useJobs();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    state: '',
    jobType: 'permanent' as 'permanent' | 'seasonal',
    requirements: '',
    salary: '',
    benefits: '',
  });

  const job = id ? getJob(id) : undefined;

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        city: job.city,
        state: job.state,
        jobType: job.jobType,
        requirements: job.requirements,
        salary: job.salary || '',
        benefits: job.benefits || '',
      });
    }
  }, [job]);

  // Redirect if job not found or not owned by user
  useEffect(() => {
    if (!isLoading && id && !job) {
      navigate('/my-jobs');
    }
    if (job && user && job.employerId !== user.id) {
      navigate('/my-jobs');
    }
  }, [job, user, isLoading, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    const success = await updateJob(id, formData);
    
    if (success) {
      toast.success(t('jobs.jobUpdated'));
      navigate('/my-jobs');
    } else {
      toast.error(t('common.error'));
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

        <h1 className="text-2xl font-bold text-foreground mb-6">{t('jobs.editJob')}</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-accent" />
              {t('jobs.editJob')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{t('jobs.title')} *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Operador de Colheitadeira"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('profile.city')} *</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Ribeirão Preto"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('profile.state')} *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRAZILIAN_STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('jobs.type')} *</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value: 'permanent' | 'seasonal') => 
                    setFormData(prev => ({ ...prev, jobType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">{t('jobs.permanent')}</SelectItem>
                    <SelectItem value="seasonal">{t('jobs.seasonal')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('jobs.requirements')} *</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Experiência mínima de 3 anos..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t('jobs.salary')}</Label>
                <Input
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                  placeholder="R$ 4.000 - R$ 5.000"
                />
              </div>

              <div className="space-y-2">
                <Label>{t('jobs.benefits')}</Label>
                <Input
                  value={formData.benefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                  placeholder="Moradia, alimentação, plano de saúde"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/my-jobs')}
                  className="flex-1"
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit" className="flex-1 gap-2">
                  <Pencil className="h-4 w-4" />
                  {t('common.save')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditJob;
