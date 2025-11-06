"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
  name: string
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined)

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("useRadioGroup must be used within RadioGroup")
  }
  return context
}

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  name?: string
  children: React.ReactNode
  className?: string
}

function RadioGroup({ value, onValueChange, name = "radio-group", children, className }: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const currentValue = value ?? internalValue
  const handleValueChange = onValueChange ?? setInternalValue

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, name }}>
      <div className={cn("grid gap-2", className)}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps {
  value: string
  id?: string
  className?: string
}

function RadioGroupItem({ value, id, className }: RadioGroupItemProps) {
  const { value: selectedValue, onValueChange, name } = useRadioGroup()
  const isSelected = selectedValue === value

  return (
    <div className="relative inline-flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onValueChange(value)}
        className="peer sr-only"
      />
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-primary ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
      >
        {isSelected && (
          <div className="flex items-center justify-center h-full">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        )}
      </div>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
