
export enum TransactionType {
  INCOME = 'INCOME',
  FIXED_EXPENSE = 'FIXED_EXPENSE',
  ESSENTIAL_VARIABLE = 'ESSENTIAL_VARIABLE',
  NON_ESSENTIAL_VARIABLE = 'NON_ESSENTIAL_VARIABLE'
}

export enum SubscriptionStatus {
  TRIAL = 'trial_active',
  ACTIVE = 'active_subscription',
  BLOCKED = 'blocked_no_payment'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  interestRate: number;
  creditor: string;
  isNegotiated: boolean;
}

export enum UserProfileType {
  IMPULSIVE = 'Impulsivo',
  BALANCED = 'Equilibrado',
  DISORGANIZED = 'Disorganizado',
  STRATEGIC = 'Estratégico',
  CONSERVATIVE = 'Conservador'
}

export interface BusinessIdea {
  title: string;
  category: string;
  difficulty: string;
  initialInvestment: string;
  potentialReturn: string;
  steps: string[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  monthlyIncome: number;
  transactions: Transaction[];
  debts: Debt[];
  profileType?: UserProfileType;
  registrationDate: number;
  trialEndDate: number;
  status: SubscriptionStatus;
  acceptedTerms: boolean;
  roadmapProgress: string[]; 
  budgetRule: {
    livingCost: number; 
    futureGoals: number; 
    lifestyle: number; 
  };
  isOnboarded: boolean;
  financialGoal: string;
  businessIdeas?: BusinessIdea[];
  
  // Novos campos SaaS Onboarding
  financialSituation?: 'endividado' | 'organizado_sem_investir' | 'investidor_melhorando';
  onboardingGoal?: 'sair_dividas' | 'organizar' | 'investir' | 'criar_renda';
  behavioralAnswers?: {
    impulseSpending: boolean;
    prefersSecurity: boolean;
    triedBefore: boolean;
  };
}
