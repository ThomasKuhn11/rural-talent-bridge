import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Landing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Trampo no Campo" className="h-14 w-14 rounded-full object-cover" />
            <span className="text-xl font-bold text-foreground">{t('landing.title')}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button variant="ghost" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
            <Button onClick={() => navigate('/signup')}>
              {t('auth.signup')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('landing.subtitle')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('landing.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
              {t('auth.signup')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Professionals */}
            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t('landing.forProfessionals')}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {t('landing.forProfessionalsDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  {t('profile.editProfile')}
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  {t('nav.jobs')}
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  {t('nav.messages')}
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t('landing.forEmployers')}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {t('landing.forEmployersDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  {t('nav.postJob')}
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  {t('nav.applicants')}
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  {t('nav.messages')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">{t('auth.professional')}s</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100+</div>
              <div className="text-sm text-muted-foreground">{t('auth.employer')}s</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">{t('nav.jobs')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">{t('nav.messages')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Trampo no Campo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-semibold text-foreground">{t('landing.title')}</span>
          </div>
          <div className="mb-2">
            <Link to="/about" className="text-sm text-primary hover:underline">
              {t('about.link')}
            </Link>
          </div>
          <p className="text-sm">© 2024 Trampo no Campo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
