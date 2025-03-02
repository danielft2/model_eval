'use client'

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

type MenuProps = LinkProps & {
  activePath?: boolean,
  children: Readonly<React.ReactNode>
}

export function Menu({ children, activePath = false, ...rest }: MenuProps) {
  return (
    <Link
      className={cn(
        "p-1 relative text-sm font-medium font-heading -tracking-wide text-slate-500 hover:text-brand-700 transition-colors",
        {
          "text-brand-800 hover:text-brand-700": activePath,
          "before:bg-brand-700 before:h-[3px] before:w-full before:content[''] before:absolute before:-bottom-[14px] before:rounded-full before:right-0":
            activePath,
        }
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
