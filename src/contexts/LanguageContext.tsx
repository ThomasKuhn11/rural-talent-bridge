import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt-BR' | 'en';

interface Translations {
  [key: string]: {
    'pt-BR': string;
    'en': string;
  };
}

const translations: Translations = {
  // Landing Page
  'landing.title': {
    'pt-BR': 'Trampo no Campo',
    'en': 'Trampo no Campo',
  },
  'landing.subtitle': {
    'pt-BR': 'A rede profissional do agronegócio brasileiro',
    'en': 'The professional network for Brazilian agribusiness',
  },
  'landing.description': {
    'pt-BR': 'Conectamos profissionais rurais a fazendas e empresas do agronegócio. Encontre seu próximo trampo ou o talento ideal para sua equipe.',
    'en': 'We connect rural professionals with farms and agribusiness companies. Find your next job or the ideal talent for your team.',
  },
  'landing.forProfessionals': {
    'pt-BR': 'Para Profissionais',
    'en': 'For Professionals',
  },
  'landing.forProfessionalsDesc': {
    'pt-BR': 'Crie seu perfil, encontre vagas e candidate-se às melhores oportunidades do agronegócio.',
    'en': 'Create your profile, find jobs and apply to the best opportunities in agribusiness.',
  },
  'landing.forEmployers': {
    'pt-BR': 'Para Empregadores',
    'en': 'For Employers',
  },
  'landing.forEmployersDesc': {
    'pt-BR': 'Publique vagas, encontre candidatos qualificados e contrate os melhores profissionais.',
    'en': 'Post jobs, find qualified candidates and hire the best professionals.',
  },
  
  // Auth
  'auth.login': {
    'pt-BR': 'Entrar',
    'en': 'Login',
  },
  'auth.signup': {
    'pt-BR': 'Cadastrar',
    'en': 'Sign Up',
  },
  'auth.logout': {
    'pt-BR': 'Sair',
    'en': 'Logout',
  },
  'auth.email': {
    'pt-BR': 'E-mail',
    'en': 'Email',
  },
  'auth.password': {
    'pt-BR': 'Senha',
    'en': 'Password',
  },
  'auth.confirmPassword': {
    'pt-BR': 'Confirmar Senha',
    'en': 'Confirm Password',
  },
  'auth.selectRole': {
    'pt-BR': 'Selecione seu tipo de conta',
    'en': 'Select your account type',
  },
  'auth.professional': {
    'pt-BR': 'Profissional',
    'en': 'Professional',
  },
  'auth.employer': {
    'pt-BR': 'Empregador',
    'en': 'Employer',
  },
  'auth.professionalDesc': {
    'pt-BR': 'Busco oportunidades de trabalho no campo',
    'en': 'I\'m looking for job opportunities in the field',
  },
  'auth.employerDesc': {
    'pt-BR': 'Busco contratar profissionais para minha empresa',
    'en': 'I\'m looking to hire professionals for my company',
  },
  'auth.alreadyHaveAccount': {
    'pt-BR': 'Já tem uma conta?',
    'en': 'Already have an account?',
  },
  'auth.dontHaveAccount': {
    'pt-BR': 'Não tem uma conta?',
    'en': 'Don\'t have an account?',
  },
  'auth.demoAccounts': {
    'pt-BR': 'Contas de Demonstração',
    'en': 'Demo Accounts',
  },
  'auth.loginError': {
    'pt-BR': 'E-mail ou senha incorretos',
    'en': 'Incorrect email or password',
  },
  'auth.signupError': {
    'pt-BR': 'Erro ao criar conta. Tente novamente.',
    'en': 'Error creating account. Please try again.',
  },
  'auth.passwordMismatch': {
    'pt-BR': 'As senhas não coincidem',
    'en': 'Passwords do not match',
  },
  'auth.emailExists': {
    'pt-BR': 'Este e-mail já está cadastrado',
    'en': 'This email is already registered',
  },
  'auth.checkEmail': {
    'pt-BR': 'Verifique seu e-mail',
    'en': 'Check your email',
  },
  'auth.emailSentTo': {
    'pt-BR': 'Enviamos um link de confirmação para {email}',
    'en': 'We sent a confirmation link to {email}',
  },
  'auth.clickLinkToConfirm': {
    'pt-BR': 'Clique no link no e-mail para confirmar sua conta e poder fazer login.',
    'en': 'Click the link in the email to confirm your account and be able to log in.',
  },
  'auth.goToLogin': {
    'pt-BR': 'Ir para o Login',
    'en': 'Go to Login',
  },
  'auth.signupSuccess': {
    'pt-BR': 'Conta criada! Verifique seu e-mail.',
    'en': 'Account created! Check your email.',
  },
  'auth.emailNotConfirmed': {
    'pt-BR': 'Por favor, confirme seu e-mail antes de entrar',
    'en': 'Please confirm your email before logging in',
  },

  // Navigation
  'nav.dashboard': {
    'pt-BR': 'Painel',
    'en': 'Dashboard',
  },
  'nav.profile': {
    'pt-BR': 'Perfil',
    'en': 'Profile',
  },
  'nav.jobs': {
    'pt-BR': 'Vagas',
    'en': 'Jobs',
  },
  'nav.applications': {
    'pt-BR': 'Candidaturas',
    'en': 'Applications',
  },
  'nav.messages': {
    'pt-BR': 'Mensagens',
    'en': 'Messages',
  },
  'nav.myJobs': {
    'pt-BR': 'Minhas Vagas',
    'en': 'My Jobs',
  },
  'nav.postJob': {
    'pt-BR': 'Publicar Vaga',
    'en': 'Post Job',
  },
  'nav.applicants': {
    'pt-BR': 'Candidatos',
    'en': 'Applicants',
  },

  // Dashboard
  'dashboard.welcome': {
    'pt-BR': 'Bem-vindo',
    'en': 'Welcome',
  },
  'dashboard.completeProfile': {
    'pt-BR': 'Complete seu perfil para aumentar suas chances',
    'en': 'Complete your profile to increase your chances',
  },
  'dashboard.applicationsSent': {
    'pt-BR': 'Candidaturas Enviadas',
    'en': 'Applications Sent',
  },
  'dashboard.newMessages': {
    'pt-BR': 'Novas Mensagens',
    'en': 'New Messages',
  },
  'dashboard.jobsPosted': {
    'pt-BR': 'Vagas Publicadas',
    'en': 'Jobs Posted',
  },
  'dashboard.totalApplicants': {
    'pt-BR': 'Total de Candidatos',
    'en': 'Total Applicants',
  },
  'dashboard.recentJobs': {
    'pt-BR': 'Vagas Recentes',
    'en': 'Recent Jobs',
  },
  'dashboard.viewAll': {
    'pt-BR': 'Ver Todas',
    'en': 'View All',
  },

  // Profile
  'profile.editProfile': {
    'pt-BR': 'Editar Perfil',
    'en': 'Edit Profile',
  },
  'profile.saveProfile': {
    'pt-BR': 'Salvar Perfil',
    'en': 'Save Profile',
  },
  'profile.fullName': {
    'pt-BR': 'Nome Completo',
    'en': 'Full Name',
  },
  'profile.city': {
    'pt-BR': 'Cidade',
    'en': 'City',
  },
  'profile.state': {
    'pt-BR': 'Estado',
    'en': 'State',
  },
  'profile.mainRole': {
    'pt-BR': 'Função Principal',
    'en': 'Main Role',
  },
  'profile.experience': {
    'pt-BR': 'Anos de Experiência',
    'en': 'Years of Experience',
  },
  'profile.availability': {
    'pt-BR': 'Disponibilidade',
    'en': 'Availability',
  },
  'profile.bio': {
    'pt-BR': 'Biografia',
    'en': 'Bio',
  },
  'profile.skills': {
    'pt-BR': 'Habilidades',
    'en': 'Skills',
  },
  'profile.companyName': {
    'pt-BR': 'Nome da Empresa',
    'en': 'Company Name',
  },
  'profile.companyType': {
    'pt-BR': 'Tipo de Empresa',
    'en': 'Company Type',
  },
  'profile.description': {
    'pt-BR': 'Descrição',
    'en': 'Description',
  },
  'profile.contactPhone': {
    'pt-BR': 'Telefone de Contato',
    'en': 'Contact Phone',
  },
  'profile.saved': {
    'pt-BR': 'Perfil salvo com sucesso!',
    'en': 'Profile saved successfully!',
  },

  // Jobs
  'jobs.title': {
    'pt-BR': 'Título da Vaga',
    'en': 'Job Title',
  },
  'jobs.location': {
    'pt-BR': 'Localização',
    'en': 'Location',
  },
  'jobs.type': {
    'pt-BR': 'Tipo de Vaga',
    'en': 'Job Type',
  },
  'jobs.permanent': {
    'pt-BR': 'Permanente',
    'en': 'Permanent',
  },
  'jobs.seasonal': {
    'pt-BR': 'Temporário',
    'en': 'Seasonal',
  },
  'jobs.requirements': {
    'pt-BR': 'Requisitos',
    'en': 'Requirements',
  },
  'jobs.salary': {
    'pt-BR': 'Salário',
    'en': 'Salary',
  },
  'jobs.benefits': {
    'pt-BR': 'Benefícios',
    'en': 'Benefits',
  },
  'jobs.apply': {
    'pt-BR': 'Candidatar-se',
    'en': 'Apply',
  },
  'jobs.applied': {
    'pt-BR': 'Candidatado',
    'en': 'Applied',
  },
  'jobs.postJob': {
    'pt-BR': 'Publicar Vaga',
    'en': 'Post Job',
  },
  'jobs.jobPosted': {
    'pt-BR': 'Vaga publicada com sucesso!',
    'en': 'Job posted successfully!',
  },
  'jobs.applicationSent': {
    'pt-BR': 'Candidatura enviada com sucesso!',
    'en': 'Application sent successfully!',
  },
  'jobs.viewApplicants': {
    'pt-BR': 'Ver Candidatos',
    'en': 'View Applicants',
  },
  'jobs.noJobs': {
    'pt-BR': 'Nenhuma vaga encontrada',
    'en': 'No jobs found',
  },
  'jobs.editJob': {
    'pt-BR': 'Editar Vaga',
    'en': 'Edit Job',
  },
  'jobs.deleteJob': {
    'pt-BR': 'Excluir Vaga',
    'en': 'Delete Job',
  },
  'jobs.jobUpdated': {
    'pt-BR': 'Vaga atualizada com sucesso!',
    'en': 'Job updated successfully!',
  },
  'jobs.jobDeleted': {
    'pt-BR': 'Vaga excluída com sucesso!',
    'en': 'Job deleted successfully!',
  },
  'jobs.confirmDelete': {
    'pt-BR': 'Confirmar Exclusão',
    'en': 'Confirm Deletion',
  },
  'jobs.confirmDeleteMessage': {
    'pt-BR': 'Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.',
    'en': 'Are you sure you want to delete this job? This action cannot be undone.',
  },
  'jobs.viewJob': {
    'pt-BR': 'Ver Vaga',
    'en': 'View Job',
  },

  // Applications
  'applications.status': {
    'pt-BR': 'Status',
    'en': 'Status',
  },
  'applications.applied': {
    'pt-BR': 'Candidatado',
    'en': 'Applied',
  },
  'applications.shortlisted': {
    'pt-BR': 'Pré-selecionado',
    'en': 'Shortlisted',
  },
  'applications.rejected': {
    'pt-BR': 'Rejeitado',
    'en': 'Rejected',
  },
  'applications.hired': {
    'pt-BR': 'Contratado',
    'en': 'Hired',
  },
  'applications.noApplications': {
    'pt-BR': 'Nenhuma candidatura ainda',
    'en': 'No applications yet',
  },

  // Messages
  'messages.sendMessage': {
    'pt-BR': 'Enviar Mensagem',
    'en': 'Send Message',
  },
  'messages.typeMessage': {
    'pt-BR': 'Digite sua mensagem...',
    'en': 'Type your message...',
  },
  'messages.noMessages': {
    'pt-BR': 'Nenhuma mensagem ainda',
    'en': 'No messages yet',
  },
  'messages.startConversation': {
    'pt-BR': 'Iniciar Conversa',
    'en': 'Start Conversation',
  },

  // About Page
  'about.title': {
    'pt-BR': 'Sobre Nós',
    'en': 'About Us',
  },
  'about.subtitle': {
    'pt-BR': 'Transformando o agronegócio brasileiro conectando talentos às melhores oportunidades do campo.',
    'en': 'Transforming Brazilian agribusiness by connecting talent to the best opportunities in the field.',
  },
  'about.mission': {
    'pt-BR': 'Missão',
    'en': 'Mission',
  },
  'about.missionDesc': {
    'pt-BR': 'Democratizar o acesso a oportunidades de trabalho no agronegócio, conectando profissionais qualificados a empresas que valorizam o talento rural.',
    'en': 'Democratize access to job opportunities in agribusiness, connecting qualified professionals to companies that value rural talent.',
  },
  'about.vision': {
    'pt-BR': 'Visão',
    'en': 'Vision',
  },
  'about.visionDesc': {
    'pt-BR': 'Ser a principal plataforma de empregabilidade do agronegócio no Brasil, reconhecida pela excelência na conexão entre profissionais e empregadores.',
    'en': 'Be the leading employability platform for agribusiness in Brazil, recognized for excellence in connecting professionals and employers.',
  },
  'about.values': {
    'pt-BR': 'Valores',
    'en': 'Values',
  },
  'about.valuesDesc': {
    'pt-BR': 'Transparência, respeito ao trabalhador rural, inovação no campo e compromisso com o desenvolvimento sustentável do agronegócio.',
    'en': 'Transparency, respect for rural workers, innovation in the field, and commitment to sustainable agribusiness development.',
  },
  'about.ourStory': {
    'pt-BR': 'Nossa História',
    'en': 'Our Story',
  },
  'about.storyP1': {
    'pt-BR': 'O Trampo no Campo nasceu da necessidade real de conectar profissionais do agronegócio às oportunidades certas. Percebemos que muitos talentos do campo tinham dificuldade em encontrar vagas adequadas, enquanto empregadores lutavam para encontrar profissionais qualificados.',
    'en': 'Trampo no Campo was born from the real need to connect agribusiness professionals with the right opportunities. We noticed that many rural talents had difficulty finding suitable jobs, while employers struggled to find qualified professionals.',
  },
  'about.storyP2': {
    'pt-BR': 'Criamos uma plataforma simples e acessível, pensada especialmente para o trabalhador rural e as empresas do agronegócio brasileiro. Nossa missão é fortalecer o campo brasileiro, valorizando os profissionais que são a base da nossa economia.',
    'en': 'We created a simple and accessible platform, designed especially for rural workers and Brazilian agribusiness companies. Our mission is to strengthen the Brazilian countryside, valuing the professionals who are the foundation of our economy.',
  },
  'about.whatWeDo': {
    'pt-BR': 'O Que Fazemos',
    'en': 'What We Do',
  },
  'about.connectTitle': {
    'pt-BR': 'Conectamos',
    'en': 'We Connect',
  },
  'about.connectDesc': {
    'pt-BR': 'Unimos profissionais do campo a fazendas, cooperativas e empresas do agronegócio em todo o Brasil.',
    'en': 'We unite field professionals with farms, cooperatives, and agribusiness companies across Brazil.',
  },
  'about.growTitle': {
    'pt-BR': 'Desenvolvemos',
    'en': 'We Grow',
  },
  'about.growDesc': {
    'pt-BR': 'Apoiamos o crescimento profissional com ferramentas que destacam habilidades e experiências do trabalhador rural.',
    'en': 'We support professional growth with tools that highlight skills and experiences of rural workers.',
  },
  'about.transformTitle': {
    'pt-BR': 'Transformamos',
    'en': 'We Transform',
  },
  'about.transformDesc': {
    'pt-BR': 'Facilitamos contratações mais rápidas e eficientes, transformando o mercado de trabalho do agronegócio.',
    'en': 'We facilitate faster and more efficient hiring, transforming the agribusiness job market.',
  },
  'about.ctaTitle': {
    'pt-BR': 'Faça Parte Dessa Transformação',
    'en': 'Be Part of This Transformation',
  },
  'about.ctaDesc': {
    'pt-BR': 'Junte-se a centenas de profissionais e empresas que já estão conectados no Trampo no Campo.',
    'en': 'Join hundreds of professionals and companies already connected on Trampo no Campo.',
  },
  'about.link': {
    'pt-BR': 'Sobre Nós',
    'en': 'About Us',
  },

  // Common
  'common.save': {
    'pt-BR': 'Salvar',
    'en': 'Save',
  },
  'common.cancel': {
    'pt-BR': 'Cancelar',
    'en': 'Cancel',
  },
  'common.edit': {
    'pt-BR': 'Editar',
    'en': 'Edit',
  },
  'common.delete': {
    'pt-BR': 'Excluir',
    'en': 'Delete',
  },
  'common.loading': {
    'pt-BR': 'Carregando...',
    'en': 'Loading...',
  },
  'common.error': {
    'pt-BR': 'Erro',
    'en': 'Error',
  },
  'common.success': {
    'pt-BR': 'Sucesso',
    'en': 'Success',
  },
  'common.back': {
    'pt-BR': 'Voltar',
    'en': 'Back',
  },
  'common.next': {
    'pt-BR': 'Próximo',
    'en': 'Next',
  },
  'common.search': {
    'pt-BR': 'Buscar',
    'en': 'Search',
  },

  // Company Types
  'companyType.farm': {
    'pt-BR': 'Fazenda',
    'en': 'Farm',
  },
  'companyType.cooperative': {
    'pt-BR': 'Cooperativa',
    'en': 'Cooperative',
  },
  'companyType.retailer': {
    'pt-BR': 'Revenda',
    'en': 'Retailer',
  },
  'companyType.serviceProvider': {
    'pt-BR': 'Prestador de Serviços',
    'en': 'Service Provider',
  },

  // Availability
  'availability.available': {
    'pt-BR': 'Disponível',
    'en': 'Available',
  },
  'availability.notAvailable': {
    'pt-BR': 'Indisponível',
    'en': 'Not Available',
  },
  'availability.openToOffers': {
    'pt-BR': 'Aberto a Propostas',
    'en': 'Open to Offers',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('trampo-language');
    return (saved as Language) || 'pt-BR';
  });

  useEffect(() => {
    localStorage.setItem('trampo-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
