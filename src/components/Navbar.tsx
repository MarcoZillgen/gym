import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/src/lib/cn";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "header";

    return (
      <Comp
        ref={ref}
        className={cn("flex h-17.5 w-full items-center", className)}
        {...props}
      />
    );
  },
);

Navbar.displayName = "Navbar";
