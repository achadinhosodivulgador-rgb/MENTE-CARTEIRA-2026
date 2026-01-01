
import React, { useState } from 'react';
import { UserData, TransactionType } from '../types';
import { PieChart as PieIcon, AlertCircle, CheckCircle2, TrendingUp, Edit3, Save, X } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Budget: React.FC<Props> = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempRules, setTempRules] = useState(userData.budgetRule);

  const income = userData.monthlyIncome || 0.01;
  const getSum = (type: TransactionType) => userData.transactions.filter(t => t.type === type).reduce((acc, t) => acc + t.amount, 0);

  const costs = getSum(TransactionType.FIXED_EXPENSE) + getSum(TransactionType.ESSENTIAL_VARIABLE);
  const lifestyle = getSum(TransactionType.NON_ESSENTIAL_VARIABLE);
  const available = Math.max(0, userData.monthlyIncome - (costs + lifestyle));

  const rules = [
    { key: 'livingCost' as const, label: 'Custo de Vida', current: (costs / income) * 100, target: userData.budgetRule.livingCost, color: 'emerald' },
    { key: 'lifestyle' as const, label: 'Estilo de Vida', current: (lifestyle / income) * 100, target: userData.budgetRule.lifestyle, color: 'amber' },
    { key: 'futureGoals' as const, label: 'Futuro / Invest.', current: (available / income) * 100, target: userData.budgetRule.futureGoals, color: 'blue' },
  ];

  const handleSave = () => {
    const total = Number(tempRules.livingCost) + Number(tempRules.futureGoals) + Number(tempRules.lifestyle);
    if (total !== 100) {
      alert(`A soma deve ser 100%. Atual: ${total}%`);
      return;
    }
    setUserData({ ...userData, budgetRule: tempRules });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <PieIcon className="text-emerald-600" /> Orçamento Inteligente
            </h2>
            <p className="text-slate-500 font-medium">Personalize sua estratégia financeira ideal.</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`p-4 rounded-2xl transition-all ${isEditing ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            {isEditing ? <X size={20} /> : <Edit3 size={20} />}
          </button>
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            {['livingCost', 'lifestyle', 'futureGoals'].map((key) => (
              <div key={key}>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  {key === 'livingCost' ? 'Custo de Vida' : key === 'lifestyle' ? 'Estilo de Vida' : 'Futuro (%)'}
                </label>
                <input 
                  type="number" 
                  value={tempRules[key as keyof typeof tempRules]} 
                  onChange={(e) => setTempRules({...tempRules, [key]: Number(e.target.value)})}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-black"
                />
              </div>
            ))}
            <button onClick={handleSave} className="md:col-span-3 bg-emerald-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
              <Save size={20} /> SALVAR NOVA REGRA
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rules.map(rule => (
              <div key={rule.label} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 group hover:border-emerald-200 transition-all">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">{rule.label}</span>
                  {rule.current > rule.target ? <AlertCircle className="text-red-500 animate-pulse" size={20} /> : <CheckCircle2 className="text-emerald-500" size={20} />}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-slate-400">Atual: {rule.current.toFixed(1)}%</span>
                    <span className="text-emerald-600">Meta: {rule.target}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(rule.current, 100)}%` }} 
                      className={`h-full transition-all duration-1000 ${rule.current > rule.target ? 'bg-red-500' : 'bg-emerald-600'}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-xl space-y-4 text-center md:text-left relative z-10">
          <h3 className="text-3xl font-black">Diagnóstico de Equilíbrio</h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            {rules[0].current > rules[0].target 
              ? "Atenção: Seu custo de vida está acima da meta definida. Isso retarda sua independência financeira."
              : "Parabéns: Você está dentro dos limites saudáveis. Siga focando em aumentar seus aportes para o Futuro."}
          </p>
        </div>
        <div className="w-32 h-32 bg-emerald-600/20 rounded-full flex items-center justify-center animate-pulse relative z-10">
           <TrendingUp size={64} className="text-emerald-500" />
        </div>
      </div>
    </div>
  );
};

export default Budget;
