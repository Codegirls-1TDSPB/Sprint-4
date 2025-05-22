'use client';

import React, { useState } from 'react';

interface AlertaFormData {
  message: string;
  date: string;
  severity: 'Baixo' | 'Médio' | 'Alto' | '';
}

const AlertaForm: React.FC = () => {
  const [formData, setFormData] = useState<AlertaFormData>({
    message: '',
    date: '',
    severity: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isFormValid =
    formData.message.trim() !== '' &&
    formData.date.trim() !== '' &&
    formData.severity !== '';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao enviar alerta');
      }

      setSuccessMsg('Alerta enviado com sucesso!');
      setFormData({ message: '', date: '', severity: '' });
    } catch (error) {
      setErrorMsg((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Criar novo alerta</h2>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2 font-medium text-gray-700" htmlFor="message">
          Mensagem
        </label>
        <input
          id="message"
          name="message"
          type="text"
          value={formData.message}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a mensagem do alerta"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-medium text-gray-700" htmlFor="date">
          Data
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-medium text-gray-700" htmlFor="severity">
          Gravidade
        </label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        >
          <option value="">Selecione a gravidade</option>
          <option value="Baixo">Baixo</option>
          <option value="Médio">Médio</option>
          <option value="Alto">Alto</option>
        </select>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
            isFormValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Enviando...' : 'Enviar Alerta'}
        </button>
      </form>
    </div>
  );
};

export default AlertaForm;
