import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type FooterProps = React.ComponentProps<"footer"> & {
  asChild?: boolean
}

export function Footer({ asChild, children, className, ...props }: FooterProps) {
  const Comp = asChild ? Slot : "footer"
  return (
    <Comp className={cn("footer sm:footer-horizontal bg-neutral text-neutral-content p-10", className)} {...props}>
      {children}
    </Comp>
  )
}

type FooterColumnProps = React.ComponentProps<'nav'> & {
  title: string
}

export function FooterColumn({ children, className, title, ...props }: FooterColumnProps) {
  return (
    <nav className={cn("footer-column", className)} {...props}>
      <h6 className="footer-title">{title}</h6>
      {children}
    </nav>
  )
}