'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Cabecalho/Header';
import Footer from '@/components/Rodape/Footer';

interface Tarefa {
  id: number;
  nome: string;
  localizacao: string;
  status: string;
}

export default function PainelTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizandoId, setAtualizandoId] = useState<number | null>(null);

  async function carregarTarefas() {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('/api/tarefa');
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      const data = await res.json();
      setTarefas(data);
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function atualizarStatus(id: number, status: string) {
    setAtualizandoId(id);
    try {
      const res = await fetch(`/api/tarefa/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Erro ao atualizar tarefa');
      await carregarTarefas(); 
    } catch (error: any) {
      alert('Falha ao atualizar: ' + error.message);
    } finally {
      setAtualizandoId(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#112B3C] text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-orange-500">Painel de Tarefas</h1>

        {loading && <p>Carregando tarefas...</p>}
        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        {!loading && !erro && (
          <>
            {tarefas.length === 0 ? (
              <p className="text-gray-400">Nenhuma tarefa cadastrada.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4">Nome</th>
                    <th className="py-2 px-4">Localização</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tarefas.map((tarefa) => (
                    <tr key={tarefa.id} className="border-b border-gray-700 hover:bg-[#205375]">
                      <td className="py-2 px-4">{tarefa.nome}</td>
                      <td className="py-2 px-4">{tarefa.localizacao}</td>
                      <td className="py-2 px-4">
                        <select
                          value={tarefa.status}
                          onChange={(e) => atualizarStatus(tarefa.id, e.target.value)}
                          disabled={atualizandoId === tarefa.id}
                          className="bg-[#112B3C] border border-gray-500 rounded px-2 py-1 text-white"
                        >
                          <option value="Ativa">Ativa</option>
                          <option value="Inativa">Inativa</option>
                          <option value="Em manutenção">Em manutenção</option>
                        </select>
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => alert('Implementar edição')}
                          className="mr-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => alert('Implementar exclusão')}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
