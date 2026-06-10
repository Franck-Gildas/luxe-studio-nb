"use client";

import { BookingLink } from "@/components/ui/BookingLink";
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
      <BookingLink className={styles.cta} onClick={onBook ? () => onBook() : undefined}>Book This Ritual</BookingLink>
    </article>
  );
}
