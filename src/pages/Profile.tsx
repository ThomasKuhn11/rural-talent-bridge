import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfessionalProfiles, useEmployerProfiles } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, Briefcase, Phone, Building2, Save, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ProfessionalProfile, EmployerProfile } from '@/types';
import { VoiceTranscriptionButton } from '@/components/VoiceTranscriptionButton';

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
  'SP', 'SE', 'TO'
];

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { getProfile: getProfessionalProfile, saveProfile: saveProfessionalProfile } = useProfessionalProfiles();
  const { getProfile: getEmployerProfile, saveProfile: saveEmployerProfile } = useEmployerProfiles();

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Professional profile state
  const [professionalData, setProfessionalData] = useState<ProfessionalProfile>({
    userId: user?.id || '',
    fullName: '',
    photoUrl: '',
    city: '',
    state: '',
    mainRole: '',
    yearsExperience: 0,
    availability: 'available',
    bio: '',
    skills: [],
  });

  // Employer profile state
  const [employerData, setEmployerData] = useState<EmployerProfile>({
    userId: user?.id || '',
    companyName: '',
    city: '',
    state: '',
    employerType: 'farm',
    description: '',
    contactPhone: '',
  });

  const isProfessional = user?.role === 'professional';

  useEffect(() => {
    if (user) {
      if (isProfessional) {
        const existing = getProfessionalProfile(user.id);
        if (existing) {
          setProfessionalData(existing);
        } else {
          setProfessionalData(prev => ({ ...prev, userId: user.id }));
          setIsEditing(true);
        }
      } else {
        const existing = getEmployerProfile(user.id);
        if (existing) {
          setEmployerData(existing);
        } else {
          setEmployerData(prev => ({ ...prev, userId: user.id }));
          setIsEditing(true);
        }
      }
    }
  }, [user, isProfessional, getProfessionalProfile, getEmployerProfile]);

  const handleSave = () => {
    if (isProfessional) {
      saveProfessionalProfile(professionalData);
    } else {
      saveEmployerProfile(employerData);
    }
    setIsEditing(false);
    toast.success(t('profile.saved'));
  };

  const addSkill = () => {
    if (newSkill.trim() && !professionalData.skills.includes(newSkill.trim())) {
      setProfessionalData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfessionalData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return t('availability.available');
      case 'not_available': return t('availability.notAvailable');
      case 'open_to_offers': return t('availability.openToOffers');
      default: return availability;
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">{t('nav.profile')}</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              {t('common.edit')}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm">
                {t('common.cancel')}
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {t('common.save')}
              </Button>
            </div>
          )}
        </div>

        {isProfessional ? (
          // Professional Profile
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t('auth.professional')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>{t('profile.fullName')}</Label>
                      <Input
                        value={professionalData.fullName}
                        onChange={(e) => setProfessionalData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="João Silva"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('profile.city')}</Label>
                        <Input
                          value={professionalData.city}
                          onChange={(e) => setProfessionalData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Ribeirão Preto"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('profile.state')}</Label>
                        <Select
                          value={professionalData.state}
                          onValueChange={(value) => setProfessionalData(prev => ({ ...prev, state: value }))}
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('profile.mainRole')}</Label>
                        <Input
                          value={professionalData.mainRole}
                          onChange={(e) => setProfessionalData(prev => ({ ...prev, mainRole: e.target.value }))}
                          placeholder="Operador de Colheitadeira"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('profile.experience')}</Label>
                        <Input
                          type="number"
                          min="0"
                          value={professionalData.yearsExperience}
                          onChange={(e) => setProfessionalData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('profile.availability')}</Label>
                      <Select
                        value={professionalData.availability}
                        onValueChange={(value: 'available' | 'not_available' | 'open_to_offers') => 
                          setProfessionalData(prev => ({ ...prev, availability: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">{t('availability.available')}</SelectItem>
                          <SelectItem value="not_available">{t('availability.notAvailable')}</SelectItem>
                          <SelectItem value="open_to_offers">{t('availability.openToOffers')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('profile.bio')}</Label>
                      <div className="flex gap-2 items-start">
                        <Textarea
                          value={professionalData.bio}
                          onChange={(e) => setProfessionalData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Conte um pouco sobre sua experiência..."
                          rows={4}
                          className="flex-1"
                        />
                        <VoiceTranscriptionButton
                          onTranscript={(text) => setProfessionalData(prev => ({
                            ...prev,
                            bio: prev.bio ? `${prev.bio} ${text}` : text
                          }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('profile.skills')}</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Adicionar habilidade"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" onClick={addSkill} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {professionalData.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{professionalData.fullName || 'Nome não informado'}</h2>
                      <p className="text-muted-foreground">{professionalData.mainRole || 'Função não informada'}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        {professionalData.city && professionalData.state 
                          ? `${professionalData.city}, ${professionalData.state}` 
                          : 'Localização não informada'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{t('profile.experience')}</p>
                      <p className="text-lg font-semibold">{professionalData.yearsExperience} anos</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{t('profile.availability')}</p>
                      <p className="text-lg font-semibold">{getAvailabilityLabel(professionalData.availability)}</p>
                    </div>
                  </div>

                  {professionalData.bio && (
                    <div>
                      <h3 className="font-semibold mb-2">{t('profile.bio')}</h3>
                      <p className="text-muted-foreground">{professionalData.bio}</p>
                    </div>
                  )}

                  {professionalData.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">{t('profile.skills')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {professionalData.skills.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          // Employer Profile
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                {t('auth.employer')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>{t('profile.companyName')}</Label>
                      <Input
                        value={employerData.companyName}
                        onChange={(e) => setEmployerData(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Fazenda Santa Clara"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('profile.companyType')}</Label>
                      <Select
                        value={employerData.employerType}
                        onValueChange={(value: 'farm' | 'cooperative' | 'retailer' | 'service_provider') => 
                          setEmployerData(prev => ({ ...prev, employerType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farm">{t('companyType.farm')}</SelectItem>
                          <SelectItem value="cooperative">{t('companyType.cooperative')}</SelectItem>
                          <SelectItem value="retailer">{t('companyType.retailer')}</SelectItem>
                          <SelectItem value="service_provider">{t('companyType.serviceProvider')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('profile.city')}</Label>
                        <Input
                          value={employerData.city}
                          onChange={(e) => setEmployerData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Ribeirão Preto"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('profile.state')}</Label>
                        <Select
                          value={employerData.state}
                          onValueChange={(value) => setEmployerData(prev => ({ ...prev, state: value }))}
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
                      <Label>{t('profile.contactPhone')}</Label>
                      <Input
                        value={employerData.contactPhone}
                        onChange={(e) => setEmployerData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('profile.description')}</Label>
                      <Textarea
                        value={employerData.description}
                        onChange={(e) => setEmployerData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Descreva sua empresa..."
                        rows={4}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{employerData.companyName || 'Empresa não informada'}</h2>
                      <Badge variant="secondary" className="mt-1">
                        {getEmployerTypeLabel(employerData.employerType)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4" />
                        {employerData.city && employerData.state 
                          ? `${employerData.city}, ${employerData.state}` 
                          : 'Localização não informada'}
                      </div>
                    </div>
                  </div>

                  {employerData.contactPhone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {employerData.contactPhone}
                    </div>
                  )}

                  {employerData.description && (
                    <div>
                      <h3 className="font-semibold mb-2">{t('profile.description')}</h3>
                      <p className="text-muted-foreground">{employerData.description}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
