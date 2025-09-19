import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border border-slate-300 text-primary transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            className,
          )}
          {...props}
        />
        {label && <span className="select-none leading-none">{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
