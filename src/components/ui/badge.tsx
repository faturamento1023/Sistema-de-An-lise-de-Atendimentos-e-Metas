import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary",
        secondary: "border-transparent bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100",
        outline: "border-primary/40 bg-transparent text-primary",
        success: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
        warning: "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
        destructive: "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
