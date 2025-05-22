// app/api/equipe/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET - Buscar equipe por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`http://localhost:8080/rail/equipe/${params.id}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar equipe" }, { status: 500 });
  }
}

// PUT - Atualizar equipe por ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const res = await fetch(`http://localhost:8080/rail/equipe/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar equipe" }, { status: 500 });
  }
}

// DELETE - Deletar equipe por ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`http://localhost:8080/rail/equipe/${params.id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      return NextResponse.json({ message: "Equipe deletada com sucesso" });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar equipe" }, { status: 500 });
  }
}
