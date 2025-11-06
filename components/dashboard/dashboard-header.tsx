import { DashboardHeaderUser } from "./dashboard-header-user"
import { DashboardHeaderNotifications } from "./dashboard-header-notifications"
import { DashboardHeaderBreadcrumb } from "./dashboard-header-breadcrumb"

export function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      <DashboardHeaderBreadcrumb />

      <div className="flex items-center gap-4">
        <DashboardHeaderNotifications />
        <DashboardHeaderUser />
      </div>
    </header>
  )
}
