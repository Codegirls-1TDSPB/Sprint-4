import { NextRequest, NextResponse } from "next/server";

// Atualizar notificação por ID
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const res = await fetch(`http://localhost:8000/alertas/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: errorText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar notificação" }, { status: 500 });
    }
}

// Deletar notificação por ID
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const res = await fetch(`http://localhost:8000/alertas/${params.id}`, {
            method: "DELETE",
        });

        if (res.status === 204) {
            return NextResponse.json({ message: "Notificação deletada com sucesso" });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar notificação" }, { status: 500 });
    }
}
