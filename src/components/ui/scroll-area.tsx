import * as React from "react";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/30",
        className,
      )}
      {...props}
    />
  ),
);
ScrollArea.displayName = "ScrollArea";

const ScrollViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("max-h-[420px] overflow-y-auto scrollbar-thin", className)} {...props} />
  ),
);
ScrollViewport.displayName = "ScrollViewport";

export { ScrollArea, ScrollViewport };
