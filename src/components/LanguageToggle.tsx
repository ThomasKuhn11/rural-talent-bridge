import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}
      className="flex items-center gap-1 text-sm font-medium"
    >
      {language === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
      <span className="hidden sm:inline">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
    </Button>
  );
};
