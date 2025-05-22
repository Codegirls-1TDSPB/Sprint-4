'use client';

import { Logo } from "../components/Logo"; 
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div 
        role="img" 
        aria-label="Logo da CCR RailResponse" 
        className="rounded-full w-48 h-48" 
      >
        <Logo />
      </div>

      <h1
        className="text-orange-500 text-4xl font-bold mt-4"
        aria-label="Sistema de Gestão de Alertas Ferroviários"
      >
        RailResponse
      </h1>

      <button
        onClick={handleClick}
        className="mt-6 bg-orange-500 text-black font-medium text-lg px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        Entrar
      </button>
    </div>
  );
}
