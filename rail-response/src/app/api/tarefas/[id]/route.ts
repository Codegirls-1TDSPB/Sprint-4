// app/api/tarefa/route.ts
import { NextRequest, NextResponse } from "next/server";

// Listar todas as tarefas
export async function GET(req: NextRequest) {
  const response = await fetch("http://localhost:8080/rail/tarefa");
  const data = await response.json();

  return NextResponse.json(data);
}

// Criar nova tarefa
export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("http://localhost:8080/rail/tarefa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
