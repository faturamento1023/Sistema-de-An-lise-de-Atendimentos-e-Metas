import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  imageUrl?: string;
}

export function Avatar({ name, imageUrl, className, ...props }: AvatarProps) {
  const initials = React.useMemo(
    () =>
      name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    [name],
  );

  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary",
        className,
      )}
      {...props}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
