// GET: Listar usuários
// POST: Criar novo usuário

import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://quarkus-teste-production-5dc5.up.railway.app/rail/usuario');
  const usuarios = await res.json();
  return NextResponse.json(usuarios);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch('https://quarkus-teste-production-5dc5.up.railway.app/rail/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const novoUsuario = await res.json();
  return NextResponse.json(novoUsuario, { status: 201 });
}
