import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare,
  Plus
} from 'lucide-react';

export const BottomNav = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (!user) return null;

  const isProfessional = user.role === 'professional';

  const professionalLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/profile', icon: User, label: t('nav.profile') },
    { to: '/jobs', icon: Briefcase, label: t('nav.jobs') },
    { to: '/applications', icon: FileText, label: t('nav.applications') },
    { to: '/messages', icon: MessageSquare, label: t('nav.messages') },
  ];

  const employerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/profile', icon: User, label: t('nav.profile') },
    { to: '/post-job', icon: Plus, label: t('nav.postJob') },
    { to: '/my-jobs', icon: Briefcase, label: t('nav.myJobs') },
    { to: '/messages', icon: MessageSquare, label: t('nav.messages') },
  ];

  const links = isProfessional ? professionalLinks : employerLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="flex justify-around items-center py-2">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
