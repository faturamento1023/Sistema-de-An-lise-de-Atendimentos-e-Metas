import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border border-white/40 bg-white/60 px-3 py-2 text-sm shadow-sm transition-colors duration-200 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
