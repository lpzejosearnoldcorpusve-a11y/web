"use client"

import type React from "react"

import { useState } from "react"
import { UserFormFields } from "./user-form-fields"
import { UserFormActions } from "./user-form-actions"

interface UserFormProps {
  user?: {
    id: number
    name: string
    email: string
    role: string
    status: string
  }
  onSuccess: () => void
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Usuario",
    status: user?.status || "Activo",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      onSuccess()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <UserFormFields formData={formData} onChange={setFormData} />
      <UserFormActions isLoading={isLoading} isEdit={!!user} />
    </form>
  )
}
