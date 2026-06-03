"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BOOKING_FORM_ID,
  scrollToBookingForm,
} from "@/lib/booking-link";

function shouldScrollToBooking(): boolean {
  return window.location.hash.replace("#", "") === BOOKING_FORM_ID;
}

function queueScrollToBooking() {
  const run = () => {
    if (!shouldScrollToBooking()) return;
    scrollToBookingForm("smooth");
  };
  run();
  return [50, 150, 350, 700, 1100].map((ms) => setTimeout(run, ms));
}

export function BookingScrollToForm() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/contact") return;
    if (!shouldScrollToBooking()) return;

    const timers = queueScrollToBooking();
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash]);

  return null;
}
