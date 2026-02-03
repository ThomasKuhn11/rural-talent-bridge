import { ProfessionalProfile, EmployerProfile, Job, Application, Message } from '@/types';

// Demo user credentials
export const DEMO_USERS = [
  {
    id: 'demo-worker-1',
    email: 'worker@demo.com',
    password: 'demo123',
    role: 'professional' as const,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'demo-employer-1',
    email: 'farm@demo.com',
    password: 'demo123',
    role: 'employer' as const,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Additional professional users
  { id: 'pro-1', email: 'joao.silva@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-01-15T00:00:00Z' },
  { id: 'pro-2', email: 'maria.santos@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-01-20T00:00:00Z' },
  { id: 'pro-3', email: 'carlos.oliveira@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-02-01T00:00:00Z' },
  { id: 'pro-4', email: 'ana.costa@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-02-10T00:00:00Z' },
  { id: 'pro-5', email: 'pedro.lima@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'pro-6', email: 'juliana.ferreira@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-02-20T00:00:00Z' },
  { id: 'pro-7', email: 'ricardo.almeida@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-03-01T00:00:00Z' },
  { id: 'pro-8', email: 'fernanda.rocha@email.com', password: 'demo123', role: 'professional' as const, createdAt: '2024-03-05T00:00:00Z' },
  // Additional employer users
  { id: 'emp-2', email: 'contato@fazendaboavista.com', password: 'demo123', role: 'employer' as const, createdAt: '2024-01-10T00:00:00Z' },
  { id: 'emp-3', email: 'rh@cooperativacentral.com', password: 'demo123', role: 'employer' as const, createdAt: '2024-01-25T00:00:00Z' },
];

export const DEMO_PROFESSIONAL_PROFILES: ProfessionalProfile[] = [
  {
    userId: 'demo-worker-1',
    fullName: 'José Carlos Mendes',
    photoUrl: '',
    city: 'Ribeirão Preto',
    state: 'SP',
    mainRole: 'Operador de Colheitadeira',
    yearsExperience: 12,
    availability: 'available',
    bio: 'Operador experiente com mais de 12 anos trabalhando com colheitadeiras John Deere e Case. Especializado em colheita de soja e milho.',
    skills: ['Colheitadeira', 'Trator', 'Manutenção Básica', 'CNH E', 'GPS Agrícola'],
  },
  {
    userId: 'pro-1',
    fullName: 'João Silva',
    photoUrl: '',
    city: 'Uberaba',
    state: 'MG',
    mainRole: 'Tratorista',
    yearsExperience: 8,
    availability: 'available',
    bio: 'Tratorista experiente em plantio e preparo de solo. Trabalho com tratores de várias marcas.',
    skills: ['Trator', 'Plantadeira', 'Pulverizador', 'CNH D'],
  },
  {
    userId: 'pro-2',
    fullName: 'Maria Santos',
    photoUrl: '',
    city: 'Piracicaba',
    state: 'SP',
    mainRole: 'Agrônoma',
    yearsExperience: 6,
    availability: 'open_to_offers',
    bio: 'Engenheira agrônoma especializada em manejo integrado de pragas e doenças em culturas de grãos.',
    skills: ['CREA Ativo', 'Manejo de Pragas', 'Agricultura de Precisão', 'Análise de Solo'],
  },
  {
    userId: 'pro-3',
    fullName: 'Carlos Oliveira',
    photoUrl: '',
    city: 'Sorriso',
    state: 'MT',
    mainRole: 'Operador de Drone',
    yearsExperience: 3,
    availability: 'available',
    bio: 'Piloto de drone certificado ANAC para pulverização e mapeamento aéreo de lavouras.',
    skills: ['Drone Agrícola', 'Pulverização', 'Mapeamento', 'Certificado ANAC'],
  },
  {
    userId: 'pro-4',
    fullName: 'Ana Costa',
    photoUrl: '',
    city: 'Londrina',
    state: 'PR',
    mainRole: 'Veterinária',
    yearsExperience: 10,
    availability: 'available',
    bio: 'Médica veterinária especializada em bovinos de corte e leite. Experiência em reprodução e sanidade.',
    skills: ['CRMV Ativo', 'Bovinos', 'Inseminação', 'Sanidade Animal'],
  },
  {
    userId: 'pro-5',
    fullName: 'Pedro Lima',
    photoUrl: '',
    city: 'Rio Verde',
    state: 'GO',
    mainRole: 'Técnico Agrícola',
    yearsExperience: 5,
    availability: 'available',
    bio: 'Técnico agrícola formado pelo IF Goiano. Experiência em acompanhamento de lavouras de soja e milho.',
    skills: ['CFTA Ativo', 'Manejo de Culturas', 'Irrigação', 'Excel Avançado'],
  },
  {
    userId: 'pro-6',
    fullName: 'Juliana Ferreira',
    photoUrl: '',
    city: 'Dourados',
    state: 'MS',
    mainRole: 'Gerente de Fazenda',
    yearsExperience: 15,
    availability: 'open_to_offers',
    bio: 'Gestora rural com vasta experiência em administração de propriedades agrícolas de grande porte.',
    skills: ['Gestão Rural', 'Liderança', 'Planejamento', 'Finanças Agrícolas'],
  },
  {
    userId: 'pro-7',
    fullName: 'Ricardo Almeida',
    photoUrl: '',
    city: 'Luís Eduardo Magalhães',
    state: 'BA',
    mainRole: 'Mecânico Agrícola',
    yearsExperience: 20,
    availability: 'available',
    bio: 'Mecânico especializado em manutenção preventiva e corretiva de máquinas agrícolas John Deere e New Holland.',
    skills: ['Mecânica Diesel', 'Hidráulica', 'Elétrica', 'Solda'],
  },
  {
    userId: 'pro-8',
    fullName: 'Fernanda Rocha',
    photoUrl: '',
    city: 'Rondonópolis',
    state: 'MT',
    mainRole: 'Operadora de Pulverizador',
    yearsExperience: 4,
    availability: 'available',
    bio: 'Operadora de pulverizador autopropelido com certificação em aplicação de defensivos.',
    skills: ['Pulverizador', 'Certificação NR-31', 'GPS', 'Calibração'],
  },
];

export const DEMO_EMPLOYER_PROFILES: EmployerProfile[] = [
  {
    userId: 'demo-employer-1',
    companyName: 'Fazenda Santa Clara',
    city: 'Ribeirão Preto',
    state: 'SP',
    employerType: 'farm',
    description: 'Fazenda de 5.000 hectares especializada na produção de cana-de-açúcar e soja. Buscamos profissionais qualificados para nossa equipe.',
    contactPhone: '(16) 99999-1234',
  },
  {
    userId: 'emp-2',
    companyName: 'Fazenda Boa Vista',
    city: 'Sorriso',
    state: 'MT',
    employerType: 'farm',
    description: 'Uma das maiores produtoras de soja do Mato Grosso com mais de 20.000 hectares de área plantada.',
    contactPhone: '(66) 99888-5678',
  },
  {
    userId: 'emp-3',
    companyName: 'Cooperativa Central Agrícola',
    city: 'Cascavel',
    state: 'PR',
    employerType: 'cooperative',
    description: 'Cooperativa com mais de 5.000 associados, oferecendo suporte técnico e comercialização de grãos.',
    contactPhone: '(45) 99777-9012',
  },
];

export const DEMO_JOBS: Job[] = [
  {
    id: 'job-1',
    employerId: 'demo-employer-1',
    title: 'Operador de Colheitadeira',
    city: 'Ribeirão Preto',
    state: 'SP',
    jobType: 'permanent',
    requirements: 'Experiência mínima de 3 anos com colheitadeiras. CNH categoria D. Disponibilidade para trabalhar em turnos.',
    salary: 'R$ 4.500 - R$ 5.500',
    benefits: 'Moradia na fazenda, alimentação, plano de saúde',
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'job-2',
    employerId: 'demo-employer-1',
    title: 'Tratorista',
    city: 'Ribeirão Preto',
    state: 'SP',
    jobType: 'permanent',
    requirements: 'Experiência com tratores de grande porte. Conhecimento em plantio e preparo de solo.',
    salary: 'R$ 3.500 - R$ 4.200',
    benefits: 'Moradia, alimentação, transporte',
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'job-3',
    employerId: 'demo-employer-1',
    title: 'Mecânico de Máquinas Agrícolas',
    city: 'Ribeirão Preto',
    state: 'SP',
    jobType: 'permanent',
    requirements: 'Formação técnica em mecânica. Experiência com John Deere e Case.',
    salary: 'R$ 5.000 - R$ 6.500',
    benefits: 'Moradia, alimentação, plano de saúde, ferramentas',
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'job-4',
    employerId: 'emp-2',
    title: 'Agrônomo - Manejo de Culturas',
    city: 'Sorriso',
    state: 'MT',
    jobType: 'permanent',
    requirements: 'Graduação em Agronomia. CREA ativo. Experiência em soja e milho.',
    salary: 'R$ 8.000 - R$ 12.000',
    benefits: 'Casa mobiliada, veículo, plano de saúde',
    createdAt: '2024-03-12T00:00:00Z',
  },
  {
    id: 'job-5',
    employerId: 'emp-2',
    title: 'Operador de Drone Agrícola',
    city: 'Sorriso',
    state: 'MT',
    jobType: 'seasonal',
    requirements: 'Certificação ANAC para piloto de drone. Experiência em pulverização aérea.',
    salary: 'R$ 6.000 - R$ 8.000',
    benefits: 'Hospedagem, alimentação',
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'job-6',
    employerId: 'emp-2',
    title: 'Gerente de Fazenda',
    city: 'Sorriso',
    state: 'MT',
    jobType: 'permanent',
    requirements: 'Experiência mínima de 10 anos em gestão rural. Formação em Agronomia ou Administração.',
    salary: 'R$ 15.000 - R$ 20.000',
    benefits: 'Casa, veículo, bônus por produtividade',
    createdAt: '2024-03-18T00:00:00Z',
  },
  {
    id: 'job-7',
    employerId: 'emp-3',
    title: 'Técnico Agrícola de Campo',
    city: 'Cascavel',
    state: 'PR',
    jobType: 'permanent',
    requirements: 'Curso técnico em agricultura. CFTA ativo. Veículo próprio.',
    salary: 'R$ 3.800 - R$ 4.500',
    benefits: 'Ajuda de custo combustível, plano de saúde',
    createdAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'job-8',
    employerId: 'emp-3',
    title: 'Consultor de Vendas - Insumos',
    city: 'Cascavel',
    state: 'PR',
    jobType: 'permanent',
    requirements: 'Experiência em vendas de insumos agrícolas. Conhecimento técnico em defensivos e fertilizantes.',
    salary: 'R$ 4.000 + comissão',
    benefits: 'Veículo da empresa, celular, notebook',
    createdAt: '2024-03-22T00:00:00Z',
  },
  {
    id: 'job-9',
    employerId: 'demo-employer-1',
    title: 'Trabalhador Rural - Safra',
    city: 'Ribeirão Preto',
    state: 'SP',
    jobType: 'seasonal',
    requirements: 'Disponibilidade para trabalho braçal. Experiência em colheita é diferencial.',
    salary: 'R$ 2.200 - R$ 2.800',
    benefits: 'Moradia, alimentação, transporte',
    createdAt: '2024-03-25T00:00:00Z',
  },
  {
    id: 'job-10',
    employerId: 'emp-2',
    title: 'Veterinário - Pecuária de Corte',
    city: 'Sorriso',
    state: 'MT',
    jobType: 'permanent',
    requirements: 'Graduação em Veterinária. CRMV ativo. Experiência com gado Nelore.',
    salary: 'R$ 10.000 - R$ 14.000',
    benefits: 'Casa, veículo, plano de saúde',
    createdAt: '2024-03-28T00:00:00Z',
  },
];

export const DEMO_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    professionalId: 'demo-worker-1',
    status: 'applied',
    createdAt: '2024-03-02T10:00:00Z',
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    professionalId: 'pro-2',
    status: 'shortlisted',
    createdAt: '2024-03-13T14:00:00Z',
  },
  {
    id: 'app-3',
    jobId: 'job-1',
    professionalId: 'pro-1',
    status: 'applied',
    createdAt: '2024-03-03T09:00:00Z',
  },
  {
    id: 'app-4',
    jobId: 'job-5',
    professionalId: 'pro-3',
    status: 'hired',
    createdAt: '2024-03-16T11:00:00Z',
  },
  {
    id: 'app-5',
    jobId: 'job-10',
    professionalId: 'pro-4',
    status: 'applied',
    createdAt: '2024-03-29T08:00:00Z',
  },
];

export const DEMO_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    fromUserId: 'demo-employer-1',
    toUserId: 'demo-worker-1',
    body: 'Olá José! Vi seu perfil e gostei muito da sua experiência com colheitadeiras. Podemos conversar sobre a vaga?',
    createdAt: '2024-03-02T14:30:00Z',
    read: true,
  },
  {
    id: 'msg-2',
    fromUserId: 'demo-worker-1',
    toUserId: 'demo-employer-1',
    body: 'Boa tarde! Obrigado pelo contato. Tenho muito interesse na vaga. Estou disponível para conversar.',
    createdAt: '2024-03-02T15:45:00Z',
    read: true,
  },
  {
    id: 'msg-3',
    fromUserId: 'demo-employer-1',
    toUserId: 'demo-worker-1',
    body: 'Ótimo! Podemos agendar uma visita à fazenda para você conhecer nossa operação? Que dia seria melhor para você?',
    createdAt: '2024-03-02T16:00:00Z',
    read: false,
  },
  {
    id: 'msg-4',
    fromUserId: 'emp-2',
    toUserId: 'pro-3',
    body: 'Parabéns Carlos! Você foi selecionado para a vaga de Operador de Drone. Quando pode começar?',
    createdAt: '2024-03-17T10:00:00Z',
    read: true,
  },
  {
    id: 'msg-5',
    fromUserId: 'pro-3',
    toUserId: 'emp-2',
    body: 'Muito obrigado pela oportunidade! Posso começar na próxima segunda-feira.',
    createdAt: '2024-03-17T11:30:00Z',
    read: true,
  },
];

// Initialize demo data in localStorage
export const initializeDemoData = () => {
  const isInitialized = localStorage.getItem('trampo-demo-initialized');
  
  if (!isInitialized) {
    // Save users
    localStorage.setItem('trampo-users', JSON.stringify(DEMO_USERS));
    
    // Save professional profiles
    localStorage.setItem('trampo-professional-profiles', JSON.stringify(DEMO_PROFESSIONAL_PROFILES));
    
    // Save employer profiles
    localStorage.setItem('trampo-employer-profiles', JSON.stringify(DEMO_EMPLOYER_PROFILES));
    
    // Save jobs
    localStorage.setItem('trampo-jobs', JSON.stringify(DEMO_JOBS));
    
    // Save applications
    localStorage.setItem('trampo-applications', JSON.stringify(DEMO_APPLICATIONS));
    
    // Save messages
    localStorage.setItem('trampo-messages', JSON.stringify(DEMO_MESSAGES));
    
    // Mark as initialized
    localStorage.setItem('trampo-demo-initialized', 'true');
    
    console.log('Demo data initialized successfully!');
  }
};

// Helper functions to get data from localStorage
export const getStoredData = <T>(key: string, defaultValue: T[]): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const saveStoredData = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
