import { NextRequest, NextResponse } from "next/server";

// Listar todas as notificações
export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:8000/alertas"); // ou /notificacoes, depende da API backend

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar notificações" }, { status: 500 });
  }
}
