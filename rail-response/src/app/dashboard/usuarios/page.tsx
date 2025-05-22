'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import withAuth from '@/hoc/withAuth'; // Proteção de rota comentada
import Header from '@/components/Cabecalho/Header';
import Footer from '@/components/Rodape/Footer';

interface Usuario {
  id: number;
  nome: string;
  administrador: boolean;
  nivel_interno: string;
  nivel_usuario: string;
}

function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) throw new Error('Erro ao carregar usuários');
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"
          aria-label="Carregando usuários"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="max-w-4xl mx-auto mt-10 text-red-700 bg-red-100 border border-red-300 p-4 rounded-md"
        role="alert"
      >
        <strong className="font-semibold">Erro:</strong> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Cabeçalho fixo */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-grow max-w-7xl mx-auto p-8 w-full">
        {/* Título e botão criar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <Link
            href="/dashboard/usuarios/novo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            + Novo Usuário
          </Link>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Nome</th>
                <th className="px-6 py-3 text-left font-semibold">Administrador</th>
                <th className="px-6 py-3 text-left font-semibold">Nível Interno</th>
                <th className="px-6 py-3 text-left font-semibold">Nível Usuário</th>
                <th className="px-6 py-3 text-left font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-6 text-gray-500 italic"
                  >
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-800">{usuario.nome}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {usuario.administrador ? 'Sim' : 'Não'}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{usuario.nivel_interno}</td>
                    <td className="px-6 py-4 text-gray-800">{usuario.nivel_usuario}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <Link
                        href={`/dashboard/usuarios/${usuario.id}/editar`}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label={`Editar usuário ${usuario.nome}`}
                        title={`Editar usuário ${usuario.nome}`}
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() =>
                          alert(`Excluir usuário ${usuario.nome} (implementar!)`)
                        }
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Excluir usuário ${usuario.nome}`}
                        title={`Excluir usuário ${usuario.nome}`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

// export default withAuth(Usuarios); // Proteção de rota comentada
export default Usuarios;
