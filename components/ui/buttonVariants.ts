import { cva } from "class-variance-authority";

export const buttonVariants = cva("btn", {
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
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
