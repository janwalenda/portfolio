import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "toggle",
  {
    variants: {
      variant: {
        default: "toggle-primary",
        secondary: "toggle-secondary",
        neutral: "toggle-neutral",
        accent: "toggle-accent",
        info: "toggle-info",
        success: "toggle-success",
        warning: "toggle-warning",
        error: "toggle-error",
        ghost: "toggle-ghost",
      },
      size: {
        default: "toggle-md",
        xs: "toggle-xs",
        sm: "toggle-sm",
        lg: "toggle-lg",
        xl: "toggle-xl",
        icon: "toggle-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleProps = React.ComponentProps<"input"> & VariantProps<typeof toggleVariants> & {
  asLink?: false,
  asChild?: boolean,
}

function Toggle({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ToggleProps) {
  const Comp = asChild ? Slot : "input"

  return (
    <Comp
      data-slot="input"
      type="checkbox"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants, type ToggleProps }
