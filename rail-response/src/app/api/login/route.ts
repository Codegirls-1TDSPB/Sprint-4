// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const checkStrength = url.searchParams.get("checkStrength");

    let endpoint = "http://localhost:8080/rail/login";
    if (checkStrength) {
      // Se tiver query param para verificar força da senha
      endpoint += `?checkStrength=${encodeURIComponent(checkStrength)}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar logins" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let endpoint = "http://localhost:8080/rail/login";

    // Diferencia ação pelo campo 'action' no corpo do POST
    // "login" para realizar login
    // "register" para cadastrar login
    // Você pode adaptar conforme backend
    const action = body.action || "login";
    delete body.action;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro no POST login" }, { status: 500 });
  }
}
