import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

function Hero({
  className,
  style,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="div"
      className={cn("hero", className)}
      {...props}
    >
      {props.children}
    </Comp>
  )
}

function HeroContent({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="div"
      className={cn("hero-content", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function HeroOverlay({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="div"
      className={cn("hero-overlay", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Hero, HeroContent, HeroOverlay }
