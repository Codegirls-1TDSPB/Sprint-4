import { NextRequest, NextResponse } from "next/server";

// Listar todas as notificações
export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://quarkus-teste-production-5dc5.up.railway.app/rail/notificacao"); // ou /notificacoes, depende da API backend

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

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://quarkus-teste-production-5dc5.up.railway.app/rail/notificacao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
