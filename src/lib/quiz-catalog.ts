export type ServiceId =
  | "hair"
  | "barber"
  | "nail"
  | "lash"
  | "skin"
  | "wellness";

export type QuizRecommendation = {
  service: string;
  serviceId: ServiceId;
  tagline: string;
  description: string;
  addons: string[];
  addonReason: string;
};

export const SERVICE_PRICES: Record<ServiceId, number> = {
  hair: 185,
  barber: 95,
  nail: 110,
  lash: 140,
  skin: 215,
  wellness: 245,
};

export const ADDON_PRICES: Record<string, number> = {
  "Scalp treatment": 30,
  "Brow tint": 20,
  Aromatherapy: 15,
  "House Élixir treatment": 45,
  "Extended consultation": 25,
  "Soin du cuir chevelu": 30,
  "Teinture des sourcils": 20,
  Aromathérapie: 15,
  "Traitement Élixir maison": 45,
  "Consultation prolongée": 25,
};

const SERVICE_IDS: ServiceId[] = [
  "hair",
  "barber",
  "nail",
  "lash",
  "skin",
  "wellness",
];

export function isServiceId(value: unknown): value is ServiceId {
  return (
    typeof value === "string" &&
    (SERVICE_IDS as string[]).includes(value)
  );
}

export function getAddonPrice(name: string): number {
  return ADDON_PRICES[name] ?? 0;
}

export function calculateTotal(
  serviceId: ServiceId,
  addons: string[]
): number {
  const base = SERVICE_PRICES[serviceId] ?? 0;
  const addonSum = addons.reduce(
    (sum, name) => sum + getAddonPrice(name),
    0
  );
  return base + addonSum;
}
