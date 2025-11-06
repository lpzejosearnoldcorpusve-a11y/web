import { DashboardSidebarHeader } from "./dashboard-sidebar-header"
import { DashboardSidebarNav } from "./dashboard-sidebar-nav"
import { DashboardSidebarFooter } from "./dashboard-sidebar-footer"

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col">
      <DashboardSidebarHeader />
      <DashboardSidebarNav />
      <DashboardSidebarFooter />
    </aside>
  )
}
