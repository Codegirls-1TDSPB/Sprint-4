// app/api/tarefa/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// Buscar tarefa por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`http://localhost:8080/rail/tarefa/${params.id}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefa" }, { status: 500 });
  }
}

// Atualizar tarefa por ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const res = await fetch(`http://localhost:8080/rail/tarefa/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
  }
}

// Deletar tarefa por ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`http://localhost:8080/rail/tarefa/${params.id}`, {
      method: "DELETE",
    });

    // Alguns backends retornam 204 (sem corpo)
    if (res.status === 204) {
      return NextResponse.json({ message: "Tarefa deletada com sucesso" });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar tarefa" }, { status: 500 });
  }
}
