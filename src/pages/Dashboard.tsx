import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tractor, 
  User, 
  Briefcase, 
  MessageSquare, 
  FileText,
  LogOut,
  Plus,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isProfessional = user?.role === 'professional';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tractor className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              {t('landing.title')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('auth.logout')}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user?.email.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.completeProfile')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isProfessional ? (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.applicationsSent')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.newMessages')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.jobsPosted')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.totalApplicants')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.newMessages')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {isProfessional ? (
            <>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-primary" />
                    {t('nav.profile')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('profile.editProfile')}
                  </p>
                  <Button size="sm" variant="outline">
                    {t('common.edit')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="h-5 w-5 text-accent" />
                    {t('nav.jobs')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('dashboard.recentJobs')}
                  </p>
                  <Button size="sm" variant="outline">
                    {t('dashboard.viewAll')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    {t('nav.applications')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('applications.noApplications')}
                  </p>
                  <Button size="sm" variant="outline">
                    {t('dashboard.viewAll')}
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-primary" />
                    {t('nav.profile')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('profile.editProfile')}
                  </p>
                  <Button size="sm" variant="outline">
                    {t('common.edit')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="h-5 w-5 text-accent" />
                    {t('nav.postJob')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('jobs.postJob')}
                  </p>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    {t('nav.postJob')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {t('nav.myJobs')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('jobs.noJobs')}
                  </p>
                  <Button size="sm" variant="outline">
                    {t('dashboard.viewAll')}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t('nav.messages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{t('messages.noMessages')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
