import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Eye, Heart, Users, Sprout, Handshake, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import lavoura from '@/assets/lavoura.jpg';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <img src={logo} alt="Trampo no Campo" className="h-14 w-14 rounded-full object-cover" />
            <span className="text-xl font-bold text-foreground">{t('landing.title')}</span>
          </Link>
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

      {/* Hero Section with background image */}
      <section className="relative py-20 md:py-32 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${lavoura})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Crisis Section */}
      <section className="py-16 px-4 bg-destructive/5 border-y border-destructive/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            <h2 className="text-3xl font-bold text-foreground text-center">
              {t('about.crisisTitle')}
            </h2>
          </div>

          <div className="space-y-5 mb-12">
            <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-4xl mx-auto">
              {t('about.crisisP1')}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-4xl mx-auto">
              {t('about.crisisP2')}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-4xl mx-auto">
              {t('about.crisisP3')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-primary mb-2">{t('about.crisisStat1')}</p>
              <p className="text-sm text-muted-foreground">{t('about.crisisStat1Label')}</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <TrendingDown className="h-8 w-8 text-destructive mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-destructive mb-2">{t('about.crisisStat2')}</p>
              <p className="text-sm text-muted-foreground">{t('about.crisisStat2Label')}</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-accent mb-2">{t('about.crisisStat3')}</p>
              <p className="text-sm text-muted-foreground">{t('about.crisisStat3Label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Sprout className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('about.solutionTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t('about.solutionDesc')}
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('about.mission')}
              </h2>
              <p className="text-muted-foreground">
                {t('about.missionDesc')}
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('about.vision')}
              </h2>
              <p className="text-muted-foreground">
                {t('about.visionDesc')}
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('about.values')}
              </h2>
              <p className="text-muted-foreground">
                {t('about.valuesDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('about.ourStory')}
          </h2>
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-sm border">
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              {t('about.storyP1')}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('about.storyP2')}
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('about.whatWeDo')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-accent/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t('about.connectTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.connectDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t('about.growTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.growDesc')}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-accent/10 rounded-full mb-4">
                <Handshake className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t('about.transformTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.transformDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('about.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/signup')}>
              {t('auth.signup')}
            </Button>
            <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/10" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
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
          <p className="text-sm">© 2024 Trampo no Campo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
