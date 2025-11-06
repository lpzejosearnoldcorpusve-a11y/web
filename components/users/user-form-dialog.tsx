import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserForm } from "./user-form"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: {
    id: number
    name: string
    email: string
    role: string
    status: string
  }
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{user ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {user ? "Modifica la información del usuario" : "Completa el formulario para crear un nuevo usuario"}
          </DialogDescription>
        </DialogHeader>
        <UserForm user={user} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
