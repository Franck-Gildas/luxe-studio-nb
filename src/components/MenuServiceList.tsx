"use client";

import type { MenuService } from "@/data/services-menu";
import MenuServiceItem from "@/components/MenuServiceItem";

type MenuServiceListProps = {
  services: MenuService[];
  onShare: (service: MenuService) => void;
};

export default function MenuServiceList({
  services,
  onShare,
}: MenuServiceListProps) {
  return (
    <div className="service-list">
      {services.map((service) => (
        <MenuServiceItem
          key={`${service.sectionId}-${service.nameEn}`}
          service={service}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
