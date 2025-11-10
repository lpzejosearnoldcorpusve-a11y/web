"use client"

import useSWR from "swr"
import { usuariosApi } from "@/lib/api-client"

export function useUsuarios() {
  const { data, error, isLoading, mutate } = useSWR("/api/usuarios", async () => {
    const result = await usuariosApi.getAll()
    console.log("[v0] Result completo:", result)
    console.log("[v0] Result.data:", result.data)
    console.log("[v0] Type result.data:", Array.isArray(result.data))
    
    // CORRECCIÓN: result.data ya es el array de usuarios
    if (result.success && Array.isArray(result.data)) {
      return result.data 
    }

    throw new Error(result.error || "Error al cargar usuarios")
  })

  const createUsuario = async (usuario: any) => {
    const result = await usuariosApi.create(usuario)
    console.log("[v0] Resultado de crear:", result)
    
    if (result.success) {
      mutate()
      return result.data
    }
    throw new Error(result.error || "Error al crear usuario")
  }

  const updateUsuario = async (id: string, usuario: any) => {
    const result = await usuariosApi.update(id, usuario)
    console.log("[v0] Resultado de actualizar:", result)
    
    if (result.success) {
      mutate()
      return result.data
    }
    throw new Error(result.error || "Error al actualizar usuario")
  }

  const deleteUsuario = async (id: string) => {
    const result = await usuariosApi.delete(id)
    console.log("[v0] Resultado de eliminar:", result)
    
    if (result.success) {
      mutate()
      return
    }
    throw new Error(result.error || "Error al eliminar usuario")
  }

  return {
    usuarios: data || [], 
    isLoading,
    error,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    mutate
  }
}