
import React, { useState } from 'react';
import { UserData, TransactionType, Transaction } from '../types';
import { Plus, Trash2, Save, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Diagnosis: React.FC<Props> = ({ userData, setUserData }) => {
  const [income, setIncome] = useState(userData.monthlyIncome);
  const [transactions, setTransactions] = useState<Transaction[]>(userData.transactions);
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<TransactionType>(TransactionType.FIXED_EXPENSE);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    if (!newDesc || !newAmount) return;
    const amount = parseFloat(newAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) return alert("Valor inválido");

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      description: newDesc,
      amount,
      type: newType,
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [newTx, ...prev]);
    setNewDesc('');
    setNewAmount('');
  };

  const handleSave = async () => {
    if (income <= 0) return alert("Informe sua renda mensal");
    setIsSaving(true);
    
    // Simula tempo de processamento do servidor
    await new Promise(r => setTimeout(r, 1000));
    
    setUserData({
      ...userData,
      monthlyIncome: income,
      transactions: transactions
    });
    
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Info size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Mapeamento Real</h2>
            <p className="text-slate-500 font-medium">A precisão aqui define o sucesso do seu plano de 12 meses.</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Input de Renda */}
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 max-w-md">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Renda Mensal Líquida (PIX/Salário)</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xl">R$</span>
              <input 
                type="number" 
                value={income || ''} 
                onChange={e => setIncome(Number(e.target.value))}
                className="w-full pl-16 pr-6 py-6 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-black text-3xl text-black"
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Adicionar Transação */}
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-2 h-6 bg-slate-900 rounded-full"></div> Registrar Gasto ou Custo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <input type="text" placeholder="Ex: Aluguel, Supermercado..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-black" />
              </div>
              <div className="md:col-span-3">
                <input type="text" placeholder="Valor (R$)" value={newAmount} onChange={e => setNewAmount(e.target.value)} className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-black" />
              </div>
              <div className="md:col-span-4 flex gap-4">
                <select value={newType} onChange={e => setNewType(e.target.value as TransactionType)} className="flex-1 px-6 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold appearance-none cursor-pointer text-black">
                  <option value={TransactionType.FIXED_EXPENSE}>Fixo</option>
                  <option value={TransactionType.ESSENTIAL_VARIABLE}>Essencial</option>
                  <option value={TransactionType.NON_ESSENTIAL_VARIABLE}>Estilo de Vida</option>
                </select>
                <button onClick={handleAdd} className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-emerald-600 transition-all">
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Listagem */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
            {transactions.map(t => (
              <div key={t.id} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl group hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-12 rounded-full ${
                    t.type === TransactionType.FIXED_EXPENSE ? 'bg-slate-900' :
                    t.type === TransactionType.ESSENTIAL_VARIABLE ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></div>
                  <div>
                    <p className="font-bold text-slate-900">{t.description}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t.type === TransactionType.FIXED_EXPENSE ? 'Fixo' :
                       t.type === TransactionType.ESSENTIAL_VARIABLE ? 'Variável Essencial' : 'Não Essencial'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-xl font-black text-slate-900">R$ {t.amount.toLocaleString('pt-BR')}</p>
                  <button onClick={() => setTransactions(transactions.filter(x => x.id !== t.id))} className="text-slate-200 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-3">
             {showSuccess && <div className="flex items-center gap-2 text-emerald-600 font-bold animate-in slide-in-from-left-4"><CheckCircle size={20}/> Dados salvos na nuvem!</div>}
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto bg-emerald-600 text-white px-16 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin"/> : <Save size={24}/>}
            {isSaving ? 'PROCESSANDO...' : 'FINALIZAR DIAGNÓSTICO'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
