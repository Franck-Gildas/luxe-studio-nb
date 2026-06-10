"use client";

import { usePathname, useRouter } from "next/navigation";
import { BookingLink } from "@/components/ui/BookingLink";
import { BOOKING_FORM_HREF, scrollToBookingForm } from "@/lib/booking-link";
import styles from "./ServiceCard.module.css";

export type ServiceCardProps = {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  reason: string;
  onBook?: () => void;
};

export default function ServiceCard({
  serviceId,
  serviceName,
  price,
  duration,
  reason,
  onBook,
}: ServiceCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBook = () => {
    onBook?.();
    if (pathname === "/contact") {
      scrollToBookingForm("smooth");
    } else {
      router.push(BOOKING_FORM_HREF, { scroll: false });
      [180, 230, 380, 530, 880, 1300].forEach((ms) =>
        setTimeout(() => scrollToBookingForm("smooth"), ms),
      );
    }
  };

  return (
    <article
      className={styles.card}
      data-service-id={serviceId}
      aria-label={`Recommended service: ${serviceName}`}
    >
      <h4 className={styles.name}>{serviceName}</h4>
      <p className={styles.reason}>{reason}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>From ${price}</span>
        <span className={styles.metaItem}>{duration}</span>
      </div>
      {onBook ? (
        <button type="button" className={styles.cta} onClick={handleBook}>
          Book This Ritual
        </button>
      ) : (
        <BookingLink className={styles.cta}>Book This Ritual</BookingLink>
      )}
    </article>
  );
}
