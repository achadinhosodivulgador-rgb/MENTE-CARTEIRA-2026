
import React from 'react';
import { FileText, Database, ShieldCheck, RefreshCw, Layers, CheckCircle } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-8">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <FileText className="text-emerald-600" /> Documentação Técnica (SaaS v1.0)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Layers size={20} className="text-slate-400" /> Visão Geral & Arquitetura
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              A aplicação é um SaaS Multi-tenant construído com React, Tailwind CSS e integração nativa com a Gemini API. 
              Utiliza um banco de dados NoSQL simulado em `localStorage` para persistência de sessão e dados financeiros por usuário.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <CheckCircle size={14} className="text-emerald-500" /> Frontend desacoplado e responsivo.
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <CheckCircle size={14} className="text-emerald-500" /> Backend Mock modulado para fácil migração.
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <CheckCircle size={14} className="text-emerald-500" /> Estados de usuário gerenciados por context/hooks.
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <ShieldCheck size={20} className="text-slate-400" /> Autenticação & Segurança
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Lógica de autenticação baseada em hashes base64. Isolamento total de dados por `userId` em cada transação de sync.
            </p>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Estados de Assinatura:</p>
              <code className="text-[10px] font-mono text-emerald-600 font-bold">
                trial_active | active_subscription | blocked_no_payment
              </code>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Database size={20} className="text-slate-400" /> Regras de Negócio Financeiro
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-auto bg-emerald-500 rounded-full"></div>
                <p className="text-sm text-slate-600 font-medium italic">"Nenhuma aba deve abrir vazia. Estados iniciais (Empty States) são humanizados e incentivam a ação."</p>
              </div>
              <p className="text-xs text-slate-400 font-bold">Cálculos baseados em fluxos reais de caixa e juros compostos simulados.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <RefreshCw size={20} className="text-slate-400" /> Jornada de Atualização
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Sincronização automática em background a cada alteração de estado no frontend. Lógica de expiração de trial (10 dias) verificada a cada login/sync.
            </p>
          </section>
        </div>

        <div className="pt-10 border-t border-slate-50">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h4 className="text-xl font-black mb-4">Checklist QA - Zero Bugs</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Autenticação</p>
                <p className="text-xs font-medium text-slate-400">Cadastro bloqueia sem termos; Login inválido gera erro amigável.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Financeiro</p>
                <p className="text-xs font-medium text-slate-400">Gráficos Recharts refletem 100% dos dados registrados.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Trial</p>
                <p className="text-xs font-medium text-slate-400">Bloqueio automático e preservação de dados após expiração.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
