"use client";

import { BookingLink } from "@/components/ui/BookingLink";
import styles from "./ServiceCard.module.css";

export type ServiceCardProps = {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  reason: string;
};

export default function ServiceCard({
  serviceId,
  serviceName,
  price,
  duration,
  reason,
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
      <BookingLink className={styles.cta}>Book This Ritual</BookingLink>
    </article>
  );
}
