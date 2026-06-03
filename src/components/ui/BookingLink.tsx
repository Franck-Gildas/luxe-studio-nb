"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import {
  BOOKING_FORM_HREF,
  scrollToBookingForm,
} from "@/lib/booking-link";

type BookingLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: ComponentProps<typeof Link>["href"];
};

function queueScrollToBooking() {
  const run = () => scrollToBookingForm("smooth");
  run();
  [50, 150, 350, 700, 1100].forEach((ms) => setTimeout(run, ms));
}

/** Navigates to /contact#booking and smooth-scrolls to the booking form. */
export function BookingLink({
  href = BOOKING_FORM_HREF,
  onClick,
  ...props
}: BookingLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    router.push(BOOKING_FORM_HREF, { scroll: false });
    queueScrollToBooking();
  };

  return (
    <Link href={href} onClick={handleClick} scroll={false} {...props} />
  );
}
