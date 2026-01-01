
import React, { useState } from 'react';
import { UserData } from '../types';
import { User, Mail, MapPin, Shield, Save, CheckCircle } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const Settings: React.FC<Props> = ({ userData, setUserData }) => {
  const [form, setForm] = useState(userData);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setUserData(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
          <User className="text-slate-400" /> Perfil do Investidor
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold outline-none text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" 
                disabled
                value={form.email} 
                className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold outline-none opacity-60 text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Cidade</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                value={form.city} 
                onChange={e => setForm({...form, city: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold outline-none text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">UF</label>
            <input 
              type="text" 
              maxLength={2}
              value={form.state} 
              onChange={e => setForm({...form, state: e.target.value.toUpperCase()})}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold outline-none uppercase text-black"
            />
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
            <Shield size={16} /> Dados criptografados e privados
          </div>
          <button 
            onClick={handleSave}
            className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'SALVO!' : 'SALVAR ALTERAÇÕES'}
          </button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
         <h4 className="text-xl font-black text-slate-900 mb-6">Assinatura Premium</h4>
         <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
           <div>
             <p className="font-bold text-emerald-900">Membro Elite • Plano Mensal</p>
             <p className="text-xs text-emerald-600 font-medium">Sua próxima renovação é automática.</p>
           </div>
           <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">ATIVO</span>
         </div>
      </div>
    </div>
  );
};

export default Settings;
