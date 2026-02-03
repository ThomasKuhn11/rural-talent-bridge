import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast.success(t('common.success'));
      navigate('/dashboard');
    } else {
      toast.error(t(result.error || 'auth.loginError'));
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (type: 'professional' | 'employer') => {
    setIsLoading(true);
    const demoEmail = type === 'professional' ? 'worker@demo.com' : 'farm@demo.com';
    const demoPassword = 'demo123';
    
    const result = await login(demoEmail, demoPassword);
    
    if (result.success) {
      toast.success(t('common.success'));
      navigate('/dashboard');
    } else {
      toast.error(t(result.error || 'auth.loginError'));
    }
    
    setIsLoading(false);
  };

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

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
              <CardDescription>
                {t('landing.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t('common.loading') : t('auth.login')}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {t('auth.dontHaveAccount')}{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  {t('auth.signup')}
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t('auth.demoAccounts')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">{t('auth.professional')}</p>
                  <p className="text-xs text-muted-foreground">worker@demo.com / demo123</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDemoLogin('professional')}
                  disabled={isLoading}
                >
                  {t('auth.login')}
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">{t('auth.employer')}</p>
                  <p className="text-xs text-muted-foreground">farm@demo.com / demo123</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDemoLogin('employer')}
                  disabled={isLoading}
                >
                  {t('auth.login')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
