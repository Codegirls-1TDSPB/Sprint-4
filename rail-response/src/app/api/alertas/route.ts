import { NextRequest, NextResponse } from "next/server";

// Listar todos os alertas
export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:8000/alertas");

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar alertas" }, { status: 500 });
  }
}
