
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Presentation, Target, Zap, TrendingUp, Users, PieChart, Rocket } from 'lucide-react';

const PitchDeck: React.FC = () => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Mente & Carteira",
      subtitle: "Transformação Financeira Real: Comportamento + Inteligência",
      icon: <Presentation className="text-emerald-600" size={64} />,
      content: "Não vendemos apenas um app de gastos. Vendemos uma nova identidade financeira para milhões de brasileiros.",
      tag: "O COMEÇO"
    },
    {
      title: "O Problema Real",
      subtitle: "O Caos Financeiro Brasileiro",
      icon: <Target className="text-red-500" size={64} />,
      content: "70% dos brasileiros vivem sem controle. Apps atuais focam em planilhas chatas, mas ignoram o que realmente importa: o comportamento humano.",
      tag: "DOR DO MERCADO"
    },
    {
      title: "A Nossa Solução",
      subtitle: "Psicologia do Dinheiro + Finanças Práticas",
      icon: <Zap className="text-amber-500" size={64} />,
      content: "Uma plataforma SaaS multi-tenant que guia o usuário do zero absoluto até os primeiros investimentos, focando em mudar o 'chip' mental primeiro.",
      tag: "INOVAÇÃO"
    },
    {
      title: "Diferencial Competitivo",
      subtitle: "Por que nós venceremos?",
      icon: <TrendingUp className="text-emerald-500" size={64} />,
      content: "Inteligência Gemini integrada para diagnósticos comportamentais únicos. Jornada guiada inteligente (Roadmap) e acessibilidade extrema (R$ 10,00/mês).",
      tag: "VANTAGEM"
    },
    {
      title: "Modelo de Negócio",
      subtitle: "SaaS Recorrente e Escalável",
      icon: <PieChart className="text-blue-500" size={64} />,
      content: "Foco no volume: 10.000 usuários ativos = R$ 1,2M ARR. Baixo custo de aquisição devido ao apelo emocional e educacional do método.",
      tag: "RENTABILIDADE"
    },
    {
      title: "Tamanho do Mercado",
      subtitle: "Um Oceano Azul de Oportunidades",
      icon: <Users className="text-indigo-500" size={64} />,
      content: "+150M de brasileiros precisam de educação financeira real. Expansão latente para parcerias com corretoras e bancos.",
      tag: "OPORTUNIDADE"
    },
    {
      title: "Visão de Futuro",
      subtitle: "Muito além de um gerenciador",
      icon: <Rocket className="text-emerald-600" size={64} />,
      content: "IA personalizada preditiva, Mentoria individual automatizada e ecossistema de investimentos integrado. Rumo à liberdade financeira de uma nação.",
      tag: "O PRÓXIMO NÍVEL"
    }
  ];

  const next = () => setSlide((prev) => (prev + 1) % slides.length);
  const prev = () => setSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-700">
      <div className="bg-white p-16 rounded-[4rem] shadow-2xl border border-slate-100 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          {slides[slide].icon}
        </div>
        
        <div>
          <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block">
            {slides[slide].tag}
          </span>
          <h2 className="text-5xl font-black text-slate-900 mb-4">{slides[slide].title}</h2>
          <h3 className="text-2xl font-bold text-emerald-600 mb-8">{slides[slide].subtitle}</h3>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">
            "{slides[slide].content}"
          </p>
        </div>

        <div className="flex items-center justify-between mt-16 pt-10 border-t border-slate-50">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-1.5 transition-all duration-300 rounded-full ${i === slide ? 'w-8 bg-emerald-600' : 'w-3 bg-slate-200'}`}></div>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"><ChevronLeft size={24}/></button>
            <button onClick={next} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2 font-bold">
              {slide === slides.length - 1 ? 'RECOMEÇAR' : 'PRÓXIMO'} <ChevronRight size={24}/>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
        Mente & Carteira • Confidential Investor Pitch Deck • 2025
      </div>
    </div>
  );
};

export default PitchDeck;
