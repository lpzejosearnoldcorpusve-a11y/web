import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UsersHeader } from "@/components/users/users-header"
import { UsersTable } from "@/components/users/users-table"

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <UsersHeader />
        <UsersTable />
      </div>
    </DashboardLayout>
  )
}
