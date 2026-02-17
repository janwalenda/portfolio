import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "",
        primary: "btn-primary",
        secondary: "btn-secondary",
        neutral: "btn-neutral",
        accent: "btn-accent",
        info: "btn-info",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
        ghost: "btn-ghost",
      },
      buttonStyle: {
        outline: "btn-outline",
        dash: "btn-dash",
        link: "btn-link",
        soft: "btn-soft",
        ghost: "btn-ghost",
      },
      behavior: {
        active: "btn-active",
        disabled: "btn-disabled",
      },
      size: {
        default: "btn-md",
        xs: "btn-xs",
        sm: "btn-sm",
        lg: "btn-lg",
        xl: "btn-xl",
        icon: "btn-square",
      },
      modifier: {
        wide: "btn-wide",
        block: "btn-block",
        square: "btn-square",
        circle: "btn-circle",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean,
}

function Button({
  className,
  variant,
  size,
  buttonStyle,
  behavior,
  modifier,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, behavior, modifier, buttonStyle, className }))}
      {...(props as React.ComponentProps<"button">)}
    >
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants, type ButtonProps }
