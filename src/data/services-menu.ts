export type RitualCategorySlug =
  | "haircare"
  | "barbering"
  | "nails"
  | "lashes"
  | "skincare"
  | "spa";

export type SectionId = "hair" | "barber" | "nail" | "lash" | "face" | "spa";

export type MenuService = {
  serviceId: RitualCategorySlug;
  sectionId: SectionId;
  nameEn: string;
  nameFr: string;
  descEn: string;
  descFr: string;
  duration: string;
  price: number;
  priceSuffix?: string;
};

export const RITUAL_CATEGORY_SLUGS: RitualCategorySlug[] = [
  "haircare",
  "barbering",
  "nails",
  "lashes",
  "skincare",
  "spa",
];

export const SECTION_TO_SLUG: Record<SectionId, RitualCategorySlug> = {
  hair: "haircare",
  barber: "barbering",
  nail: "nails",
  lash: "lashes",
  face: "skincare",
  spa: "spa",
};

export const SLUG_TO_SECTION: Record<RitualCategorySlug, SectionId> = {
  haircare: "hair",
  barbering: "barber",
  nails: "nail",
  lashes: "lash",
  skincare: "face",
  spa: "spa",
};

export const RITUAL_SCROLL_STORAGE_KEY = "luxe-ritual-scroll";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxe-studio-nb.vercel.app";

/** QR + share links — query param works on static /services (no dynamic route required). */
export function getRitualDeepLinkUrl(serviceId: RitualCategorySlug): string {
  return `${SITE_ORIGIN}/services?ritual=${serviceId}`;
}

export function isRitualCategorySlug(
  value: string
): value is RitualCategorySlug {
  return (RITUAL_CATEGORY_SLUGS as string[]).includes(value);
}

export function getTagline(description: string, maxLen = 60): string {
  const trimmed = description.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]?/);
  const first = (match ? match[0] : trimmed).trim();
  if (first.length <= maxLen) return first;
  return `${first.slice(0, maxLen - 1).trim()}…`;
}

export type Lang = "en" | "fr";

export function getDisplayName(service: MenuService, lang: Lang): string {
  return lang === "fr" ? service.nameFr : service.nameEn;
}

export function getDisplayDescription(service: MenuService, lang: Lang): string {
  return lang === "fr" ? service.descFr : service.descEn;
}

const hairServices: MenuService[] = [
  {
    serviceId: "haircare",
    sectionId: "hair",
    nameEn: "The Signature Cut",
    nameFr: "La coupe maison",
    descEn:
      "Consultation, wash, scalp massage, dry-finished cut, in-chair coffee.",
    descFr:
      "Consultation, lavage, massage du cuir chevelu, coupe finie à sec, café au fauteuil.",
    duration: "1h30",
    price: 185,
  },
  {
    serviceId: "haircare",
    sectionId: "hair",
    nameEn: "Slow Colour, Single Process",
    nameFr: "Couleur lente, un procédé",
    descEn:
      "Mixed at the chair, applied in layers, bond therapy at every wash.",
    descFr:
      "Mélangé au fauteuil, appliqué en couches, thérapie de liaison à chaque lavage.",
    duration: "2h30",
    price: 225,
  },
  {
    serviceId: "haircare",
    sectionId: "hair",
    nameEn: "Dimensional Highlights",
    nameFr: "Balayage dimensionnel",
    descEn:
      "Hand-painted, free-hand. Veil-fine for first-timers, dense for the return guest.",
    descFr:
      "Peint à la main, libre. Voile fin pour les premières fois, dense pour l'invité de retour.",
    duration: "3h30",
    price: 345,
  },
  {
    serviceId: "haircare",
    sectionId: "hair",
    nameEn: "The Restoration",
    nameFr: "La restauration",
    descEn:
      "Three-stage Olaplex with steam, glaze, and a heavy mask. For hair that's been through it.",
    descFr:
      "Olaplex en trois étapes avec vapeur, glaze et masque lourd. Pour les cheveux qui ont tout vécu.",
    duration: "1h45",
    price: 165,
  },
  {
    serviceId: "haircare",
    sectionId: "hair",
    nameEn: "Bridal — The Morning Of",
    nameFr: "Le matin du mariage",
    descEn:
      "Style consultation, on-site or in-room. Includes touch-up kit + a quiet champagne.",
    descFr:
      "Consultation de style, sur place ou en salle. Comprend trousse de retouche + un champagne discret.",
    duration: "3h",
    price: 420,
  },
];

const barberServices: MenuService[] = [
  {
    serviceId: "barbering",
    sectionId: "barber",
    nameEn: "The Saturday Cut",
    nameFr: "La coupe du samedi",
    descEn:
      "Scissor over comb, dry-checked, finished with a hot towel and cedar after-balm.",
    descFr:
      "Ciseaux sur peigne, vérifié à sec, fini à la serviette chaude et au baume après-rasage au cèdre.",
    duration: "1h15",
    price: 95,
  },
  {
    serviceId: "barbering",
    sectionId: "barber",
    nameEn: "Beard Architecture",
    nameFr: "L'architecture du visage",
    descEn: "Hand-shaped with straight razor, balm-conditioned, finished with cedar.",
    descFr: "Façonné à la main au rasoir droit, conditionné au baume, fini au cèdre.",
    duration: "45 min",
    price: 65,
  },
  {
    serviceId: "barbering",
    sectionId: "barber",
    nameEn: "Hot-Towel Royal Shave",
    nameFr: "Rasage royal",
    descEn:
      "Three hot towels, two passes, balm-and-balm finish. The Saturday morning fix.",
    descFr:
      "Trois serviettes chaudes, deux passages, finition baume sur baume. Le rituel du samedi matin.",
    duration: "1h",
    price: 110,
  },
  {
    serviceId: "barbering",
    sectionId: "barber",
    nameEn: "Father & Son",
    nameFr: "Père et fils",
    descEn:
      "Two chairs, two cuts, one quiet hour. For the boy whose first chair is yours.",
    descFr:
      "Deux fauteuils, deux coupes, une heure feutrée. Pour le garçon dont le premier fauteuil est le vôtre.",
    duration: "1h30",
    price: 155,
  },
];

const nailServices: MenuService[] = [
  {
    serviceId: "nails",
    sectionId: "nail",
    nameEn: "The Couture Manicure",
    nameFr: "La manucure couture",
    descEn:
      "Cuticle work, hand & arm massage, builder-gel polish or BIAB structure.",
    descFr:
      "Travail des cuticules, massage des mains et des bras, vernis au gel de construction ou structure BIAB.",
    duration: "1h30",
    price: 110,
  },
  {
    serviceId: "nails",
    sectionId: "nail",
    nameEn: "Sculpted Set, Custom Form",
    nameFr: "Ongles sculptés sur mesure",
    descEn:
      "Free-hand from gel, sanded and shaped by eye. Custom inlays on request.",
    descFr:
      "Main libre au gel, poncé et façonné à l'œil. Incrustations sur mesure sur demande.",
    duration: "2h30",
    price: 185,
  },
  {
    serviceId: "nails",
    sectionId: "nail",
    nameEn: "Pedicure, Slow",
    nameFr: "Pédicure lente",
    descEn: "Salt soak, callus work, paraffin wrap, hot stone foot massage.",
    descFr:
      "Trempage au sel, travail des callosités, enveloppement à la paraffine, massage des pieds aux pierres chaudes.",
    duration: "1h45",
    price: 135,
  },
  {
    serviceId: "nails",
    sectionId: "nail",
    nameEn: "Gold-leaf Inlay",
    nameFr: "Feuille d'or, à la main",
    descEn: "Hand-laid 24k leaf, sealed under top coat. Sold by the digit.",
    descFr:
      "Feuille d'or 24 carats posée à la main, scellée sous couche de finition. Vendue à l'unité.",
    duration: "30 min",
    price: 28,
    priceSuffix: "/nail",
  },
];

const lashServices: MenuService[] = [
  {
    serviceId: "lashes",
    sectionId: "lash",
    nameEn: "Classic Lash Set",
    nameFr: "Pose classique",
    descEn: "One-to-one, hand-mapped per eye. Veil-soft, holds three weeks.",
    descFr:
      "Un à un, cartographié à la main par œil. Doux comme un voile, tient trois semaines.",
    duration: "2h",
    price: 185,
  },
  {
    serviceId: "lashes",
    sectionId: "lash",
    nameEn: "Volume Set, Russian",
    nameFr: "Volume russe",
    descEn:
      "Fan-built at the chair, 2D–6D depending on natural lash. Editorial finish.",
    descFr:
      "Volume en éventail au fauteuil, 2D–6D selon le cil naturel. Finition éditoriale.",
    duration: "2h30",
    price: 245,
  },
  {
    serviceId: "lashes",
    sectionId: "lash",
    nameEn: "Lash Lift & Tint",
    nameFr: "Rehaussement & teinture",
    descEn:
      "Keratin lift, six-week hold. The morning-after look, without effort.",
    descFr:
      "Rehaussement à la kératine, tenue de six semaines. Le regard du lendemain matin, sans effort.",
    duration: "1h15",
    price: 140,
  },
  {
    serviceId: "lashes",
    sectionId: "lash",
    nameEn: "Brow Lamination & Shape",
    nameFr: "Lamination des sourcils",
    descEn: "Set, tint, hand-shape, finish. The brow you wake up wanting.",
    descFr:
      "Pose, teinture, façonnage à la main, finition. Le sourcil dont vous vous réveillez en rêvant.",
    duration: "1h",
    price: 125,
  },
];

const skincareServices: MenuService[] = [
  {
    serviceId: "skincare",
    sectionId: "face",
    nameEn: "The Signature HydraFacial",
    nameFr: "L'HydraFacial signature",
    descEn: "Cleanse, extract, hydrate, plump. Sixty quiet minutes, no needles.",
    descFr:
      "Nettoyer, extraire, hydrater, repulper. Soixante minutes feutrées, sans aiguilles.",
    duration: "1h15",
    price: 215,
  },
  {
    serviceId: "skincare",
    sectionId: "face",
    nameEn: "Dermaplane & Glow",
    nameFr: "Dermaplane & éclat",
    descEn:
      "Scalpel-fine exfoliation, vitamin-C infusion, ten minutes of cryo-globe.",
    descFr:
      "Exfoliation fine au scalpel, infusion de vitamine C, dix minutes de globe cryogénique.",
    duration: "1h",
    price: 165,
  },
  {
    serviceId: "skincare",
    sectionId: "face",
    nameEn: "Retinol-Sequenced Peel",
    nameFr: "Peeling à séquence",
    descEn:
      "A four-week course of light peels, sequenced to your skin's cadence.",
    descFr:
      "Un parcours de quatre semaines de peelings légers, séquencés au rythme de votre peau.",
    duration: "1h30",
    price: 295,
  },
  {
    serviceId: "skincare",
    sectionId: "face",
    nameEn: "LED & Lymphatic, Quiet",
    nameFr: "LED & drainage",
    descEn:
      "Red-light canopy with manual lymphatic drainage. Pure recovery, no extractions.",
    descFr:
      "Canopée à lumière rouge avec drainage lymphatique manuel. Récupération pure, sans extractions.",
    duration: "1h45",
    price: 245,
  },
];

const spaServices: MenuService[] = [
  {
    serviceId: "spa",
    sectionId: "spa",
    nameEn: "The Long Bath",
    nameFr: "Le long bain",
    descEn:
      "Eucalyptus steam, hot stone, scalp ritual, herbal infusion to finish.",
    descFr:
      "Vapeur d'eucalyptus, pierre chaude, rituel du cuir chevelu, infusion aux herbes pour finir.",
    duration: "2h",
    price: 245,
  },
  {
    serviceId: "spa",
    sectionId: "spa",
    nameEn: "Lymphatic Drainage",
    nameFr: "Drainage lymphatique",
    descEn: "Full-body manual technique. Two cushions, low light, a long exhale.",
    descFr:
      "Technique manuelle du corps entier. Deux coussins, lumière basse, une longue expiration.",
    duration: "1h30",
    price: 195,
  },
  {
    serviceId: "spa",
    sectionId: "spa",
    nameEn: "The Reset Massage",
    nameFr: "Massage de remise",
    descEn:
      "Deep-tissue, by request only firmer. The end-of-week prescription.",
    descFr:
      "Tissus profonds, sur demande seulement plus ferme. La prescription de fin de semaine.",
    duration: "1h30",
    price: 175,
  },
  {
    serviceId: "spa",
    sectionId: "spa",
    nameEn: "Body Contour & Glow",
    nameFr: "Contour & éclat",
    descEn: "Dry-brush, vacuum massage, body oil ritual. Visible, gradual, gentle.",
    descFr:
      "Brossage à sec, massage par aspiration, rituel d'huile corporelle. Visible, graduel, doux.",
    duration: "1h45",
    price: 285,
  },
  {
    serviceId: "spa",
    sectionId: "spa",
    nameEn: "Two-Person Ritual",
    nameFr: "Le rituel à deux",
    descEn:
      "Twin beds, two therapists, side by side. For the visit you take together.",
    descFr:
      "Lits jumeaux, deux thérapeutes, côte à côte. Pour la visite que vous partagez.",
    duration: "2h",
    price: 485,
  },
];

export const MENU_BY_SECTION: Record<SectionId, MenuService[]> = {
  hair: hairServices,
  barber: barberServices,
  nail: nailServices,
  lash: lashServices,
  face: skincareServices,
  spa: spaServices,
};
