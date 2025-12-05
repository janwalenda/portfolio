import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "input",
  {
    variants: {
      variant: {
        default: "input-primary",
        secondary: "input-secondary",
        neutral: "input-neutral",
        accent: "input-accent",
        info: "input-info",
        success: "input-success",
        warning: "input-warning",
        error: "input-error",
      },
      style: {
        ghost: "input-ghost",
      },
      size: {
        default: "input-md",
        xs: "input-xs",
        sm: "input-sm",
        lg: "input-lg",
        xl: "input-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function LabeledInput({
  className,
  variant,
  size,
  style,
  asChild = false,
  startIcon,
  endIcon,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
  }) {
  const Comp = asChild ? Slot : "label"

  return (
    <Comp
      data-slot="label"
      className={cn(inputVariants({ variant, size, style, className }))}
    >
      {startIcon && startIcon}
      <input {...props} />
      {endIcon && endIcon}
    </Comp>
  )
}

export { LabeledInput, inputVariants as buttonVariants }
