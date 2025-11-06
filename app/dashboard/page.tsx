import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h1 className="text-2xl font-bold text-foreground">Inicio</h1>
          <p className="text-muted-foreground mt-2">Contenido del dashboard</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
