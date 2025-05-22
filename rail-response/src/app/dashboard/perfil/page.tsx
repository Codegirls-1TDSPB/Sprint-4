'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/Cabecalho/Header';  
import Footer from '@/components/Rodape/Footer';
import { Logo } from '@/components/Logo';

export default function AtualizarPerfil() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenFake');
    if (!token) {
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  return (
    <>
      {/* Título laranja só aqui */}
      <Header customTitleClass="text-orange-500" />

      <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-8 mb-10">
        <div className="flex items-center mb-6">
          <Logo className="w-16 h-16 mr-4" />
          <h1 className="text-2xl font-semibold text-gray-800">Atualizar Perfil</h1>
        </div>

        <form>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="nome">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Digite seu nome completo"
              defaultValue="João da Silva"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="seuemail@exemplo.com"
              defaultValue="teste@gmail.com"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="telefone">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="(11) 99999-9999"
              defaultValue="(11) 99999-9999"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="endereco">
              Endereço
            </label>
            <input
              id="endereco"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Rua Exemplo, 123"
              defaultValue="Rua Exemplo, 123"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              alert('Perfil atualizado localmente!');
            }}
          >
            Salvar
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
