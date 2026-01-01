
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Brain, 
  PieChart, 
  TrendingDown, 
  TrendingUp, 
  Milestone,
  Menu,
  X,
  LogOut,
  User,
  Lightbulb,
  Award,
  Settings as SettingsIcon,
  Presentation,
  FileCode
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 font-bold scale-105' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diagnosis', label: 'Diagnóstico', icon: Wallet },
    { id: 'mindset', label: 'Mente & Identidade', icon: Brain },
    { id: 'budget', label: 'Orçamento', icon: PieChart },
    { id: 'debts', label: 'Dívidas', icon: TrendingDown },
    { id: 'investments', label: 'Investimentos', icon: TrendingUp },
    { id: 'ideas', label: 'Renda & Negócios', icon: Lightbulb },
    { id: 'roadmap', label: 'Plano 12 Meses', icon: Milestone },
    { id: 'progress', label: 'Meu Progresso', icon: Award },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon },
    { id: 'pitch', label: 'Pitch Investidores', icon: Presentation },
    { id: 'docs', label: 'Documentação', icon: FileCode },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-6 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 mb-8 px-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200">M</div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">Mente & Carteira</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">SaaS Premium</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 custom-scrollbar overflow-y-auto pr-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-bold"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
          <span className="font-bold text-slate-900">Mente & Carteira</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-50 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-4/5 h-full bg-white p-6 shadow-2xl animate-in slide-in-from-left duration-300" onClick={(e) => e.stopPropagation()}>
             <nav className="space-y-2 mt-16 h-[80%] overflow-y-auto">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </nav>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 font-bold"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 mt-16 lg:mt-0 overflow-x-hidden">
        <header className="mb-10 hidden lg:flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-500 font-medium">Educação e Comportamento Financeiro</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 uppercase">Membro Elite</p>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Premium Active</p>
            </div>
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-all cursor-pointer overflow-hidden border-2 border-white">
              <User size={24} />
            </div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
