"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersTableHeader } from "./users-table-header"
import { useUsuarios } from "@/hooks/use-usuarios"
import { Skeleton } from "@/components/ui/skeleton"
import { UserFormDialog } from "./user-form-dialog"
import { Button } from "@/components/ui/button"

export function UsersTable() {
  const { usuarios, isLoading, error, deleteUsuario } = useUsuarios()
  const usuariosArray = Array.isArray(usuarios) ? usuarios : []
  const [selectedUser, setSelectedUser] = useState<
    { id: string; nombre: string; email: string; role: string; activo: boolean } | undefined
  >(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (usuario: any) => {
    setSelectedUser(usuario)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUsuario(id)
      } catch (err) {
        alert("Error al eliminar: " + (err instanceof Error ? err.message : "Error desconocido"))
      }
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">Error al cargar usuarios: {error.message}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios ({usuariosArray.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <UsersTableHeader />
              <tbody>
                {usuariosArray.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuariosArray.map((usuario: any) => (
                    <tr key={usuario.id} className="border-t hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{usuario.nombre}</td>
                      <td className="py-3 px-4">{usuario.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{usuario.role}</span>
                      </td>
                      <td className="py-3 px-4">
                        {usuario.activo ? (
                          <span className="text-green-600">Activo</span>
                        ) : (
                          <span className="text-gray-400">Inactivo</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(usuario)}>
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(usuario.id)}
                          className="text-red-600"
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <UserFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={selectedUser} />
    </>
  )
}
