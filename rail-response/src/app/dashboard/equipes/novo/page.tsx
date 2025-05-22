'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Cabecalho/Header';
import Footer from '@/components/Rodape/Footer';
import { Logo } from "@/components/Logo";

export default function NovaEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [tipoExperiencia, setTipoExperiencia] = useState('');
  const [contatoResponsavel, setContatoResponsavel] = useState('');
  const [acoes, setAcoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setTipoMensagem('');

    const body = {
      nome_equipe: nomeEquipe,
      tipo_experiencia: tipoExperiencia,
      contato_responsavel: contatoResponsavel,
      acoes: acoes,
    };

    try {
      const res = await fetch('/api/equipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMensagem('Equipe cadastrada com sucesso!');
        setTipoMensagem('sucesso');
        setTimeout(() => {
          router.push('/dashboard/equipes');
        }, 2000);
      } else {
        setMensagem('Erro ao cadastrar equipe');
        setTipoMensagem('erro');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor');
      setTipoMensagem('erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#1b4263] flex flex-col items-center justify-center px-4 py-10 relative">
        <Logo className="absolute top-6 left-6 w-24 h-24 rounded-full" />

        <div className="bg-gray-100 p-8 rounded-xl shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Cadastrar Nova Equipe</h1>
          <p className="text-gray-600 text-center mb-6">
            Preencha os campos abaixo para registrar uma nova equipe.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nomeEquipe" className="block text-sm font-medium mb-1">
                Nome da Equipe
              </label>
              <input
                id="nomeEquipe"
                type="text"
                value={nomeEquipe}
                onChange={(e) => setNomeEquipe(e.target.value)}
                required
                placeholder="Digite o nome da equipe"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="tipoExperiencia" className="block text-sm font-medium mb-1">
                Tipo de Experiência
              </label>
              <input
                id="tipoExperiencia"
                type="text"
                value={tipoExperiencia}
                onChange={(e) => setTipoExperiencia(e.target.value)}
                required
                placeholder="Ex: Profissional, Estágio, Voluntariado..."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="contatoResponsavel" className="block text-sm font-medium mb-1">
                Contato Responsável
              </label>
              <input
                id="contatoResponsavel"
                type="text"
                value={contatoResponsavel}
                onChange={(e) => setContatoResponsavel(e.target.value)}
                required
                placeholder="Nome e contato do responsável"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="acoes" className="block text-sm font-medium mb-1">
                Ações da Equipe
              </label>
              <textarea
                id="acoes"
                value={acoes}
                onChange={(e) => setAcoes(e.target.value)}
                required
                placeholder="Descreva as ações realizadas pela equipe"
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              />
            </div>

            {mensagem && (
              <p
                className={`text-center text-sm ${
                  tipoMensagem === 'sucesso' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {mensagem}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-black py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Equipe'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
