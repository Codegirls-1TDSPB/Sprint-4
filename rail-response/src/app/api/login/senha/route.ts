// app/api/login/senha/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch("https://quarkus-teste-production-5dc5.up.railway.app/rail/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao alterar senha" }, { status: 500 });
  }
}
