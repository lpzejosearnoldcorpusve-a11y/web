import { Badge } from "@/components/ui/badge"

interface UsersTableStatusBadgeProps {
  status: string
}

export function UsersTableStatusBadge({ status }: UsersTableStatusBadgeProps) {
  const isActive = status === "Activo"

  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={isActive ? "bg-secondary text-secondary-foreground" : ""}
    >
      {status}
    </Badge>
  )
}
