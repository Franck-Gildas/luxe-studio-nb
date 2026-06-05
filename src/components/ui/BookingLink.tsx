"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import {
  BOOKING_FORM_HREF,
  BOOKING_FORM_ID,
  scrollToBookingForm,
} from "@/lib/booking-link";

type BookingLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: ComponentProps<typeof Link>["href"];
};

function setBookingHash() {
  const next = `#${BOOKING_FORM_ID}`;
  if (window.location.hash !== next) {
    window.history.pushState(null, "", `/contact${next}`);
  }
}

function queueScrollToBooking(delayMs = 0) {
  const run = () => scrollToBookingForm("smooth");
  if (delayMs > 0) {
    setTimeout(run, delayMs);
  } else {
    run();
  }
  [50, 150, 350, 700, 1100, 1600].forEach((ms) =>
    setTimeout(run, delayMs + ms),
  );
}

/** Navigates to /contact#booking and smooth-scrolls to the booking form. */
export function BookingLink({
  href = BOOKING_FORM_HREF,
  onClick,
  ...props
}: BookingLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();

    const onContact = pathname === "/contact";

    if (onContact) {
      setBookingHash();
      // Defer until mobile menu unlocks body scroll (overflow: hidden).
      queueScrollToBooking(60);
      return;
    }

    router.push(BOOKING_FORM_HREF, { scroll: false });
    queueScrollToBooking(180);
  };

  return (
    <Link href={href} onClick={handleClick} scroll={false} {...props} />
  );
}
