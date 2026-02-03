import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useJobs, useEmployerProfiles, useApplications } from '@/hooks/useData';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Briefcase, Building2, DollarSign, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
  'SP', 'SE', 'TO'
];

const Jobs = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { profiles: employerProfiles } = useEmployerProfiles();
  const { hasApplied } = useApplications();
  const navigate = useNavigate();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');

  const getEmployerName = (employerId: string) => {
    const employer = employerProfiles.find(p => p.userId === employerId);
    return employer?.companyName || 'Empresa';
  };

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchLower) ||
      getEmployerName(job.employerId).toLowerCase().includes(searchLower) ||
      job.city.toLowerCase().includes(searchLower);

    // State filter
    const matchesState = selectedState === 'all' || job.state === selectedState;

    // Job type filter
    const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType;

    return matchesSearch && matchesState && matchesJobType;
  }).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const hasActiveFilters = searchQuery !== '' || selectedState !== 'all' || selectedJobType !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedJobType('all');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-4">{t('nav.jobs')}</h1>

        {/* Search and Filters */}
        <div className="space-y-3 mb-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search') + '...'}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex gap-2">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('profile.state')} />
              </SelectTrigger>
              <SelectContent className="bg-card border shadow-lg">
                <SelectItem value="all">Todos os Estados</SelectItem>
                {BRAZILIAN_STATES.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('jobs.type')} />
              </SelectTrigger>
              <SelectContent className="bg-card border shadow-lg">
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="permanent">{t('jobs.permanent')}</SelectItem>
                <SelectItem value="seasonal">{t('jobs.seasonal')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-sm text-muted-foreground">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="gap-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                {hasActiveFilters 
                  ? 'Nenhuma vaga encontrada com esses filtros'
                  : t('jobs.noJobs')
                }
              </p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Limpar filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map(job => {
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
