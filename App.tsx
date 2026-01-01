
import React, { useState, useEffect } from 'react';
import { UserData, SubscriptionStatus } from './types';
import { backend } from './services/backendService';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Diagnosis from './components/Diagnosis';
import Mindset from './components/Mindset';
import Investments from './components/Investments';
import Budget from './components/Budget';
import Debts from './components/Debts';
import Roadmap from './components/Roadmap';
import BusinessIdeas from './components/BusinessIdeas';
import Progress from './components/Progress';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import PitchDeck from './components/PitchDeck';
import Documentation from './components/Documentation';
import { 
  Lock, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle,
  User as UserIcon
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const checkSession = async () => {
      const sessionId = localStorage.getItem('mc_session_id');
      if (sessionId) {
        try {
          const dbData = JSON.parse(localStorage.getItem('mc_saas_cloud_db_v2') || '{}');
          const userData = dbData.users?.[sessionId];
          if (userData) setUser(userData);
        } catch (e) {
          localStorage.removeItem('mc_session_id');
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (user) backend.sync(user);
  }, [user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      if (authMode === 'signup') {
        const userData = await backend.signup(formData.email, formData.password, formData.name);
        localStorage.setItem('mc_session_id', userData.id);
        setUser(userData);
      } else if (authMode === 'login') {
        const userData = await backend.login(formData.email, formData.password);
        localStorage.setItem('mc_session_id', userData.id);
        setUser(userData);
      } else {
        await backend.requestPasswordReset(formData.email);
        setSuccess("Link de recuperação enviado com sucesso!");
        setTimeout(() => setAuthMode('login'), 3000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mc_session_id');
    setUser(null);
    setActiveTab('dashboard');
  };

  if (isLoading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin text-emerald-500 mx-auto" size={48} />
        <p className="text-emerald-500/50 font-black tracking-widest text-[10px] uppercase">Encriptando Conexão SaaS</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white font-black text-4xl mx-auto shadow-2xl mb-4">M</div>
          <h1 className="text-3xl font-black text-slate-900">Mente & Carteira</h1>
          <p className="text-slate-500 font-medium">Plataforma Premium de Educação Financeira</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            {authMode === 'signup' ? 'Criar Conta Elite' : authMode === 'login' ? 'Acesso ao Dashboard' : 'Recuperar Senha'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Seu Nome Completo" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-black" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-black" />
            </div>
            {authMode !== 'forgot' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" placeholder="Senha" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-black" />
              </div>
            )}

            {error && <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle size={14}/> {error}</div>}
            {success && <div className="p-4 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl flex items-center gap-2"><CheckCircle size={14}/> {success}</div>}

            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-xl">
              {authMode === 'signup' ? 'COMEÇAR AGORA' : authMode === 'login' ? 'ENTRAR' : 'ENVIAR LINK'} <ArrowRight size={20}/>
            </button>
          </form>
          
          <div className="mt-8 flex flex-col gap-3">
            {authMode === 'login' && <button onClick={() => setAuthMode('forgot')} className="text-slate-400 text-xs font-bold hover:text-emerald-600">Esqueci minha senha</button>}
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="w-full text-slate-500 text-sm font-bold hover:text-emerald-600">
              {authMode === 'login' ? 'Não é membro? Cadastre-se' : 'Já possui conta? Fazer Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Paywall - Bloqueio de Acesso
  if (user.status === SubscriptionStatus.BLOCKED) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in">
        <div className="w-24 h-24 bg-red-600 text-white rounded-[2.5rem] mx-auto flex items-center justify-center shadow-3xl animate-bounce">
          <CreditCard size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white leading-tight">Período Trial Encerrado</h2>
          <p className="text-slate-400 text-lg">Para continuar acessando sua inteligência financeira, ative sua assinatura Premium Elite.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md">
           <div className="flex justify-between items-center text-white mb-8 border-b border-white/10 pb-6">
             <div className="text-left">
                <span className="block text-xs font-black uppercase tracking-widest text-emerald-500">Plano Anual</span>
                <span className="text-xl font-bold">Acesso Vitalício + IA</span>
             </div>
             <div className="text-right">
                <span className="block text-3xl font-black">R$ 10,00</span>
                <span className="text-[10px] opacity-50 uppercase">Pagamento Único</span>
             </div>
           </div>
           <button onClick={() => setUser({...user, status: SubscriptionStatus.ACTIVE})} className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-emerald-500 transition-all shadow-2xl active:scale-95">ATIVAR ACESSO PREMIUM</button>
           <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2"><ShieldCheck size={14}/> Segurança garantida por criptografia bancária</p>
        </div>
        <button onClick={handleLogout} className="text-slate-500 font-bold hover:text-white transition-colors">Sair da Conta</button>
      </div>
    </div>
  );

  if (!user.isOnboarded) return (
    <Onboarding userData={user} onComplete={(data) => setUser({...user, ...data, isOnboarded: true})} />
  );

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'dashboard' && <Dashboard data={user} setActiveTab={setActiveTab} />}
      {activeTab === 'diagnosis' && <Diagnosis userData={user} setUserData={setUser} />}
      {activeTab === 'mindset' && <Mindset userData={user} setUserData={setUser} />}
      {activeTab === 'budget' && <Budget userData={user} setUserData={setUser} />}
      {activeTab === 'debts' && <Debts userData={user} setUserData={setUser} />}
      {activeTab === 'investments' && <Investments userData={user} />}
      {activeTab === 'roadmap' && <Roadmap userData={user} setUserData={setUser} />}
      {activeTab === 'ideas' && <BusinessIdeas userData={user} />}
      {activeTab === 'progress' && <Progress data={user} />}
      {activeTab === 'settings' && <Settings userData={user} setUserData={setUser} />}
      {activeTab === 'pitch' && <PitchDeck />}
      {activeTab === 'docs' && <Documentation />}
    </Layout>
  );
};

export default App;
