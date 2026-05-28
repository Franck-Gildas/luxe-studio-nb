"use client";

import { usePathname } from "next/navigation";

/** Offset for fixed nav on non-home routes; home hero is full-bleed under nav. */
export function NavSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="nav-spacer" aria-hidden />;
}
