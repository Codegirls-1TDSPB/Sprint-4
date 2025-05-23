// src/dashboard/alertas/AlertaLista.tsx
'use client';

import { useEffect, useState } from 'react';

interface Alerta {
  id: number;
  trem: number;
  sistema: string;
  mensagem: string;
  prioridade: string;
  hora: string;
}

export function AlertaLista() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    fetch('https://python-api-railresponse.onrender.com/alertas')
      .then(res => res.json())
      .then(data => setAlertas(data));
  }, []);

  return (
    <div className="space-y-4">
      {alertas.map(alerta => (
        <div
          key={alerta.id}
          className="bg-white rounded-lg p-4 shadow cursor-pointer hover:bg-orange-100 transition"
        >
          <p className="text-gray-800 font-bold">🚨 Alerta #{alerta.id}</p>
          <p><strong>Sistema:</strong> {alerta.sistema}</p>
          <p><strong>Mensagem:</strong> {alerta.mensagem}</p>
          <p><strong>Prioridade:</strong> {alerta.prioridade}</p>
          <p className="text-sm text-gray-500">{new Date(alerta.hora).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}