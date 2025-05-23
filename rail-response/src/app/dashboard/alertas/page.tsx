'use client';

import React, { useEffect, useState } from 'react';
// import withAuth from '@/hoc/withAuth'; // Proteção de rota comentada para validação
import Header from '@/components/Cabecalho/Header';
import Footer from '@/components/Rodape/Footer';
import { Alerta } from './types';


const AlertasPage: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlertas = async () => {
    try {
      const res = await fetch('https://python-api-railresponse.onrender.com/alertas', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Erro ao carregar os alertas.');
      const data = await res.json();
      setAlertas(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  // Atualiza a cada 10 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      fetchAlertas();
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-64 bg-blue-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-red-600 bg-red-100 p-4 rounded-md m-6">
          <strong>Erro:</strong> {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-blue-100 p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Alertas</h1>

        {alertas.length === 0 ? (
          <p className="text-gray-700">Nenhum alerta encontrado.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-3 px-4 font-medium text-gray-600">ID</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Mensagem</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Data</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Gravidade</th>
                </tr>
              </thead>
              <tbody>
                {alertas.map((alert, index) => (
                  <tr key={alert.id || index} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{alert.id}</td>
                    <td className="py-3 px-4">{alert.mensagem}</td>
                    <td className="py-3 px-4">{new Date(alert.hora).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
                    <td className={`py-3 px-4 font-semibold ${getSeverityColor(alert.prioridade)}`}>
                      {alert.prioridade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

const getSeverityColor = (prioridade: Alerta['prioridade']) => {
  switch (prioridade) {
    case 'Alta':
      return 'text-red-600';
    case 'Média':
      return 'text-yellow-600';
    case 'Baixa':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export default AlertasPage; // sem withAuth para validar sem proteção
