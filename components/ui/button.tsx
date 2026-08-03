import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./buttonVariants";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

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
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          behavior,
          modifier,
          buttonStyle,
          className,
        }),
      )}
      {...(props as React.ComponentProps<"button">)}
    >
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
