
import React, { useState } from 'react';
import { UserData } from '../types';
// Import the missing 'X' icon from lucide-react.
import { ArrowRight, Target, Sparkles, ShieldCheck, Heart, ShieldAlert, CheckCircle, Brain, Rocket, X } from 'lucide-react';

interface Props {
  userData: UserData;
  onComplete: (data: Partial<UserData>) => void;
}

const Onboarding: React.FC<Props> = ({ userData, onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<UserData>>({
    financialSituation: undefined,
    onboardingGoal: undefined,
    behavioralAnswers: {
      impulseSpending: false,
      prefersSecurity: true,
      triedBefore: false
    }
  });

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      onComplete({ ...answers, isOnboarded: true });
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="text-emerald-500" size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Boas-vindas ao Futuro</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
                Você não está aqui por acaso. Organização financeira não é esforço, é identidade — e isso começa agora.
              </p>
            </div>
            <button onClick={handleNext} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4">
              COMEÇAR MINHA JORNADA <ArrowRight size={24} />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-slate-900">Como vamos te ajudar</h2>
              <p className="text-slate-500 font-medium">Milhares de pessoas travam porque não sabem por onde começar. Aqui você terá um caminho.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 1, title: 'Entenda sua situação', desc: 'Análise profunda da sua mente e carteira.', icon: <Brain size={20}/> },
                { id: 2, title: 'Crie um plano claro', desc: 'Metas baseadas em comportamento, sem achismos.', icon: <Target size={20}/> },
                { id: 3, title: 'Evolua passo a passo', desc: 'Acompanhamento real para a sua liberdade.', icon: <Rocket size={20}/> },
              ].map(item => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-slate-900">{item.id}. {item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4">
              QUERO COMEÇAR DO JEITO CERTO <ArrowRight size={24} />
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Dados Essenciais</h2>
              <p className="text-slate-500 font-medium">Sua situação atual define o ponto de partida.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Qual sua situação hoje?</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'endividado', label: 'Endividado(a)' },
                    { id: 'organizado_sem_investir', label: 'Organizado, mas sem investir' },
                    { id: 'investidor_melhorando', label: 'Já invisto, quero melhorar' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => setAnswers({...answers, financialSituation: opt.id as any})}
                      className={`p-4 rounded-2xl border-2 font-bold text-left transition-all ${answers.financialSituation === opt.id ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Seu principal objetivo?</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'sair_dividas', label: 'Sair das dívidas' },
                    { id: 'organizar', label: 'Organizar' },
                    { id: 'investir', label: 'Investir' },
                    { id: 'criar_renda', label: 'Criar renda extra' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => setAnswers({...answers, onboardingGoal: opt.id as any})}
                      className={`p-4 rounded-2xl border-2 font-bold text-left transition-all ${answers.onboardingGoal === opt.id ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              disabled={!answers.financialSituation || !answers.onboardingGoal}
              className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
            >
              PRÓXIMO PASSO <ArrowRight size={24} />
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Perfil Comportamental</h2>
              <p className="text-slate-500 font-medium">Como você lida com o dinheiro no dia a dia?</p>
            </div>

            <div className="space-y-6">
              {[
                { id: 'impulseSpending', label: 'Você costuma gastar por impulso?', sub: 'Compras não planejadas em momentos de emoção.' },
                { id: 'prefersSecurity', label: 'Prefere segurança absoluta ou aceita riscos?', sub: 'Segurança (Sim) ou Busca retornos maiores (Não).' },
                { id: 'triedBefore', label: 'Já tentou se organizar antes e desistiu?', sub: 'Consistência é o nosso foco principal aqui.' }
              ].map(q => (
                <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="max-w-[70%]">
                    <p className="font-black text-slate-900">{q.label}</p>
                    <p className="text-xs text-slate-400 font-medium">{q.sub}</p>
                  </div>
                  <button 
                    onClick={() => setAnswers({
                      ...answers, 
                      behavioralAnswers: {
                        ...answers.behavioralAnswers!, 
                        [q.id]: !((answers.behavioralAnswers as any)[q.id])
                      }
                    })}
                    className={`w-14 h-8 rounded-full transition-all relative ${((answers.behavioralAnswers as any)[q.id]) ? 'bg-emerald-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${((answers.behavioralAnswers as any)[q.id]) ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4">
              DEFINIR MINHA ESTRATÉGIA <ArrowRight size={24} />
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-center">
            <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="text-amber-500" size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Promessa Real</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto italic">
                "Aqui você não vai enriquecer rápido. Você vai enriquecer certo."
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-emerald-800 font-bold text-sm">
                <CheckCircle size={20} className="shrink-0" /> Mudança de mentalidade e hábitos reais.
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-emerald-800 font-bold text-sm">
                <CheckCircle size={20} className="shrink-0" /> Plano de ação matemático e estratégico.
              </div>
              <div className="p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-800 font-bold text-sm opacity-60">
                <X size={20} className="shrink-0" /> Sem promessas de lucros mágicos ou imediatos.
              </div>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Essa integridade gera sua confiança absoluta.</p>
            <button onClick={handleNext} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4">
              EU ACEITO O DESAFIO <ArrowRight size={24} />
            </button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 animate-in zoom-in duration-500 text-center">
            <div className="w-32 h-32 bg-emerald-600 text-white rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <ShieldCheck size={64} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Tudo Pronto!</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Salvando suas preferências comportamentais e preparando seu Diagnóstico Financeiro.
              </p>
            </div>
            <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white flex items-center gap-6 text-left">
              <Rocket className="text-emerald-400 animate-pulse" size={32} />
              <div>
                <p className="font-black text-lg">Próxima Parada:</p>
                <p className="text-slate-400 font-medium">Diagnóstico Financeiro Completo</p>
              </div>
            </div>
            <button onClick={handleNext} className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl flex items-center justify-center gap-4">
              ACESSAR MEU PAINEL <ArrowRight size={24} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
          <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: `${(step/6)*100}%` }}></div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
