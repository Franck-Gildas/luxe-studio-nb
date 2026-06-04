"use client";

import type { MenuService } from "@/data/services-menu";

type MenuServiceItemProps = {
  service: MenuService;
  onShare: (service: MenuService) => void;
};

export default function MenuServiceItem({
  service,
  onShare,
}: MenuServiceItemProps) {
  return (
    <div className="service-item">
      <span className="name">
        <span className="en-only">{service.nameEn}</span>
        <span className="fr">{service.nameFr}</span>
        <span className="desc">
          <span className="en-only">{service.descEn}</span>
          <span className="fr-block">{service.descFr}</span>
        </span>
      </span>
      <span className="dur">{service.duration}</span>
      <span className="price">
        <span className="from">From</span>${service.price}
        {service.priceSuffix ? (
          <span className="price-suffix">{service.priceSuffix}</span>
        ) : null}
      </span>
      <div className="service-item-actions">
        <button
          type="button"
          className="share-ritual-btn"
          onClick={() => onShare(service)}
        >
          <span className="en-only">Share This Ritual</span>
          <span className="fr-block">Partager ce Rituel</span>
        </button>
      </div>
    </div>
  );
}
