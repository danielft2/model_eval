"use client";

import { usePathname } from "next/navigation";
import { Menu } from "./menu";

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="space-x-3 transform -translate-x-1/2">
      <Menu href="/workspace/work" activePath={pathname.includes("/work")}>Seu Trabalho</Menu>
    </div>
  );
}
