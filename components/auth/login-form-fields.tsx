"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface LoginFormFieldsProps {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
}

export function LoginFormFields({ email, password, onEmailChange, onPasswordChange }: LoginFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="usuario@ejemplo.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="border-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          className="border-2"
        />
      </div>
    </>
  )
}
