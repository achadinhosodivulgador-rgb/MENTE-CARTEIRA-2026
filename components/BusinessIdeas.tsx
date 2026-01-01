
import React, { useState } from 'react';
import { UserData, BusinessIdea } from '../types';
import { generateBusinessIdeas } from '../services/geminiService';
import { Lightbulb, Rocket, Target, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface Props {
  userData: UserData;
}

const BusinessIdeas: React.FC<Props> = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<BusinessIdea[]>(userData.businessIdeas || []);

  const fetchIdeas = async () => {
    setLoading(true);
    const result = await generateBusinessIdeas(userData);
    if (result.length > 0) {
      setIdeas(result);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Lightbulb className="text-amber-500" /> Renda & Negócios
          </h2>
          <p className="text-slate-500 font-medium">Aumentar a renda é o atalho mais rápido para a liberdade. Veja o que sugerimos para o seu perfil.</p>
        </div>
        <button 
          onClick={fetchIdeas}
          disabled={loading}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {ideas.length > 0 ? 'GERAR NOVAS IDEIAS' : 'REVELAR OPORTUNIDADES'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-1">{idea.category}</span>
                  <h3 className="text-2xl font-black text-slate-900">{idea.title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  idea.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-600' :
                  idea.difficulty === 'Médio' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>{idea.difficulty}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Investimento Inicial</p>
                  <p className="text-lg font-black text-slate-900">{idea.initialInvestment}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Potencial Mensal</p>
                  <p className="text-lg font-black text-emerald-900">{idea.potentialReturn}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Target size={14} /> Como Começar Hoje
                </p>
                <div className="space-y-3">
                  {idea.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                      <p className="text-sm text-slate-600 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && ideas.length === 0 && (
          <div className="md:col-span-2 py-20 text-center space-y-4 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <Rocket className="mx-auto text-slate-300" size={48} />
            <p className="text-slate-400 font-bold">Nenhuma ideia gerada ainda. Clique no botão acima para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessIdeas;
