"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/work.css";
import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/ui/BookingLink";

type Category = "all" | "hair" | "barber" | "nail" | "lash" | "spa" | "face";
type FilterCategory = Exclude<Category, "all">;

const FILTERS: { cat: Category; label: React.ReactNode }[] = [
  { cat: "all", label: <><span className="en-only">All</span><span className="fr">Tout</span></> },
  { cat: "hair", label: <><span className="en-only">Hair</span><span className="fr">Cheveux</span></> },
  { cat: "barber", label: <><span className="en-only">Barber</span><span className="fr">Barbier</span></> },
  { cat: "nail", label: <><span className="en-only">Nails</span><span className="fr">Ongles</span></> },
  { cat: "lash", label: <><span className="en-only">Lash & Brow</span><span className="fr">Cils</span></> },
  { cat: "spa", label: <><span className="en-only">Spa</span><span className="fr">Bien-être</span></> },
  { cat: "face", label: <><span className="en-only">Esthetics</span><span className="fr">Esthétique</span></> },
];

const GALLERY_TILES = [
  {
    size: "tile-lg",
    cat: "hair" as const,
    src: "/img/hair-5.jpg",
    alt: "Hair",
    num: "N° 01",
    top: "◇ Hair · Cheveux",
    title: "The slow lift",
    fr: "Le lent éclaircissement",
  },
  {
    size: "tile-sm",
    cat: "nail" as const,
    src: "/img/nails-1.jpg",
    alt: "Nails",
    num: "N° 02",
    top: "◇ Nails · Ongles",
    title: "Almond, almost ivory",
    fr: "Amande, presque ivoire",
  },
  {
    size: "tile-sm",
    cat: "lash" as const,
    src: "/img/lash-4.jpg",
    alt: "Lash",
    num: "N° 03",
    top: "◇ Lash",
    title: "Doll lash",
    fr: "Cils-poupée",
  },
  {
    size: "tile-lg",
    cat: "barber" as const,
    src: "/img/barber-3.jpg",
    alt: "Barber",
    num: "N° 04",
    top: "◇ Barber · Barbier",
    title: "Side-part, ungelled",
    fr: "Raie, sans gel",
  },
  {
    size: "tile-sm",
    cat: "spa" as const,
    src: "/img/massage-2.jpg",
    alt: "Massage",
    num: "N° 05",
    top: "◇ Spa",
    title: "Heated stone",
    fr: "Pierre chaude",
  },
  {
    size: "tile-sm",
    cat: "hair" as const,
    src: "/img/hair-4.jpg",
    alt: "Hair",
    num: "N° 06",
    top: "◇ Hair · Cheveux",
    title: "Cinnamon undone",
    fr: "Cannelle dénouée",
  },
  {
    size: "tile-lg",
    cat: "face" as const,
    src: "/img/face-1.jpg",
    alt: "Face",
    num: "N° 07",
    top: "◇ Esthetics",
    title: "Skin, post-LED",
    fr: "Peau, post-LED",
  },
  {
    size: "tile-sm",
    cat: "nail" as const,
    src: "/img/nails-4.jpg",
    alt: "Nails",
    num: "N° 08",
    top: "◇ Nails · Ongles",
    title: "Inlay, gold leaf",
    fr: "Feuille d'or",
  },
  {
    size: "tile-sm",
    cat: "spa" as const,
    src: "/img/spa-4.jpg",
    alt: "Spa",
    num: "N° 09",
    top: "◇ Spa",
    title: "The long bath",
    fr: "Le long bain",
  },
  {
    size: "tile-lg",
    cat: "barber" as const,
    src: "/img/barber-2.jpg",
    alt: "Beard",
    num: "N° 10",
    top: "◇ Barber · Barbier",
    title: "The shape, by hand",
    fr: "La ligne, à la main",
  },
  {
    size: "tile-sm",
    cat: "hair" as const,
    src: "/img/hair-2.jpg",
    alt: "Hair",
    num: "N° 11",
    top: "◇ Hair · Cheveux",
    title: "Warm honey gloss",
    fr: "Glaçage miel",
  },
  {
    size: "tile-sm",
    cat: "lash" as const,
    src: "/img/lash-2.jpg",
    alt: "Lash",
    num: "N° 12",
    top: "◇ Lash · Cils",
    title: "Hand-mapped, soft",
    fr: "Tracé à la main",
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const baSectionRef = useRef<HTMLElement>(null);

  const isVisible = (cat: FilterCategory) =>
    activeFilter === "all" || activeFilter === cat;

  useEffect(() => {
    const frames = baSectionRef.current?.querySelectorAll<HTMLElement>("[data-ba]");
    if (!frames) return;

    const cleanups: (() => void)[] = [];

    frames.forEach((frame) => {
      const initial = parseFloat(frame.dataset.clip || "50");
      const update = (pct: number) => {
        const clamped = Math.max(2, Math.min(98, pct));
        frame.style.setProperty("--clip", clamped + "%");
        frame.style.setProperty("--clip-rev", 100 - clamped + "%");
      };
      update(initial);

      let dragging = false;
      const move = (clientX: number) => {
        const rect = frame.getBoundingClientRect();
        update(((clientX - rect.left) / rect.width) * 100);
      };

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        frame.setPointerCapture(e.pointerId);
        move(e.clientX);
      };
      const onPointerMove = (e: PointerEvent) => {
        if (dragging) move(e.clientX);
      };
      const onPointerUp = () => {
        dragging = false;
      };

      frame.addEventListener("pointerdown", onPointerDown);
      frame.addEventListener("pointermove", onPointerMove);
      frame.addEventListener("pointerup", onPointerUp);
      frame.addEventListener("pointercancel", onPointerUp);

      cleanups.push(() => {
        frame.removeEventListener("pointerdown", onPointerDown);
        frame.removeEventListener("pointermove", onPointerMove);
        frame.removeEventListener("pointerup", onPointerUp);
        frame.removeEventListener("pointercancel", onPointerUp);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="grain"></div>

      {/* PAGE HERO */}
      <section className="work-hero" data-screen-label="01 Work Hero">
        <div className="work-hero-inner">
          <div className="work-hero-meta">
            <span>
              <span className="v">◇ La vitrine</span> · From the chair
            </span>
            <span>
              Page <span className="v">02 / 06</span>
            </span>
          </div>

          <h1 data-reveal>
            <span className="en-only">Transformations</span>
            <span className="fr-block">Métamorphoses</span>
          </h1>
          <p className="hero-tagline">
            <span className="en-only">From the chair, in silence.</span>
            <span className="fr-block">Du fauteuil, en silence.</span>
          </p>

          <div className="work-hero-blurb">
            <p><span className="en-only"><strong>Each frame below was made at the chair</strong> — late afternoon, north light, no retouching. We photograph at the end of every ritual; the guest decides if it joins the vitrine.</span>
<span className="fr-block">Chaque image ci-dessous a été faite au fauteuil — fin d’après-midi, lumière du nord, sans retouche. Nous photographions à la fin de chaque rituel ; l’invité décide si elle rejoint la vitrine.</span></p>
            <p><span className="en-only">Slide the gold handle on a reveal to see the before.{" "}
              <em className="italic" style={{ color: "var(--rose)" }}>
                Faites glisser pour voir l&apos;avant — puis lisez la suite.
              </em></span>
<span className="fr-block">Faites glisser la poignée dorée du volet pour découvrir l’avant. Faites glisser pour voir l’avant — puis lisez la suite.</span></p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="ba-section" data-screen-label="03 Before After" ref={baSectionRef}>
        <div className="ba-list">
          <div className="ba-row">
            <div className="ba-side" data-reveal-left>
              <div className="idx">◇ Reveal 01 / 03 · Hair</div>
              <h3 data-reveal>
                <span className="en-only">Élise — Slow colour, three sittings</span>
                <span className="fr-block">Élise — Couleur lente, trois séances</span>
              </h3>
              <div className="sub">Hair ritual · 6 hours over 3 visits</div>
              <p><span className="en-only">Eight years of box dye, unwound in three sittings. A bone-blonde lifted in low concentration with bond therapy at every wash, then re-warmed with the lightest hand of amber gloss. The fringe was kept; everything else was forgiven.</span>
<span className="fr-block">Huit ans de coloration en boîte, défaits en trois séances. Un blond osé éclairci à faible concentration avec thérapie de liaison à chaque lavage, puis réchauffé de la main la plus légère d’un gloss ambré. La frange a été conservée ; tout le reste a été pardonné.</span></p>
              <div className="ba-tags">
                <span className="ba-tag gold">Colour</span>
                <span className="ba-tag">Olaplex</span>
                <span className="ba-tag">Treatment</span>
                <span className="ba-tag">Cut</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="55" data-reveal-scale>
              <div className="ba-pane before">
                <Image src="/img/hair-3.jpg" alt="Before" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-pane after">
                <Image src="/img/hair-1.jpg" alt="After" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-label before">
                <span className="dot"></span>Avant · Before
              </div>
              <div className="ba-label after">
                <span className="dot"></span>Après · After
              </div>
              <div className="ba-handle"></div>
            </div>
          </div>

          <div className="ba-row flip">
            <div className="ba-side" data-reveal-right>
              <div className="idx">◇ Reveal 02 / 03 · Barber</div>
              <h3 data-reveal>
                <span className="en-only">Marc — The Saturday cut</span>
                <span className="fr-block">Marc — La coupe du samedi</span>
              </h3>
              <div className="sub">Atelier du barbier · 1h30</div>
              <p><span className="en-only">A scissor cut taken low and tight, beard sculpted with a straight razor under hot towel. No clipper above the temple. Cedar after-balm, a finger of single malt, the kind of quiet that doesn&apos;t apologise for itself.</span>
<span className="fr-block">Une coupe aux ciseaux prise bas et serrée, barbe sculptée au rasoir droit sous serviette chaude. Pas de tondeuse au-dessus de la tempe. Baume après-rasage au cèdre, un doigt de single malt, le genre de silence qui ne s’excuse pas.</span></p>
              <div className="ba-tags">
                <span className="ba-tag gold">Hot towel</span>
                <span className="ba-tag">Straight razor</span>
                <span className="ba-tag">Beard</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="42" data-reveal-scale>
              <div className="ba-pane before">
                <Image src="/img/barber-4.jpg" alt="Before" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-pane after">
                <Image src="/img/barber-2.jpg" alt="After" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-label before">
                <span className="dot"></span>Avant · Before
              </div>
              <div className="ba-label after">
                <span className="dot"></span>Après · After
              </div>
              <div className="ba-handle"></div>
            </div>
          </div>

          <div className="ba-row">
            <div className="ba-side" data-reveal-left>
              <div className="idx">◇ Reveal 03 / 03 · Skin</div>
              <h3 data-reveal>
                <span className="en-only">Renée — Ninety minutes of skin</span>
                <span className="fr-block">Renée — Quatre-vingt-dix minutes de peau</span>
              </h3>
              <div className="sub">Esthetics · HydraFacial & LED</div>
              <p><span className="en-only">A two-part HydraFacial, dermaplaning at the brow line, then a quiet half-hour under red light. The skin was first read — sebum, hydration, the small map of the week — and only then approached. The glow holds for two weeks; the routine that follows for longer.</span>
<span className="fr-block">Un HydraFacial en deux parties, dermaplaning à la ligne des sourcils, puis une demi-heure feutrée sous lumière rouge. La peau a d’abord été lue — sébum, hydratation, la petite carte de la semaine — et seulement ensuite abordée. L’éclat tient deux semaines ; la routine qui suit, plus longtemps.</span></p>
              <div className="ba-tags">
                <span className="ba-tag gold">HydraFacial</span>
                <span className="ba-tag">LED</span>
                <span className="ba-tag">Dermaplane</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="50" data-reveal-scale>
              <div className="ba-pane before">
                <Image src="/img/face-2.jpg" alt="Before" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-pane after">
                <Image src="/img/face-1.jpg" alt="After" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 60vw" />
              </div>
              <div className="ba-label before">
                <span className="dot"></span>Avant · Before
              </div>
              <div className="ba-label after">
                <span className="dot"></span>Après · After
              </div>
              <div className="ba-handle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="filter-strip" data-screen-label="02 Filters">
        {FILTERS.map(({ cat, label }) => (
          <button
            key={cat}
            type="button"
            className={`filter${activeFilter === cat ? " on" : ""}`}
            data-cat={cat}
            onClick={() => setActiveFilter(cat)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* EDITORIAL VITRINE */}
      <section className="vitrine" data-screen-label="04 Vitrine">
        <div className="vitrine-inner">
          <div className="section-head">
            <div className="num">
              § 02 — La vitrine
              <br />
              Editorial
            </div>
            <h2 data-reveal>
              <span className="en-only">
                Six rituals, six rooms,
                <br />
                one careful afternoon.
              </span>
              <span className="fr-block">
                Six rituels, six salles,
                <br />
                un après-midi attentif.
              </span>
            </h2>
          </div>

          <div
            className="vitrine-row"
            data-reveal-scale
            data-cat="hair"
            style={!isVisible("hair") ? { display: "none" } : undefined}
          >
            <div className="big tonal warm">
              <Image src="/img/hair-2.jpg" alt="Hair ritual" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
            <div className="mid tonal">
              <Image src="/img/hair-4.jpg" alt="Hair detail" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="copy">
              <div className="idx">N° 01 · Hair · Cheveux</div>
              <h3>
                <span className="en-only">Signature Hair Rituals</span>
                <span className="fr">Le rituel des cheveux</span>
              </h3>
              <p><span className="en-only">Slow colour, custom dimensional work, and Olaplex-led repair — performed by senior stylists who treat your head of hair like an heirloom.</span>
<span className="fr-block">Couleur lente, travail dimensionnel sur mesure et réparation guidée par Olaplex — exécutés par des stylistes seniors qui traitent votre chevelure comme un héritage.</span></p>
              <div className="credits">
                <span className="v">◇ Stylist</span> Émilie D.
                <br />
                <span className="v">◇ Light</span> North window, 17:42
                <br />
                <span className="v">◇ Hour</span> 2h30 — 4h
              </div>
            </div>
          </div>

          <div
            className="vitrine-row flip"
            data-reveal-scale
            data-cat="barber"
            style={!isVisible("barber") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 02 · Barber · Barbier</div>
              <h3>
                <span className="en-only">The Barbering Atelier</span>
                <span className="fr">L&apos;atelier du barbier</span>
              </h3>
              <p><span className="en-only">Hot-towel shaves, beard architecture, and the cut your grandfather used to take an hour to get right — straight razor, cedar after-balm, a tumbler of something dark.</span>
<span className="fr-block">Rasages à serviette chaude, architecture de barbe et la coupe qu’un grand-père prenait une heure à parfaire — rasoir droit, baume après-rasage au cèdre et un verre de quelque chose de sombre.</span></p>
              <div className="credits">
                <span className="v">◇ Barbier</span> Jean-Luc A.
                <br />
                <span className="v">◇ Tools</span> Straight razor, hot towel
                <br />
                <span className="v">◇ Hour</span> 1h15
              </div>
            </div>
            <div className="mid tonal">
              <Image src="/img/barber-5.jpg" alt="Beard work" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="big tonal">
              <Image src="/img/barber-1.jpg" alt="Barber" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
          </div>

          <div
            className="vitrine-row"
            data-reveal-scale
            data-cat="nail"
            style={!isVisible("nail") ? { display: "none" } : undefined}
          >
            <div className="big tonal">
              <Image src="/img/nails-5.jpg" alt="Gold nails" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
            <div className="mid tonal">
              <Image src="/img/nails-3.jpg" alt="Nails" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="copy">
              <div className="idx">N° 03 · Nails · Ongles</div>
              <h3>
                <span className="en-only">Nail Couture Studio</span>
                <span className="fr">Couture des ongles</span>
              </h3>
              <p><span className="en-only">Builder-gel manicures, sculpted forms, custom inlays. A glass of pét-nat, ninety minutes off the phone, hands you&apos;ll catch yourself glancing at all week.</span>
<span className="fr-block">Manucures au gel de construction, formes sculptées, incrustations sur mesure. Un verre de pét-nat, quatre-vingt-dix minutes loin du téléphone, des mains que vous vous surprendrez à admirer toute la semaine.</span></p>
              <div className="credits">
                <span className="v">◇ Artist</span> Camille B.
                <br />
                <span className="v">◇ Finish</span> Builder gel, sculpted
                <br />
                <span className="v">◇ Hour</span> 1h30
              </div>
            </div>
          </div>

          <div
            className="vitrine-row flip"
            data-reveal-scale
            data-cat="lash"
            style={!isVisible("lash") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 04 · Lash · Cils</div>
              <h3>
                <span className="en-only">Lash & Brow Sanctuary</span>
                <span className="fr">Sanctuaire des cils</span>
              </h3>
              <p><span className="en-only">Hand-mapped lash extensions, a quiet brow lamination room, lash lift & tint by senior artists. Forty-five minutes that change the rest of your week.</span>
<span className="fr-block">Extensions de cils cartographiées à la main, une salle feutrée de lamination des sourcils, rehaussement et teinture des cils par des artistes seniors. Quarante-cinq minutes qui transforment le reste de votre semaine.</span></p>
              <div className="credits">
                <span className="v">◇ Artist</span> Sophie L.
                <br />
                <span className="v">◇ Mapping</span> Hand-drawn, per eye
                <br />
                <span className="v">◇ Hour</span> 2h
              </div>
            </div>
            <div className="mid tonal">
              <Image src="/img/lash-3.jpg" alt="Lash detail" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="big tonal">
              <Image src="/img/lash-1.jpg" alt="Lash ritual" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
          </div>

          <div
            className="vitrine-row"
            data-reveal-scale
            data-cat="face"
            style={!isVisible("face") ? { display: "none" } : undefined}
          >
            <div className="big tonal warm">
              <Image src="/img/face-1.jpg" alt="Facial" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
            <div className="mid tonal">
              <Image src="/img/face-2.jpg" alt="Face detail" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="copy">
              <div className="idx">N° 05 · Esthetics · Esthétique</div>
              <h3>
                <span className="en-only">Skin Alchemy</span>
                <span className="fr">L&apos;alchimie de la peau</span>
              </h3>
              <p><span className="en-only">HydraFacials, dermaplaning, retinol-sequenced peels, LED rooms in their own low light. We read the skin first, then we treat it. Always in that order.</span>
<span className="fr-block">HydraFacials, dermaplaning, peelings séquencés au rétinol, salles LED dans leur propre pénombre. Nous lisons la peau d’abord, puis nous la traitons. Toujours dans cet ordre.</span></p>
              <div className="credits">
                <span className="v">◇ Aesthetician</span> Renée L.
                <br />
                <span className="v">◇ Protocol</span> Read, treat, send home
                <br />
                <span className="v">◇ Hour</span> 1h45
              </div>
            </div>
          </div>

          <div
            className="vitrine-row flip"
            data-reveal-scale
            data-cat="spa"
            style={!isVisible("spa") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 06 · Spa · Bien-être</div>
              <h3>
                <span className="en-only">Wellness & Body Rituals</span>
                <span className="fr">Rituels du corps</span>
              </h3>
              <p><span className="en-only">Lymphatic drainage, body contouring, scalp rituals, and the kind of massage that resets the week. Heated stone, eucalyptus, low light, no phone.</span>
<span className="fr-block">Drainage lymphatique, remodelage corporel, rituels du cuir chevelu et le genre de massage qui remet la semaine à zéro. Pierre chauffée, eucalyptus, lumière basse, pas de téléphone.</span></p>
              <div className="credits">
                <span className="v">◇ Therapist</span> Marc-André D.
                <br />
                <span className="v">◇ Room</span> The long bath, north-facing
                <br />
                <span className="v">◇ Hour</span> 2h
              </div>
            </div>
            <div className="mid tonal">
              <Image src="/img/spa-2.jpg" alt="Spa detail" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 30vw" />
            </div>
            <div className="big tonal">
              <Image src="/img/spa-3.jpg" alt="Long bath" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" data-screen-label="05 Gallery">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">
              § 03 — La galerie
              <br />
              Twenty-four frames
            </div>
            <h2 data-reveal>
              <span className="en-only">The room, in fragments.</span>
              <span className="fr-block">La pièce, en fragments.</span>
            </h2>
          </div>

          <div className="gallery" id="gallery" data-stagger>
            {GALLERY_TILES.map((tile) => (
              <div
                key={tile.num}
                className={`tile ${tile.size}`}
                data-cat={tile.cat}
                style={!isVisible(tile.cat) ? { display: "none" } : undefined}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 33vw"
                />
                <div className="num">{tile.num}</div>
                <div className="meta">
                  <div className="top">{tile.top}</div>
                  <h4>
                    <span className="en-only">{tile.title}</span>
                    <span className="fr">{tile.fr}</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="work-marquee" aria-hidden="true">
        <div className="work-marquee-track">
          <span className="work-marquee-text">
            HAIR · NAILS · LASH & BROW · BARBER · SPA · ESTHETICS · WELLNESS · MONCTON · NB ·{" "}
          </span>
          <span className="work-marquee-text" aria-hidden="true">
            HAIR · NAILS · LASH & BROW · BARBER · SPA · ESTHETICS · WELLNESS · MONCTON · NB ·{" "}
          </span>
        </div>
      </div>

      {/* CTA */}
      <section
        className="cta-section"
        data-screen-label="06 CTA"
      >
        <div className="eyebrow cta-eyebrow">
          <span className="dot"></span>Twelve guests per day · Douze invités par jour
        </div>
        <h2 data-reveal>
          <span className="en-only">
            The next chair could
            <br />
            have your name on it.
          </span>
          <span className="fr">Le prochain fauteuil — peut-être le vôtre.</span>
        </h2>
        <BookingLink className="btn-gold">
          <span>Explore the Rituals</span>
          <span className="fr">Explorer les rituels</span>
          <span className="arrow">→</span>
        </BookingLink>
      </section>
    </>
  );
}
