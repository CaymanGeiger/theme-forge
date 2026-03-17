import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-[border-color,box-shadow,background-color] outline-none placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-200/70",
        className,
      )}
      {...props}
    />
  );
}
