"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { UsersTableRoleBadge } from "./users-table-role-badge"
import { UsersTableStatusBadge } from "./users-table-status-badge"
import { useState } from "react"
import { UserFormDialog } from "./user-form-dialog"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

interface UsersTableRowProps {
  user: User
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <>
      <tr className="border-b hover:bg-muted/50 transition-colors">
        <td className="p-4 font-medium">{user.name}</td>
        <td className="p-4 text-muted-foreground">{user.email}</td>
        <td className="p-4">
          <UsersTableRoleBadge role={user.role} />
        </td>
        <td className="p-4">
          <UsersTableStatusBadge status={user.status} />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>

      <UserFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={{
          id: String(user.id),
          nombre: user.name,
          email: user.email,
          role: user.role,
          activo: user.status === "active"
        }}
      />
    </>
  )
}
