'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import withAuth from '@/hoc/withAuth'; // Proteção de rota comentada
import Header from '@/components/Cabecalho/Header';
import Footer from '@/components/Rodape/Footer';

export default function NovoUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [administrador, setAdministrador] = useState(false);
  const [nivelInterno, setNivelInterno] = useState('');
  const [nivelUsuario, setNivelUsuario] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          administrador,
          nivel_interno: nivelInterno,
          nivel_usuario: nivelUsuario,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      setSuccess(true);
      setNome('');
      setAdministrador(false);
      setNivelInterno('');
      setNivelUsuario('');
      setTimeout(() => router.push('/dashboard/usuarios'), 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto p-8 w-full">
        <h1 className="text-3xl font-semibold mb-6 text-blue-900">
          Novo Usuário
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-md p-6 space-y-6"
          noValidate
        >
          {error && (
            <div className="border border-red-400 bg-red-50 text-red-700 p-3 rounded-md">
              <strong>Erro:</strong> {error}
            </div>
          )}
          {success && (
            <div className="border border-green-400 bg-green-50 text-green-700 p-3 rounded-md">
              Usuário cadastrado com sucesso! Redirecionando...
            </div>
          )}

          <div>
            <label htmlFor="nome" className="block font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Digite o nome completo"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="administrador"
              type="checkbox"
              checked={administrador}
              onChange={() => setAdministrador(!administrador)}
              className="h-5 w-5 text-blue-600"
            />
            <label htmlFor="administrador" className="text-gray-700 font-medium">
              Administrador
            </label>
          </div>

          <div>
            <label htmlFor="nivel_interno" className="block font-medium text-gray-700 mb-1">
              Nível Interno
            </label>
            <input
              id="nivel_interno"
              type="text"
              value={nivelInterno}
              onChange={(e) => setNivelInterno(e.target.value)}
              placeholder="Ex: Nível 1, Supervisor, etc."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="nivel_usuario" className="block font-medium text-gray-700 mb-1">
              Nível Usuário
            </label>
            <input
              id="nivel_usuario"
              type="text"
              value={nivelUsuario}
              onChange={(e) => setNivelUsuario(e.target.value)}
              placeholder="Ex: Básico, Avançado, etc."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/usuarios"
              className="text-blue-600 hover:underline font-medium"
            >
              &larr; Voltar para lista
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

// export default withAuth(NovoUsuario); // Proteção comentada
