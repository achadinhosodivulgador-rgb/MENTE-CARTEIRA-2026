

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { UserData, TransactionType, SubscriptionStatus } from '../types';
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShieldCheck, Sparkles, Rocket, AlertCircle, Clock } from 'lucide-react';

interface Props {
  data: UserData;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<Props> = ({ data, setActiveTab }) => {
  const formatCurrency = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const totalFixed = data.transactions.filter(t => t.type === TransactionType.FIXED_EXPENSE).reduce((acc, t) => acc + t.amount, 0);
  const totalEssential = data.transactions.filter(t => t.type === TransactionType.ESSENTIAL_VARIABLE).reduce((acc, t) => acc + t.amount, 0);
  const totalNonEssential = data.transactions.filter(t => t.type === TransactionType.NON_ESSENTIAL_VARIABLE).reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = totalFixed + totalEssential + totalNonEssential;
  const balance = data.monthlyIncome - totalExpenses;

  const chartData = [
    { name: 'Fixos', value: totalFixed },
    { name: 'Essenciais', value: totalEssential },
    { name: 'Estilo', value: totalNonEssential },
  ].filter(d => d.value > 0);

  const COLORS = ['#0f172a', '#10b981', '#f59e0b'];

  const daysLeft = Math.max(0, Math.ceil((data.trialEndDate - Date.now()) / (1000 * 60 * 60 * 24)));

  // Fixed missing hasData variable definition
  const hasData = data.monthlyIncome > 0 || data.transactions.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Alerta de Trial */}
      {data.status === SubscriptionStatus.TRIAL && (
        <div className="bg-amber-600 p-4 rounded-2xl flex items-center justify-between text-white shadow-xl">
           <div className="flex items-center gap-3">
              <Clock size={20} className="animate-pulse" />
              <p className="font-bold text-sm">Seu período Trial expira em <b>{daysLeft} dias</b>. Aproveite para mapear tudo!</p>
           </div>
           <button onClick={() => setActiveTab('settings')} className="bg-white text-amber-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">Assinar Agora</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ganhos</span>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><ArrowUpRight size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{formatCurrency(data.monthlyIncome)}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-red-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Custos</span>
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><ArrowDownRight size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{formatCurrency(totalExpenses)}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Saldo Livre</span>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><TrendingUp size={20} /></div>
          </div>
          <h3 className={`text-3xl font-black ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatCurrency(balance)}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Status de Conta</span>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><ShieldCheck size={20} /></div>
          </div>
          <h3 className="text-lg font-black text-slate-900 uppercase truncate">{data.status === 'active_subscription' ? 'Premium Elite' : 'Trial Ativo'}</h3>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">
            <Sparkles size={16} /> Próximo Passo
          </div>
          <h3 className="text-5xl font-black leading-tight tracking-tight">
            {data.monthlyIncome === 0 ? "Realize seu diagnóstico." : "Potencialize seus investimentos."}
          </h3>
          <p className="text-slate-400 text-xl font-medium leading-relaxed">
            {data.monthlyIncome === 0 
              ? "Para que a inteligência artificial analise seu perfil, comece inserindo sua renda e gastos mensais." 
              : "Detectamos que você pode economizar R$ 350 extras por mês com base no seu perfil Estratégico."}
          </p>
        </div>
        <button 
          onClick={() => setActiveTab(data.monthlyIncome === 0 ? 'diagnosis' : 'roadmap')}
          className="relative z-10 bg-emerald-600 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-emerald-500 transition-all transform hover:-translate-y-2 shadow-2xl flex items-center gap-4 group active:scale-95"
        >
          <span>CONTINUAR</span>
          <Rocket size={24} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {hasData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-10">Consumo Mensal</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }} />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-10">Distribuição Ideal</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={100} outerRadius={135} paddingAngle={10} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[3.5rem] border-4 border-dashed border-slate-100 text-center space-y-4">
           <AlertCircle className="mx-auto text-slate-200" size={64} />
           <p className="text-slate-400 font-bold text-lg italic">Seus gráficos financeiros aparecerão aqui após o diagnóstico.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
