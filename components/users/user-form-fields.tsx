"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface UserFormFieldsProps {
  formData: {
    name: string
    email: string
    role: string
    status: string
    password: string
  }
  onChange: (data: any) => void
  isEdit?: boolean
  errors?: {
    name?: string
    email?: string
    password?: string
  }
}

export function UserFormFields({ formData, onChange, isEdit = false, errors = {} }: UserFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    if (isEdit && !password) return true
    return password.length >= 6
  }

  const handleEmailChange = (email: string) => {
    onChange({ ...formData, email })
  }

  const handlePasswordChange = (password: string) => {
    onChange({ ...formData, password })
  }

  const handleNameChange = (name: string) => {
    const filteredName = name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    onChange({ ...formData, name: filteredName })
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nombre Completo *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Juan Pérez"
          required
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
        {!errors.name && formData.name && (
          <p className="text-green-600 text-sm">✓ Nombre válido</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="juan@ejemplo.com"
          required
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        {!errors.email && formData.email && validateEmail(formData.email) && (
          <p className="text-green-600 text-sm">✓ Email válido</p>
        )}
        {!errors.email && formData.email && !validateEmail(formData.email) && (
          <p className="text-yellow-600 text-sm">⚠ Formato de email inválido</p>
        )}
      </div>

      {!isEdit && (
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required={!isEdit}
              className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              </span>
            </Button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          {!errors.password && formData.password && validatePassword(formData.password) && (
            <p className="text-green-600 text-sm">✓ Contraseña segura</p>
          )}
          {!errors.password && formData.password && !validatePassword(formData.password) && (
            <p className="text-yellow-600 text-sm">⚠ Mínimo 6 caracteres</p>
          )}
        </div>
      )}

      {isEdit && (
        <div className="space-y-2">
          <Label htmlFor="password">Nueva Contraseña (opcional)</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Dejar vacío para mantener la actual"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              </span>
            </Button>
          </div>
          {formData.password && !validatePassword(formData.password) && (
            <p className="text-yellow-600 text-sm">⚠ Mínimo 6 caracteres</p>
          )}
          {formData.password && validatePassword(formData.password) && (
            <p className="text-green-600 text-sm">✓ Nueva contraseña segura</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="role">Rol *</Label>
        <Select value={formData.role} onValueChange={(value) => onChange({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Administrador">Administrador</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Usuario">Usuario</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Estado *</Label>
        <Select value={formData.status} onValueChange={(value) => onChange({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-gray-500">
        <p>* Campos obligatorios</p>
        {isEdit && (
          <p className="mt-1">💡 En edición, la contraseña solo es necesaria si deseas cambiarla</p>
        )}
      </div>
    </>
  )
}