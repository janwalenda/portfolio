import { cva } from "class-variance-authority";

export const variant = cva("", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-content",
      secondary: "bg-secondary text-secondary-content",
      neutral: "bg-neutral text-neutral-content",
      accent: "bg-accent text-accent-content",
      info: "bg-info text-info-content",
      success: "bg-success text-success-content",
      warning: "bg-warning text-warning-content",
      error: "bg-error text-error-content",
      base: "bg-base-200 text-base-content",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});