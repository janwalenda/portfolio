import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function createHeading(tag: HeadingTag, baseClassName: string) {
  function Heading({
    className,
    asChild,
    ...props
  }: React.ComponentProps<HeadingTag> & {
    asChild?: boolean;
  }) {
    const Comp = asChild ? Slot : tag;

    return <Comp className={cn(baseClassName, className)} {...props} />;
  }

  Heading.displayName = tag.toUpperCase();

  return Heading;
}
