export function UsersTableHeader() {
  return (
    <thead className="border-b">
      <tr>
        <th className="text-left p-4 font-medium text-muted-foreground">Nombre</th>
        <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
        <th className="text-left p-4 font-medium text-muted-foreground">Rol</th>
        <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
        <th className="text-left p-4 font-medium text-muted-foreground">Acciones</th>
      </tr>
    </thead>
  )
}
