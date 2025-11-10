"use client"

import type React from "react"
import { useState } from "react"
import { useUsuarios } from "@/hooks/use-usuarios"
import { UserFormFields } from "./user-form-fields"
import { UserFormActions } from "./user-form-actions"

interface UserFormProps {
  user?: {
    id: string
    nombre: string
    email: string
    role: string
    activo: boolean
  }
  onSuccess: () => void
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const { createUsuario, updateUsuario } = useUsuarios()
  const [formData, setFormData] = useState({
    name: user?.nombre || "",
    email: user?.email || "",
    role: user?.role || "user",
    status: user?.activo ? "active" : "inactive",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email inválido"
    }

    // Validar contraseña
    if (!user && !formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulario
    if (!validateForm()) {
      setError("Por favor corrige los errores en el formulario")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const dataToSend = {
        nombre: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        activo: formData.status === "active", // Cambiado a boolean
        // Solo enviar password si no está vacío (en edición) o si es nuevo usuario
        ...(formData.password && { password: formData.password.trim() })
      }

      if (user) {
        await updateUsuario(user.id, dataToSend)
      } else {
        await createUsuario(dataToSend)
      }
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    // Limpiar errores específicos cuando el usuario empiece a escribir
    if (data.name && fieldErrors.name) {
      setFieldErrors(prev => ({ ...prev, name: undefined }))
    }
    if (data.email && fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: undefined }))
    }
    if (data.password && fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: undefined }))
    }
    // Limpiar error general cuando el usuario interactúe con el formulario
    if (error) {
      setError("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <UserFormFields
        formData={formData}
        onChange={handleFormDataChange}
        isEdit={!!user}
        errors={fieldErrors}
      />
      
      <UserFormActions isLoading={isLoading} isEdit={!!user} />
    </form>
  )
}