
import React from 'react';
import { UserData } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Rocket, 
  Lock, 
  ArrowRight, 
  Trophy,
  Lightbulb,
  Target
} from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Roadmap: React.FC<Props> = ({ userData, setUserData }) => {
  const steps = [
    { 
      id: 'q1', 
      quarter: '1º Trimestre', 
      label: 'FUNDAÇÃO',
      title: 'A Base do Império', 
      icon: <ShieldCheck size={24} />,
      insight: 'Nesta fase, seu único objetivo é estancar a sangria. Sem uma base sólida, qualquer riqueza é passageira.',
      tasks: [
        { id: 'diag', text: 'Concluir Diagnóstico 100%' },
        { id: 'cren', text: 'Mapear Crenças Limitantes' },
        { id: 'res1', text: 'Criar Reserva de Paz (R$ 1k)' },
        { id: 'cort', text: 'Eliminar 3 Gastos Desnecessários' }
      ]
    },
    { 
      id: 'q2', 
      quarter: '2º Trimestre', 
      label: 'CONTROLE',
      title: 'Ataque às Dívidas', 
      icon: <TrendingUp size={24} />,
      insight: 'Dívidas são correntes. Vamos usar o Método Avalanche para liberar seu fluxo de caixa mensal.',
      tasks: [
        { id: 'nego', text: 'Negociar Dívida de Maior Juro' },
        { id: 'renda', text: 'Gerar R$ 300 de Renda Extra' },
        { id: 'regra', text: 'Aplicar Regra 70/20/10' },
        { id: 'cart', text: 'Consolidar cartões de crédito' }
      ]
    },
    { 
      id: 'q3', 
      quarter: '3º Trimestre', 
      label: 'EXPANSÃO',
      title: 'O Primeiro Investimento', 
      icon: <Sparkles size={24} />,
      insight: 'Agora o dinheiro trabalha para você. O foco é segurança e o início dos juros compostos a seu favor.',
      tasks: [
        { id: 'rese', text: 'Reserva de Emergência (3 meses)' },
        { id: 'selic', text: 'Primeiro aporte Tesouro Selic' },
        { id: 'cdb', text: 'Investir em CDB 100% CDI' },
        { id: 'estu', text: 'Estudo de Fundos Imobiliários' }
      ]
    },
    { 
      id: 'q4', 
      quarter: '4º Trimestre', 
      label: 'LIBERDADE',
      title: 'Patrimônio e Futuro', 
      icon: <Rocket size={24} />,
      insight: 'Você não depende mais apenas do seu trabalho. É hora de diversificar e pensar em décadas, não meses.',
      tasks: [
        { id: 'vari', text: 'Aporte em Renda Variável (FIIs)' },
        { id: 'long', text: 'Plano de Aposentadoria 20 anos' },
        { id: 'pass', text: 'Primeira Renda Passiva recebida' },
        { id: 'ment', text: 'Revisão Anual de Metas' }
      ]
    }
  ];

  const toggleTask = (taskId: string) => {
    const isCompleted = userData.roadmapProgress.includes(taskId);
    const newProgress = isCompleted 
      ? userData.roadmapProgress.filter(id => id !== taskId)
      : [...userData.roadmapProgress, taskId];
    setUserData({ ...userData, roadmapProgress: newProgress });
  };

  const getQuarterProgress = (quarterTasks: any[]) => {
    const completed = quarterTasks.filter(t => userData.roadmapProgress.includes(t.id)).length;
    return (completed / quarterTasks.length) * 100;
  };

  const isQuarterLocked = (index: number) => {
    if (index === 0) return false;
    const prevQuarter = steps[index - 1];
    return getQuarterProgress(prevQuarter.tasks) < 100;
  };

  return (
    <div className="space-y-12 py-6 animate-in fade-in duration-700">
      {/* Header Premium */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-black text-xs uppercase tracking-[0.3em]">
            <Trophy size={16} /> Jornada de 12 Meses
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">O Caminho da Riqueza</h2>
          <p className="text-slate-500 font-medium max-w-md">Transforme sua realidade financeira através de marcos claros e executáveis.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6">
           <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase">Progresso Total</p>
             <p className="text-2xl font-black text-slate-900">{Math.round((userData.roadmapProgress.length / 16) * 100)}%</p>
           </div>
           <div className="w-16 h-16 rounded-full border-4 border-emerald-100 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin-slow" style={{ clipPath: `inset(0 ${100 - (userData.roadmapProgress.length/16)*100}% 0 0)` }}></div>
              <Sparkles className="text-emerald-600" size={24} />
           </div>
        </div>
      </div>

      {/* Timeline Sections */}
      <div className="space-y-12">
        {steps.map((step, idx) => {
          const progress = getQuarterProgress(step.tasks);
          const locked = isQuarterLocked(idx);
          
          return (
            <div key={step.id} className={`group relative flex flex-col lg:flex-row gap-8 transition-all duration-500 ${locked ? 'opacity-60 grayscale' : 'opacity-100'}`}>
              
              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-10 top-24 bottom-[-48px] w-1 bg-slate-200 hidden lg:block"></div>
              )}

              {/* Status Circle */}
              <div className="flex lg:flex-col items-center gap-4 shrink-0">
                 <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl transition-all duration-500 z-10 ${
                   locked ? 'bg-slate-100 text-slate-400' : 
                   progress === 100 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white scale-110 shadow-slate-200'
                 }`}>
                   {locked ? <Lock size={28} /> : (progress === 100 ? <CheckCircle2 size={32} /> : step.icon)}
                 </div>
                 <div className="lg:h-full flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block rotate-90 mt-12 origin-left">{step.quarter}</span>
                 </div>
              </div>

              {/* Card Premium */}
              <div className={`flex-1 bg-white p-8 lg:p-12 rounded-[3.5rem] border transition-all duration-500 ${
                locked ? 'border-slate-100' : 
                progress === 100 ? 'border-emerald-100 shadow-sm' : 'border-slate-200 shadow-2xl shadow-slate-200'
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black tracking-widest uppercase">{step.label}</span>
                       <span className="text-slate-400 text-xs font-bold md:hidden">• {step.quarter}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">{step.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Fase {idx + 1}</p>
                        <p className={`font-black ${progress === 100 ? 'text-emerald-600' : 'text-slate-900'}`}>{progress}% Completo</p>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Tasks List */}
                  <div className="grid grid-cols-1 gap-3">
                    {step.tasks.map((task) => (
                      <button 
                        key={task.id}
                        disabled={locked}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group/btn ${
                          userData.roadmapProgress.includes(task.id) 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-900 shadow-inner' 
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          userData.roadmapProgress.includes(task.id) ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-slate-200'
                        }`}>
                          {userData.roadmapProgress.includes(task.id) && <CheckCircle2 size={16} />}
                        </div>
                        <span className={`font-bold text-sm leading-tight ${userData.roadmapProgress.includes(task.id) ? 'opacity-60' : ''}`}>
                          {task.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Insight Panel */}
                  <div className={`p-8 rounded-[2.5rem] flex flex-col justify-center space-y-4 relative overflow-hidden ${locked ? 'bg-slate-50' : 'bg-indigo-50/50'}`}>
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest relative z-10">
                       <Lightbulb size={16} /> Insight do Mentor
                    </div>
                    <p className="text-indigo-900 font-medium italic leading-relaxed relative z-10">
                      "{step.insight}"
                    </p>
                    <div className="pt-4 flex items-center gap-3 text-indigo-400 relative z-10">
                       <Target size={20} />
                       <span className="text-xs font-bold uppercase tracking-widest">Meta Principal da Fase</span>
                    </div>
                    <div className="absolute bottom-[-20px] right-[-20px] opacity-5">
                       {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Footer */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-center space-y-6 relative overflow-hidden">
        <div className="relative z-10">
           <h4 className="text-2xl font-black text-white">Pronto para o próximo nível?</h4>
           <p className="text-slate-400 font-medium max-w-lg mx-auto">A consistência nos pequenos atos é o que separa os milionários dos sonhadores.</p>
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="mt-8 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-emerald-900/20"
           >
             VER MEU PAINEL <ArrowRight size={20} />
           </button>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-600/10 to-transparent blur-3xl"></div>
      </div>
    </div>
  );
};

export default Roadmap;
