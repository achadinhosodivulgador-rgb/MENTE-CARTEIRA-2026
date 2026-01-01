
import React, { useState } from 'react';
import { UserData } from '../types';
import { TrendingUp, ShieldAlert, BookOpen, ExternalLink, Info, Calculator } from 'lucide-react';

const Investments: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [initial, setInitial] = useState(1000);
  
  const assets = [
    { name: 'Tesouro Direto', type: 'Soberano', risk: 'Baixíssimo', return: 'SELIC + 0.1%', link: 'https://www.tesourodireto.com.br/', desc: 'O investimento mais seguro do Brasil. Ideal para reserva de emergência.' },
    { name: 'CDB (100% CDI)', type: 'Bancário', risk: 'Baixo (FGC)', return: '100% CDI', link: '#', desc: 'Empreste para o banco. Protegido pelo Fundo Garantidor até 250k.' },
    { name: 'FIIs (Imobiliários)', type: 'Renda Variável', risk: 'Médio', return: 'Dividendos Mensais', link: '#', desc: 'Receba "aluguéis" sem ter o imóvel. Ótimo para renda passiva.' },
    { name: 'ETFs (IVVB11)', type: 'Renda Variável', risk: 'Médio/Alto', return: 'Dólar + S&P500', link: '#', desc: 'Invista nas 500 maiores empresas do mundo de uma só vez.' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-6 leading-tight">Construção de Riqueza Real</h2>
          <p className="text-emerald-50 text-xl leading-relaxed opacity-90">
            Fuja de promessas de ganhos rápidos. A verdadeira riqueza é construída com **aporte, tempo e juros compostos**.
          </p>
        </div>
        <div className="absolute right-[-50px] bottom-[-50px] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-slate-900 px-2 flex items-center gap-2"><BookOpen size={24} className="text-emerald-600"/> Onde Começar Hoje</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map(asset => (
              <div key={asset.name} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-1">{asset.type}</span>
                    <h4 className="text-xl font-bold text-slate-900">{asset.name}</h4>
                  </div>
                  <a href={asset.link} target="_blank" className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><ExternalLink size={18}/></a>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{asset.desc}</p>
                <div className="flex justify-between items-center py-4 border-t border-slate-50">
                   <div className="text-center">
                     <p className="text-[10px] font-black text-slate-300 uppercase">Risco</p>
                     <p className="text-xs font-bold text-slate-600">{asset.risk}</p>
                   </div>
                   <div className="text-center">
                     <p className="text-[10px] font-black text-slate-300 uppercase">Retorno</p>
                     <p className="text-xs font-bold text-emerald-600">{asset.return}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-amber-50 border-2 border-amber-100 p-10 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-3 text-amber-700 font-black">
               <ShieldAlert size={28}/>
               <h3>ALERTA DE SEGURANÇA</h3>
             </div>
             <p className="text-sm text-amber-800/80 leading-relaxed font-medium">
               Se alguém te oferecer ganhos acima de **1,5% ao mês garantidos**, desconfie. Provavelmente é uma pirâmide ou golpe. A taxa Selic é a nossa régua de segurança.
             </p>
           </div>

           <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-3xl">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3"><Calculator size={20} className="text-emerald-500"/> Passo a Passo Corretora</h3>
              <div className="space-y-8 relative">
                {[
                  'Escolha uma corretora taxa zero (Nuvem, Toro, Rico, BTG).',
                  'Abra sua conta e transfira sua primeira economia via PIX.',
                  'Busque por "Tesouro Selic 2029" no menu de Renda Fixa.',
                  'Invista a partir de R$ 140,00 e veja os juros trabalharem.'
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-sm shrink-0">{i+1}</span>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
