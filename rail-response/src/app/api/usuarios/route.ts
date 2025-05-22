// GET: Listar usuários
// POST: Criar novo usuário

import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('http://localhost:8080/rail/usuario');
  const usuarios = await res.json();
  return NextResponse.json(usuarios);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch('http://localhost:8080/rail/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const novoUsuario = await res.json();
  return NextResponse.json(novoUsuario, { status: 201 });
}
