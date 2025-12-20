import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "badge",
  {
    variants: {
      variant: {
        default: "badge-primary",
        secondary: "badge-secondary",
        neutral: "badge-neutral",
        accent: "badge-accent",
        info: "badge-info",
        success: "badge-success",
        warning: "badge-warning",
        error: "badge-error",
      },
      badgeStyle: {
        outline: "badge-outline",
        dash: "badge-dash",
        soft: "badge-soft",
        ghost: "badge-ghost",
      },
      size: {
        default: "badge-md",
        xs: "badge-xs",
        sm: "badge-sm",
        lg: "badge-lg",
        xl: "badge-xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  badgeStyle,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean,
  }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="span"
      className={cn(badgeVariants({ variant, size, badgeStyle, className }))}
      {...props}
    >
      {props.children}
    </Comp>
  )
}

export { Badge, badgeVariants }