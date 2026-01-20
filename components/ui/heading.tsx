import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export function H1({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h1"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h1";

  return <Comp className={cn("font-roboto text-4xl font-bold tracking-tight", className)} {...props} />
}

export function H2({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h2"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h2";

  return <Comp className={cn("font-roboto text-3xl font-bold tracking-tight", className)} {...props} />
}

export function H3({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h3"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h3";

  return <Comp className={cn("font-roboto text-2xl font-bold tracking-tight", className)} {...props} />
}

export function H4({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h4"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h4";

  return <Comp className={cn("font-roboto text-xl font-bold tracking-tight", className)} {...props} />
}

export function H5({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h5"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h5";

  return <Comp className={cn("font-roboto text-lg font-bold tracking-tight", className)} {...props} />
}

export function H6({
  className,
  asChild,
  ...props
}: React.ComponentProps<"h6"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "h6";

  return <Comp className={cn("font-roboto text-base font-bold tracking-tight", className)} {...props} />
}
