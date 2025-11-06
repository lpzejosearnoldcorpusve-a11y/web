import { Button } from "@/components/ui/button"

interface UserFormActionsProps {
  isLoading: boolean
  isEdit: boolean
}

export function UserFormActions({ isLoading, isEdit }: UserFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? "Guardando..." : isEdit ? "Actualizar Usuario" : "Crear Usuario"}
      </Button>
    </div>
  )
}
