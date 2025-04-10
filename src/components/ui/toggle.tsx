import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        neon: "bg-black/50 border border-neon-blue text-neon-blue shadow-neon-blue hover:shadow-neon-blue-hover hover:bg-black/70 data-[state=on]:bg-neon-blue/20 data-[state=on]:text-neon-blue",
        "neon-green": "bg-black/50 border border-neon-green text-neon-green shadow-neon-green hover:shadow-neon-green-hover hover:bg-black/70 data-[state=on]:bg-neon-green/20 data-[state=on]:text-neon-green",
        "neon-pink": "bg-black/50 border border-neon-pink text-neon-pink shadow-neon-pink hover:shadow-neon-pink-hover hover:bg-black/70 data-[state=on]:bg-neon-pink/20 data-[state=on]:text-neon-pink",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
