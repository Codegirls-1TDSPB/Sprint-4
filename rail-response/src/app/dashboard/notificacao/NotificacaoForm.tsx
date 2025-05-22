"use client";

import { useState } from "react";

export default function NotificacaoForm() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [contato, setContato] = useState("");
  const [categoria, setCategoria] = useState("informativo");
  const [prioridade, setPrioridade] = useState("media");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaNotificacao = {
      titulo,
      mensagem,
      contato,
      categoria,
      prioridade,
      lido: false,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8000/notificacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaNotificacao),
      });

      if (response.ok) {
        alert("Notificação enviada com sucesso!");
        setTitulo("");
        setMensagem("");
        setContato("");
        setCategoria("informativo");
        setPrioridade("media");
      } else {
        alert("Erro ao enviar notificação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto flex flex-col gap-6"
      style={{ minWidth: "320px" }}
    >
      <div>
        <label htmlFor="titulo" className="block font-semibold text-gray-700 mb-1">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Título da notificação"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block font-semibold text-gray-700 mb-1">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Conteúdo da notificação"
        />
      </div>

      <div>
        <label htmlFor="contato" className="block font-semibold text-gray-700 mb-1">
          Contato (email ou telefone)
        </label>
        <input
          id="contato"
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: usuario@exemplo.com ou (99) 99999-9999"
        />
      </div>

      <div>
        <label htmlFor="categoria" className="block font-semibold text-gray-700 mb-1">
          Categoria
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="informativo">Informativo</option>
          <option value="alerta">Alerta</option>
          <option value="atualizacao">Atualização</option>
          <option value="urgente">Urgente</option>
        </select>
      </div>

      <div>
        <label htmlFor="prioridade" className="block font-semibold text-gray-700 mb-1">
          Prioridade
        </label>
        <select
          id="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Enviar Notificação
      </button>
    </form>
  );
}
