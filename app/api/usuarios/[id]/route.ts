import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number.parseInt(id)))

    if (!user.length) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user[0] }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error al obtener usuario:", error)
    return NextResponse.json({ success: false, error: "Error al obtener usuario" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updateData = Object.fromEntries(Object.entries(body).filter(([_, v]) => v !== undefined && v !== ""))

    const updatedUser = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number.parseInt(id)))
      .returning()

    if (!updatedUser.length) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedUser[0] }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error al actualizar usuario:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar usuario" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, Number.parseInt(id)))
      .returning()

    if (!deletedUser.length) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: { message: "Usuario eliminado correctamente" } }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error al eliminar usuario:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar usuario" }, { status: 500 })
  }
}
