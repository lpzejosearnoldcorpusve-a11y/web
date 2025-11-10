import { db } from "@/db"
import { users } from "@/db/schema"
import { type NextRequest, NextResponse } from "next/server"

const roleMap: { [key: string]: string } = {
  'Administrador': 'admin',
  'Editor': 'editor', 
  'Usuario': 'user'
}

export async function GET() {
  try {
    const allUsers = await db.select().from(users)
    return NextResponse.json({ success: true, data: allUsers }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error al obtener usuarios:", error)
    return NextResponse.json({ success: false, error: "Error al obtener usuarios" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Body recibido:", body)

    if (!body.nombre?.trim() || !body.email?.trim() || !body.password?.trim()) {
      return NextResponse.json({ success: false, error: "nombre, email y password son requeridos" }, { status: 400 })
    }

    const mappedRole: "user" | "admin" | "editor" =
      body.role === "Administrador"
        ? "admin"
        : body.role === "Editor"
        ? "editor"
        : "user";

    const newUserData = {
      nombre: body.nombre.trim(),
      email: body.email.trim(),
      password: body.password.trim(),
      role: mappedRole, // Usar el valor mapeado
      activo: String(body.activo !== undefined ? body.activo : true), // Mantener como string
    }

    const newUser = await db.insert(users).values(newUserData).returning()
    console.log("[v0] Usuario creado:", newUser[0])
    return NextResponse.json({ success: true, data: newUser[0] }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Error al crear usuario:", error)
    
    // Manejar error de email duplicado
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: "El email ya está registrado" },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Error al crear usuario" },
      { status: 500 },
    )
  }
}