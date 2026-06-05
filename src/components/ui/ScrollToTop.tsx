"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BOOKING_FORM_ID } from "@/lib/booking-link";
import {
  isRitualCategorySlug,
  RITUAL_SCROLL_STORAGE_KEY,
} from "@/data/services-menu";

function shouldPreserveScroll(): boolean {
  const { pathname, hash, search } = window.location;

  if (pathname === "/contact" && hash.replace("#", "") === BOOKING_FORM_ID) {
    return true;
  }

  if (pathname === "/services") {
    const ritual = new URLSearchParams(search).get("ritual");
    if (ritual && isRitualCategorySlug(ritual)) return true;

    const stored = sessionStorage.getItem(RITUAL_SCROLL_STORAGE_KEY);
    if (stored && isRitualCategorySlug(stored)) return true;
  }

  return false;
}

export function ScrollToTop() {
  const pathname = usePathname();
  const isBackForward = useRef(false);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const onPopState = () => {
      isBackForward.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (isBackForward.current) {
      isBackForward.current = false;
      return;
    }

    if (shouldPreserveScroll()) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
