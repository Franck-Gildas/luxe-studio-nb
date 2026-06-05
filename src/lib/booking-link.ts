export const BOOKING_FORM_ID = "booking";
export const BOOKING_FORM_HREF = `/contact#${BOOKING_FORM_ID}` as const;

/** Offset for fixed nav when scrolling to the booking form */
export const BOOKING_SCROLL_OFFSET = 96;

function getScrollOffset(): number {
  if (typeof window === "undefined") return BOOKING_SCROLL_OFFSET;
  return window.matchMedia("(max-width: 768px)").matches ? 120 : BOOKING_SCROLL_OFFSET;
}

export function scrollToBookingForm(
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(BOOKING_FORM_ID);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    getScrollOffset();

  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
