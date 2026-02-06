import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

export const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={logo} alt="Trampo no Campo" className="h-12 w-12 rounded-full object-cover" />
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            {t('landing.title')}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('auth.logout')}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
