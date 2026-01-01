
import React, { useState } from 'react';
import { UserData, Debt } from '../types';
import { Plus, Trash2, TrendingDown, Zap, ShieldCheck, DollarSign, Calendar, Target, ListChecks } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Debts: React.FC<Props> = ({ userData, setUserData }) => {
  const [formData, setFormData] = useState({ name: '', total: '', rate: '', creditor: '' });
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    if (!formData.name || !formData.total) return;
    const amount = parseFloat(formData.total.replace(',', '.'));
    const rate = parseFloat(formData.rate.replace(',', '.')) || 0;
    
    const newDebt: Debt = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      totalAmount: amount,
      interestRate: rate,
      creditor: formData.creditor || 'Não informado',
      isNegotiated: false
    };
    setUserData({ ...userData, debts: [...userData.debts, newDebt] });
    setFormData({ name: '', total: '', rate: '', creditor: '' });
  };

  const totalDebt = userData.debts.reduce((acc, d) => acc + d.totalAmount, 0);
  
  const sortedDebts = strategy === 'avalanche' 
    ? [...userData.debts].sort((a, b) => b.interestRate - a.interestRate)
    : [...userData.debts].sort((a, b) => a.totalAmount - b.totalAmount);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <TrendingDown className="text-red-500" /> Plano de Extinção
          </h2>
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
            <button 
              onClick={() => setStrategy('avalanche')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${strategy === 'avalanche' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              AVALANCHE (JUROS)
            </button>
            <button 
              onClick={() => setStrategy('snowball')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${strategy === 'snowball' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              BOLA DE NEVE (SALDO)
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
          <input type="text" placeholder="Dívida (ex: Cartão)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-5 py-4 bg-white border border-slate-200 rounded-2xl text-black font-medium outline-none focus:ring-2 focus:ring-emerald-500" />
          <input type="text" placeholder="Valor (R$)" value={formData.total} onChange={e => setFormData({...formData, total: e.target.value})} className="px-5 py-4 bg-white border border-slate-200 rounded-2xl text-black font-medium outline-none" />
          <input type="text" placeholder="Juros (% ao mês)" value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} className="px-5 py-4 bg-white border border-slate-200 rounded-2xl text-black font-medium outline-none" />
          <button onClick={addDebt} className="bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
            <Plus size={20} /> ADICIONAR
          </button>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">
                <th className="pb-4 px-2">Dívida / Credor</th>
                <th className="pb-4 px-2">Juros p/mês</th>
                <th className="pb-4 px-2 text-right">Saldo Devedor</th>
                <th className="pb-4 px-2 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedDebts.map(d => (
                <tr key={d.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-6 px-2">
                    <p className="font-bold text-slate-800">{d.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black">{d.creditor}</p>
                  </td>
                  <td className="py-6 px-2 text-red-500 font-black">{d.interestRate}%</td>
                  <td className="py-6 px-2 text-right font-mono font-black text-slate-900">R$ {d.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="py-6 px-2 text-center">
                    <button onClick={() => setUserData({...userData, debts: userData.debts.filter(x => x.id !== d.id)})} className="p-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
              {userData.debts.length > 0 && (
                <tr className="bg-slate-900 text-white">
                  <td className="py-6 px-6 rounded-l-3xl font-black">TOTAL ACUMULADO</td>
                  <td className="py-6"></td>
                  <td className="py-6 pr-6 text-right font-black text-2xl rounded-r-3xl">R$ {totalDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="py-6"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
            {strategy === 'avalanche' ? <Zap size={100} /> : <Target size={100} />}
          </div>
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
            {strategy === 'avalanche' ? 'Estratégia Avalanche' : 'Estratégia Bola de Neve'}
          </h3>
          <p className="text-emerald-100 mb-8 font-medium">
            {strategy === 'avalanche' 
              ? "Prioridade nas taxas de juros mais altas para economizar dinheiro a longo prazo."
              : "Prioridade nos menores saldos para liquidar dívidas rápido e ganhar motivação psicológica."}
          </p>
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Ordem de Ataque:</p>
            {sortedDebts.slice(0, 3).map((d, i) => (
              <div key={d.id} className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-all">
                <span className="w-8 h-8 rounded-xl bg-white text-emerald-600 flex items-center justify-center font-black text-sm">{i+1}</span>
                <div>
                  <p className="font-bold">{d.name}</p>
                  <p className="text-xs opacity-70">R$ {d.totalAmount.toLocaleString('pt-BR')} • {d.interestRate}% juros</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <ListChecks className="text-emerald-600" /> Próximos Passos de Guerra
            </h3>
            <ul className="space-y-6">
              {[
                { icon: <DollarSign size={18}/>, text: "Ligue para os credores da lista acima hoje mesmo.", color: "bg-blue-50 text-blue-600" },
                { icon: <Calendar size={18}/>, text: "Troque dívidas caras (cartão) por baratas (consignado).", color: "bg-indigo-50 text-indigo-600" },
                { icon: <ShieldCheck size={18}/>, text: "Não faça novos parcelamentos até zerar essa lista.", color: "bg-emerald-50 text-emerald-600" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${item.color}`}>{item.icon}</div>
                  <p className="text-sm text-slate-600 font-bold leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debts;
