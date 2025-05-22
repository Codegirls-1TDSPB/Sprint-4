// app/api/equipe/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET - Listar equipes
export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:8080/rail/equipe");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar equipes" }, { status: 500 });
  }
}

// POST - Cadastrar nova equipe
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch("http://localhost:8080/rail/equipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao cadastrar equipe" }, { status: 500 });
  }
}
