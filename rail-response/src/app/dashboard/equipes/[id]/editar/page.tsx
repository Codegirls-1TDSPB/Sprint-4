'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EquipeDTO {
  id: number;
  nome_equipe: string;
  tipo_experiencia: string;
  contato_responsavel: string;
}

export default function EditarEquipe() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [equipe, setEquipe] = useState<EquipeDTO | null>(null);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [tipoExperiencia, setTipoExperiencia] = useState('');
  const [contatoResponsavel, setContatoResponsavel] = useState('');

  useEffect(() => {
    fetch(`/api/equipe/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar equipe');
        return res.json();
      })
      .then((data) => {
        setEquipe(data);
        setNomeEquipe(data.nome_equipe);
        setTipoExperiencia(data.tipo_experiencia);
        setContatoResponsavel(data.contato_responsavel);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      nome_equipe: nomeEquipe,
      tipo_experiencia: tipoExperiencia,
      contato_responsavel: contatoResponsavel,
    };

    try {
      const res = await fetch(`/api/equipe/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push('/dashboard/equipes');
      } else {
        alert('Erro ao atualizar equipe');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão');
    }
  };

  if (!equipe) return <p>Carregando...</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Equipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome da equipe"
          value={nomeEquipe}
          onChange={(e) => setNomeEquipe(e.target.value)}
          required
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Tipo de experiência"
          value={tipoExperiencia}
          onChange={(e) => setTipoExperiencia(e.target.value)}
          required
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Contato responsável"
          value={contatoResponsavel}
          onChange={(e) => setContatoResponsavel(e.target.value)}
          required
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
