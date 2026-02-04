import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, ArrowLeft, Users, Briefcase, Check, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Signup = () => {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast.error(t('auth.selectRole'));
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }
    
    setIsLoading(true);
    
    const result = await signup(email, password, role);
    
    if (result.success) {
      // Show email confirmation message instead of redirecting
      setShowEmailConfirmation(true);
      toast.success(t('auth.signupSuccess'));
    } else {
      toast.error(t(result.error || 'auth.signupError'));
    }
    
    setIsLoading(false);
  };

  // Show email confirmation screen after successful signup
  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              <Tractor className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-foreground">{t('landing.title')}</span>
            </Link>
            <LanguageToggle />
          </div>
        </header>

        {/* Email Confirmation Message */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t('auth.checkEmail')}</CardTitle>
              <CardDescription className="mt-2">
                {t('auth.emailSentTo').replace('{email}', email)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('auth.clickLinkToConfirm')}
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/login')}
              >
                {t('auth.goToLogin')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Tractor className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">{t('landing.title')}</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('auth.signup')}</CardTitle>
              <CardDescription>
                {t('landing.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label>{t('auth.selectRole')}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('professional')}
                      className={cn(
                        "relative p-4 rounded-lg border-2 transition-all text-left",
                        role === 'professional'
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {role === 'professional' && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <Users className={cn(
                        "h-8 w-8 mb-2",
                        role === 'professional' ? "text-primary" : "text-muted-foreground"
                      )} />
                      <p className="font-medium text-foreground">{t('auth.professional')}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('auth.professionalDesc')}
                      </p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setRole('employer')}
                      className={cn(
                        "relative p-4 rounded-lg border-2 transition-all text-left",
                        role === 'employer'
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      {role === 'employer' && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                      )}
                      <Briefcase className={cn(
                        "h-8 w-8 mb-2",
                        role === 'employer' ? "text-accent" : "text-muted-foreground"
                      )} />
                      <p className="font-medium text-foreground">{t('auth.employer')}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('auth.employerDesc')}
                      </p>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={isLoading || !role}>
                    {isLoading ? t('common.loading') : t('auth.signup')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={async () => {
                      if (!role) return;
                      const { data, error } = await import('@/integrations/supabase/client').then(m => 
                        m.supabase.auth.signUp({ email, password })
                      );
                      console.log('Debug - data.user:', data?.user);
                      console.log('Debug - error:', error);
                    }}
                  >
                    Debug
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {t('auth.alreadyHaveAccount')}{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t('auth.login')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
