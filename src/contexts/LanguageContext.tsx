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
    'pt-BR': 'Nascemos para resolver um dos maiores desafios do agronegócio brasileiro: a escassez de mão de obra qualificada no campo.',
    'en': 'We were born to solve one of the biggest challenges in Brazilian agribusiness: the shortage of qualified workforce in rural areas.',
  },
  'about.crisisTitle': {
    'pt-BR': 'O Desafio: Escassez de Mão de Obra no Campo',
    'en': 'The Challenge: Rural Workforce Shortage',
  },
  'about.crisisP1': {
    'pt-BR': 'O agronegócio brasileiro representa cerca de 24% do PIB nacional e é um dos pilares da economia do país. No entanto, o setor enfrenta uma crise silenciosa: a crescente dificuldade em encontrar e reter profissionais qualificados.',
    'en': 'Brazilian agribusiness accounts for roughly 24% of the national GDP and is one of the pillars of the country\'s economy. Yet the sector faces a silent crisis: the growing difficulty in finding and retaining qualified professionals.',
  },
  'about.crisisP2': {
    'pt-BR': 'Com o êxodo rural acelerado nas últimas décadas, milhões de trabalhadores migraram para as cidades em busca de melhores condições. O resultado? Fazendas, cooperativas e empresas do agro lutam para preencher vagas essenciais — de operadores de máquinas a agrônomos, de técnicos agrícolas a gestores de propriedade.',
    'en': 'With accelerated rural exodus over recent decades, millions of workers have migrated to cities seeking better conditions. The result? Farms, cooperatives, and agribusiness companies struggle to fill essential roles — from machine operators to agronomists, from agricultural technicians to farm managers.',
  },
  'about.crisisP3': {
    'pt-BR': 'Segundo dados da CNA (Confederação da Agricultura e Pecuária do Brasil), mais de 70% dos produtores rurais relatam dificuldade em contratar mão de obra. Ao mesmo tempo, profissionais qualificados no campo muitas vezes não têm acesso a ferramentas digitais para encontrar as melhores oportunidades.',
    'en': 'According to data from the CNA (Brazilian Agriculture and Livestock Confederation), over 70% of rural producers report difficulty in hiring workers. At the same time, qualified professionals in rural areas often lack access to digital tools to find the best opportunities.',
  },
  'about.crisisStat1': {
    'pt-BR': '24%',
    'en': '24%',
  },
  'about.crisisStat1Label': {
    'pt-BR': 'do PIB brasileiro vem do agronegócio',
    'en': 'of Brazilian GDP comes from agribusiness',
  },
  'about.crisisStat2': {
    'pt-BR': '70%+',
    'en': '70%+',
  },
  'about.crisisStat2Label': {
    'pt-BR': 'dos produtores têm dificuldade em contratar',
    'en': 'of producers struggle to hire workers',
  },
  'about.crisisStat3': {
    'pt-BR': '15M+',
    'en': '15M+',
  },
  'about.crisisStat3Label': {
    'pt-BR': 'trabalhadores no agronegócio brasileiro',
    'en': 'workers in Brazilian agribusiness',
  },
  'about.solutionTitle': {
    'pt-BR': 'Nossa Solução',
    'en': 'Our Solution',
  },
  'about.solutionDesc': {
    'pt-BR': 'O Trampo no Campo foi criado para ser a ponte digital entre o talento rural e as oportunidades do agronegócio. Uma plataforma simples, acessível e pensada para a realidade do campo brasileiro.',
    'en': 'Trampo no Campo was created to be the digital bridge between rural talent and agribusiness opportunities. A simple, accessible platform designed for the reality of the Brazilian countryside.',
  },
  'about.mission': {
    'pt-BR': 'Missão',
    'en': 'Mission',
  },
  'about.missionDesc': {
    'pt-BR': 'Democratizar o acesso a oportunidades de trabalho no agronegócio, combatendo a escassez de mão de obra com tecnologia acessível que conecta profissionais qualificados a empresas que valorizam o talento rural.',
    'en': 'Democratize access to job opportunities in agribusiness, fighting workforce shortages with accessible technology that connects qualified professionals to companies that value rural talent.',
  },
  'about.vision': {
    'pt-BR': 'Visão',
    'en': 'Vision',
  },
  'about.visionDesc': {
    'pt-BR': 'Ser a principal plataforma de empregabilidade do agronegócio no Brasil, contribuindo para reverter o êxodo rural ao tornar o trabalho no campo mais conectado, valorizado e acessível.',
    'en': 'Be the leading employability platform for agribusiness in Brazil, contributing to reversing rural exodus by making field work more connected, valued, and accessible.',
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
    'pt-BR': 'O Trampo no Campo nasceu da observação direta de um problema crítico: enquanto o agronegócio brasileiro bate recordes de produção e exportação, a base humana que sustenta essa potência enfrenta uma crise de escassez sem precedentes. Profissionais qualificados deixam o campo, e as empresas ficam sem opções.',
    'en': 'Trampo no Campo was born from directly observing a critical problem: while Brazilian agribusiness breaks production and export records, the human foundation that sustains this powerhouse faces an unprecedented shortage crisis. Qualified professionals leave rural areas, and companies are left without options.',
  },
  'about.storyP2': {
    'pt-BR': 'Criamos uma plataforma pensada para resolver esse descompasso — simples o suficiente para ser usada por qualquer trabalhador rural com um celular, e poderosa o suficiente para ajudar empregadores a encontrar exatamente o profissional que precisam. Nosso objetivo é fortalecer o campo brasileiro, valorizando quem faz o agro acontecer.',
    'en': 'We created a platform designed to solve this mismatch — simple enough to be used by any rural worker with a phone, and powerful enough to help employers find exactly the professional they need. Our goal is to strengthen the Brazilian countryside, valuing those who make agribusiness happen.',
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
    'pt-BR': 'Unimos profissionais do campo a fazendas, cooperativas e empresas do agronegócio em todo o Brasil, eliminando barreiras geográficas e de acesso à informação.',
    'en': 'We unite field professionals with farms, cooperatives, and agribusiness companies across Brazil, eliminating geographic and information access barriers.',
  },
  'about.growTitle': {
    'pt-BR': 'Desenvolvemos',
    'en': 'We Grow',
  },
  'about.growDesc': {
    'pt-BR': 'Apoiamos o crescimento profissional com ferramentas que destacam habilidades e experiências, tornando o trabalhador rural visível no mercado digital.',
    'en': 'We support professional growth with tools that highlight skills and experiences, making rural workers visible in the digital marketplace.',
  },
  'about.transformTitle': {
    'pt-BR': 'Transformamos',
    'en': 'We Transform',
  },
  'about.transformDesc': {
    'pt-BR': 'Facilitamos contratações mais rápidas e eficientes, ajudando a combater a crise de mão de obra e transformando o mercado de trabalho do agronegócio.',
    'en': 'We facilitate faster and more efficient hiring, helping combat the workforce crisis and transforming the agribusiness job market.',
  },
  'about.ctaTitle': {
    'pt-BR': 'Faça Parte Dessa Transformação',
    'en': 'Be Part of This Transformation',
  },
  'about.ctaDesc': {
    'pt-BR': 'O campo precisa de você. Seja profissional buscando oportunidades ou empregador procurando talentos — juntos podemos fortalecer o agronegócio brasileiro.',
    'en': 'The field needs you. Whether you\'re a professional seeking opportunities or an employer looking for talent — together we can strengthen Brazilian agribusiness.',
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
