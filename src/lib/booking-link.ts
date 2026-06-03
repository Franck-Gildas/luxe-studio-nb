export const BOOKING_FORM_ID = "booking";
export const BOOKING_FORM_HREF = `/contact#${BOOKING_FORM_ID}` as const;

/** Offset for fixed nav when scrolling to the booking form */
export const BOOKING_SCROLL_OFFSET = 96;

export function scrollToBookingForm(
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(BOOKING_FORM_ID);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    BOOKING_SCROLL_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
