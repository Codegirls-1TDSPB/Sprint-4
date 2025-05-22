'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  // adicione mais campos que você tenha no usuário
}

const EditarUsuario: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Proteção de rota (descomente para ativar)
    /*
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redireciona para login se não estiver autenticado
      return;
    }
    */
  }, [router]);

  useEffect(() => {
    if (!id) return;

    async function fetchUsuario() {
      try {
        const res = await fetch(`/api/usuarios/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar usuário.');
        const data = await res.json();
        setUsuario(data);
        setNome(data.nome);
        setEmail(data.email);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });

      if (!res.ok) throw new Error('Erro ao atualizar usuário.');

      router.push('/dashboard/usuarios');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <p>Carregando usuário...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;
  if (!usuario) return <p>Usuário não encontrado.</p>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
