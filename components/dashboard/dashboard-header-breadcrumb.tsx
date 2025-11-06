"use client"

import { usePathname } from "next/navigation"

export function DashboardHeaderBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Dashboard</span>
      {segments.length > 1 && (
        <>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium capitalize">{segments[segments.length - 1]}</span>
        </>
      )}
    </div>
  )
}
