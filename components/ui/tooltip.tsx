"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined)

function useTooltip() {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("useTooltip must be used within Tooltip")
  }
  return context
}

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { setOpen } = useTooltip()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    } as any)
  }

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
    </div>
  )
}

function TooltipContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useTooltip()

  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        "bottom-full left-1/2 -translate-x-1/2 mb-2",
        className,
      )}
    >
      {children}
    </div>
  )
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
