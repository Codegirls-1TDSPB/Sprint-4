'use client';

import Header from '@/components/Cabecalho/Header';  
import Footer from '@/components/Rodape/Footer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LucideAlertTriangle,
  LucideClipboardList,
  LucideUsers,
  LucideUserCog,
  LucideUser,
  LucideBell,
} from 'lucide-react';

const dashboardItems = [
  { label: 'Alertas', icon: LucideAlertTriangle, path: '/dashboard/alertas' },
  { label: 'Notificações', icon: LucideBell, path: '/dashboard/notificacao' },
  { label: 'Tarefas', icon: LucideClipboardList, path: '/dashboard/tarefa' },
  { label: 'Equipes', icon: LucideUsers, path: '/dashboard/equipes' },
  { label: 'Usuários', icon: LucideUser, path: '/dashboard/usuarios' },
  { label: 'Atualizar Perfil', icon: LucideUserCog, path: '/dashboard/perfil' },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('tokenFake');
    if (!token) {
      // Se não estiver autenticado, redireciona para login
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#112B3C] text-white">
      <Header />
      
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-12 text-center">
          Painel de Controle
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {dashboardItems.map(({ label, icon: Icon, path }) => (
            <div
              key={label}
              role="button"
              tabIndex={0}
              onClick={() => router.push(path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(path);
                }
              }}
              className="bg-[#205375] hover:bg-[#1a4663] transition-all duration-300 p-6 rounded-2xl shadow-lg cursor-pointer flex flex-col items-center text-center transform hover:scale-105 ring-0 hover:ring-2 hover:ring-orange-400"
            >
              <Icon className="text-orange-400 w-8 h-8 mb-4" />
              <span className="text-lg font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
