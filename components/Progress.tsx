
import React from 'react';
import { UserData } from '../types';
import { Award, Star, Zap, Shield, Target, TrendingUp, Trophy } from 'lucide-react';

const Progress: React.FC<{ data: UserData }> = ({ data }) => {
  const roadmapProgress = data.roadmapProgress.length;
  const totalTasks = 16;
  const progressPercent = Math.round((roadmapProgress / totalTasks) * 100);

  const achievements = [
    { id: '1', label: 'Primeiro Passo', desc: 'Concluiu o onboarding inicial', icon: <Zap />, unlocked: data.isOnboarded },
    { id: '2', label: 'Mapeador', desc: 'Realizou o diagnóstico financeiro', icon: <Target />, unlocked: data.monthlyIncome > 0 },
    { id: '3', label: 'Estrategista', desc: 'Definiu uma regra de orçamento', icon: <Shield />, unlocked: !!data.budgetRule },
    { id: '4', label: 'Visão de Águia', desc: 'Analised sua mente pelo Gemini', icon: <Star />, unlocked: !!data.profileType },
    { id: '5', label: 'Sobrevivente', desc: 'Completou o 1º trimestre', icon: <Award />, unlocked: roadmapProgress >= 4 },
    { id: '6', label: 'Investidor', desc: 'Chegou ao módulo de expansão', icon: <TrendingUp />, unlocked: roadmapProgress >= 12 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 text-center space-y-6">
        <h2 className="text-3xl font-black text-slate-900">Nível de Liberdade Financeira</h2>
        <div className="max-w-md mx-auto relative pt-10">
          <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden mb-4">
             <div 
               className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000"
               style={{ width: `${progressPercent}%` }}
             ></div>
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Iniciante</span>
            <span className="text-emerald-600 text-sm">{progressPercent}% Concluído</span>
            <span>Liberdade</span>
          </div>
          <div className="absolute top-0" style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}>
            <Trophy className="text-emerald-500 animate-bounce" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <Award className="text-emerald-600" /> Medalhas de Conquista
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {achievements.map(ach => (
              <div 
                key={ach.id} 
                className={`p-6 rounded-[2rem] border transition-all text-center space-y-3 ${
                  ach.unlocked ? 'bg-white border-emerald-100 shadow-lg shadow-emerald-50' : 'bg-slate-50 border-slate-100 opacity-40'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-white ${ach.unlocked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                  {ach.icon}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm leading-tight">{ach.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] flex flex-col justify-center items-center text-center space-y-6">
           <div className="w-32 h-32 bg-emerald-600/20 rounded-full flex items-center justify-center relative">
              <span className="text-5xl font-black text-emerald-400">{unlockedCount}</span>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin-slow"></div>
           </div>
           <div className="space-y-2">
             <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Ganhos em Evolução</p>
             <h4 className="text-2xl font-black">Mestre de Finanças</h4>
             <p className="text-slate-400 text-sm font-medium">Continue executando as tarefas do seu Roadmap para desbloquear os próximos níveis.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
