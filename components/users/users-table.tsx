import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersTableHeader } from "./users-table-header"

export function UsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <UsersTableHeader />
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  No hay usuarios registrados
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
