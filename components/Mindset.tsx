
import React, { useState } from 'react';
import { UserData, UserProfileType } from '../types';
import { analyzeFinancialProfile } from '../services/geminiService';
import { Sparkles, Brain, Lock, Unlock, Loader2, Quote } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Mindset: React.FC<Props> = ({ userData, setUserData }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const runAnalysis = async () => {
    setLoading(true);
    const result = await analyzeFinancialProfile(userData);
    if (result) {
      setAnalysis(result);
      setUserData({
        ...userData,
        profileType: result.profileType as UserProfileType,
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Brain className="text-indigo-400" />
            Sua Identidade Financeira
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
            Descubra as motivações invisíveis que regem seu bolso. O autoconhecimento é o primeiro passo para a liberdade.
          </p>
          {!analysis && (
            <button 
              onClick={runAnalysis}
              disabled={loading}
              className="bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 transition-all shadow-xl shadow-indigo-900/40"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Analisando Padrões...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Realizar Diagnóstico Comportamental</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Lock size={20} /></div>
              <h3 className="text-xl font-bold text-slate-900">Crenças Limitantes</h3>
            </div>
            <ul className="space-y-4">
              {analysis.limitedBeliefs.map((b: string, i: number) => (
                <li key={i} className="flex items-start space-x-3 text-slate-600">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Unlock size={20} /></div>
              <h3 className="text-xl font-bold text-slate-900">Crenças Fortalecedoras</h3>
            </div>
            <ul className="space-y-4">
              {analysis.empoweringBeliefs.map((b: string, i: number) => (
                <li key={i} className="flex items-start space-x-3 text-slate-700 font-medium">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 bg-emerald-50 p-8 rounded-3xl border border-emerald-100 relative">
            <Quote className="absolute top-6 right-8 text-emerald-200" size={48} />
            <h4 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={18} />
              Diagnóstico do Mentor: {analysis.profileType}
            </h4>
            <p className="text-emerald-800 text-lg leading-relaxed italic">
              "{analysis.summary}"
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium uppercase tracking-wider">Potencial de Economia Mensal</p>
                <p className="text-3xl font-black text-emerald-900">
                  {analysis.potentialMonthlySavings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="hidden sm:block">
                 <div className="bg-emerald-600 h-2 w-32 rounded-full overflow-hidden">
                    <div className="bg-white/40 h-full w-[70%]"></div>
                 </div>
                 <p className="text-[10px] text-emerald-600 mt-1 text-center font-bold">RELAÇÃO MENTAL: EM MELHORA</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mindset;
