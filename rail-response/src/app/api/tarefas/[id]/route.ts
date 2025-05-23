// app/api/tarefa/route.ts
import { NextRequest, NextResponse } from "next/server";

// Criar nova tarefa
export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://quarkus-teste-production-5dc5.up.railway.app/rail/tarefa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

// Listar todas as tarefas
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`https://quarkus-teste-production-5dc5.up.railway.app/rail/tarefa/${params.id}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefa" }, { status: 500 });
  }
}
