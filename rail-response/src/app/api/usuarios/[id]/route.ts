// GET: Buscar usuário por ID
// PUT: Atualizar usuário
// DELETE: Deletar usuário

import { NextResponse } from 'next/server';

//colocar o link da api hospedada - https://railway.com/
const API_URL = 'http://localhost:8080/usuario';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/${params.id}`);
  if (!res.ok) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

  const usuario = await res.json();
  return NextResponse.json(usuario);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const usuarioAtualizado = await res.json();
  return NextResponse.json(usuarioAtualizado);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/${params.id}`, {
    method: 'DELETE',
  });

  if (!res.ok) return NextResponse.json({ error: 'Erro ao deletar' }, { status: res.status });
  return NextResponse.json(null, { status: 204 });
}
