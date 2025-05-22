'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaEstacao() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [status, setStatus] = useState('Ativa'); // Pode ser 'Ativa', 'Inativa', etc.
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !localizacao) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('/api/tarefa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, localizacao, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido');
      }

      alert('Estação cadastrada com sucesso!');
      router.push('/dashboard/estacoes'); // Ajuste essa rota conforme sua necessidade
    } catch (error: any) {
      setErro('Erro ao salvar estação: ' + error.message);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Nova Estação</h1>

      {erro && <p className="text-red-600 mb-4">{erro}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block font-medium mb-1">
            Nome da Estação
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ex: Estação Central"
          />
        </div>

        <div>
          <label htmlFor="localizacao" className="block font-medium mb-1">
            Localização
          </label>
          <input
            id="localizacao"
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ex: São Paulo"
          />
        </div>

        <div>
          <label htmlFor="status" className="block font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Ativa">Ativa</option>
            <option value="Inativa">Inativa</option>
            <option value="Em manutenção">Em manutenção</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
