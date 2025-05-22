'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface EquipeDTO {
  id: number;
  nome_equipe: string;
  tipo_experiencia: string;
  contato_responsavel: string;
}

export default function Equipes() {
  const [equipes, setEquipes] = useState<EquipeDTO[]>([]);

  useEffect(() => {
    fetch('/api/equipe')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar equipes');
        return res.json();
      })
      .then((data) => setEquipes(data))
      .catch((err) => console.error(err));
  }, []);

  const excluirEquipe = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta equipe?')) return;

    try {
      const res = await fetch(`/api/equipe/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEquipes((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert('Erro ao excluir equipe');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao excluir equipe');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Equipes</h1>

      <Link
        href="/dashboard/equipes/novo"
        className="mb-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        + Nova Equipe
      </Link>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-orange-100">
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Tipo de Experiência</th>
            <th className="border border-gray-300 px-4 py-2">Contato Responsável</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => (
            <tr key={equipe.id} className="hover:bg-orange-50">
              <td className="border border-gray-300 px-4 py-2">{equipe.nome_equipe}</td>
              <td className="border border-gray-300 px-4 py-2">{equipe.tipo_experiencia}</td>
              <td className="border border-gray-300 px-4 py-2">{equipe.contato_responsavel}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  href={`/dashboard/equipes/${equipe.id}/editar`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Editar
                </Link>
                <button
                  onClick={() => excluirEquipe(equipe.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
