
import { UserData, SubscriptionStatus } from '../types';

const STORAGE_KEY = 'mc_saas_cloud_db_v2';
const TRIAL_DAYS = 10;

interface CloudDB {
  users: Record<string, UserData>;
  auth: Record<string, string>; // email -> password_hash (mock)
}

const getCloudDB = (): CloudDB => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: {}, auth: {} };
};

const persistDB = (db: CloudDB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const backend = {
  async signup(email: string, pass: string, name: string): Promise<UserData> {
    const db = getCloudDB();
    if (db.auth[email]) throw new Error("Este e-mail já está em uso na plataforma.");

    const userId = 'u_' + Math.random().toString(36).substr(2, 9);
    const now = Date.now();
    
    const newUser: UserData = {
      id: userId,
      name,
      email,
      city: '',
      state: '',
      monthlyIncome: 0,
      transactions: [],
      debts: [],
      registrationDate: now,
      trialEndDate: now + (TRIAL_DAYS * 24 * 60 * 60 * 1000),
      status: SubscriptionStatus.TRIAL,
      acceptedTerms: true,
      roadmapProgress: [],
      budgetRule: { livingCost: 70, futureGoals: 20, lifestyle: 10 },
      isOnboarded: false,
      financialGoal: ''
    };

    db.auth[email] = btoa(pass); // Mock hash
    db.users[userId] = newUser;
    persistDB(db);
    return newUser;
  },

  async login(email: string, pass: string): Promise<UserData> {
    const db = getCloudDB();
    if (db.auth[email] !== btoa(pass)) throw new Error("E-mail ou senha incorretos.");
    
    const user = Object.values(db.users).find(u => u.email === email);
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
  },

  async sync(userData: UserData): Promise<void> {
    const db = getCloudDB();
    // Verifica expiração de trial antes de salvar
    const now = Date.now();
    let currentStatus = userData.status;
    
    if (userData.status === SubscriptionStatus.TRIAL && now > userData.trialEndDate) {
      currentStatus = SubscriptionStatus.BLOCKED;
    }

    db.users[userData.id] = { ...userData, status: currentStatus };
    persistDB(db);
  },

  async requestPasswordReset(email: string): Promise<void> {
    const db = getCloudDB();
    if (!db.auth[email]) throw new Error("E-mail não cadastrado.");
    console.log(`Email de recuperação enviado para: ${email}`);
  }
};
