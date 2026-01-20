import { cn } from "@/lib/utils";

export function H1({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return <h1 {...props} className={cn("font-roboto text-4xl font-bold tracking-tight", className)} />
}

export function H2({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return <h2 {...props} className={cn("font-roboto text-3xl font-bold tracking-tight", className)} />
}

export function H3({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return <h3 {...props} className={cn("font-roboto text-2xl font-bold tracking-tight", className)} />
}

export function H4({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return <h4 {...props} className={cn("font-roboto text-xl font-bold tracking-tight", className)} />
}

export function H5({
  className,
  ...props
}: React.ComponentProps<"h5">) {
  return <h5 {...props} className={cn("font-roboto text-lg font-bold tracking-tight", className)} />
}

export function H6({
  className,
  ...props
}: React.ComponentProps<"h6">) {
  return <h6 {...props} className={cn("font-roboto text-base font-bold tracking-tight", className)} />
}
