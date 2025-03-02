import { ChildrenProps } from "@/@types/children-props";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

type SidebarItemProps = ChildrenProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    activeItem: boolean;
    valueItem: string;
    onClickItem: (value: string) => void;
  }

export function SidebarItem({
  children,
  className,
  activeItem,
  valueItem,
  onClickItem,
  ...rest
}: SidebarItemProps) {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded-lg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full flex items-center gap-1 font-heading text-sm font-medium -tracking-wider transition-colors",
        clsx('', { 
          'border border-slate-300 text-slate-600': !activeItem,
          'border border-slate-200 bg-slate-200 text-slate-800': activeItem
        }),
        className
      )}
      onClick={() => onClickItem(valueItem)}
      {...rest}
    >
      {children}
    </button>
  );
}
