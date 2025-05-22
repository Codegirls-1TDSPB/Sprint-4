"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Cabecalho/Header";
import Footer from "@/components/Rodape/Footer";
import NotificacaoForm from "./notificacaoform";

export default function NotificacaoPage() {
  const router = useRouter();

  // 🔒 Proteção de rota (descomente e implemente sua lógica real)
  /*
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token"); // ou use seu contexto de auth
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);
  */

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-800">
      <Header />

      <main className="flex-1 py-10 px-4 md:px-8 max-w-4xl w-full mx-auto">
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-orange-600 mb-2">
            Gerenciar Notificações
          </h1>
          <p className="text-gray-600 italic">
            Envie uma nova notificação para os usuários do sistema.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto">
          <NotificacaoForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
