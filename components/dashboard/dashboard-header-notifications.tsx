import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export function DashboardHeaderNotifications() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      <span className="absolute top-1 right-1 h-2 w-2 bg-tertiary rounded-full" />
    </Button>
  )
}
