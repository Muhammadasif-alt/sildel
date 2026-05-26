import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none",
    "text-xs uppercase tracking-[0.32em] font-medium",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // Solid black button — black bg, cream text, invert on hover.
        // Works in both themes because primary token tracks the ink colour
        // in light mode and stays ink-black in dark mode too.
        default:
          "bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground",
        outline:
          "border border-foreground/40 text-foreground hover:bg-foreground hover:text-background hover:border-foreground",
        ghost:
          "text-foreground hover:bg-foreground/10",
        link:
          "text-foreground underline-offset-[6px] hover:underline px-0",
        secondary:
          "bg-muted text-foreground border border-border hover:bg-foreground hover:text-background hover:border-foreground",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
