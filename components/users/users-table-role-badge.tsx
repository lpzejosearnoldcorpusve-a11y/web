import { Badge } from "@/components/ui/badge"

interface UsersTableRoleBadgeProps {
  role: string
}

export function UsersTableRoleBadge({ role }: UsersTableRoleBadgeProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador":
        return "bg-primary text-primary-foreground"
      case "Editor":
        return "bg-secondary text-secondary-foreground"
      case "Usuario":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return <Badge className={getRoleColor(role)}>{role}</Badge>
}
