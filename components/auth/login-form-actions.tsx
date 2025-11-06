import { Button } from "@/components/ui/button"

interface LoginFormActionsProps {
  isLoading: boolean
}

export function LoginFormActions({ isLoading }: LoginFormActionsProps) {
  return (
    <div className="space-y-4">
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading}
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>

      <div className="text-center">
        <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  )
}
