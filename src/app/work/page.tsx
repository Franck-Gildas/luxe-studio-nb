"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/work.css";
import Image from "next/image";
import Link from "next/link";

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

          <h1>
            <span className="en-only">Transformations</span>
            <span className="fr">Métamorphoses — du fauteuil, en silence.</span>
          </h1>

          <div className="work-hero-blurb">
            <p>
              <strong>Each frame below was made at the chair</strong> — late afternoon, north light, no retouching. We photograph at the end of every ritual; the guest decides if it joins the vitrine.
            </p>
            <p>
              Slide the gold handle on a reveal to see the before.{" "}
              <em className="italic" style={{ color: "var(--rose)" }}>
                Faites glisser pour voir l&apos;avant — puis lisez la suite.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="ba-section" data-screen-label="03 Before After" ref={baSectionRef}>
        <div className="ba-list">
          <div className="ba-row">
            <div className="ba-side">
              <div className="idx">◇ Reveal 01 / 03 · Hair</div>
              <h3>Élise — Slow colour, three sittings</h3>
              <div className="sub">Hair ritual · 6 hours over 3 visits</div>
              <p>Eight years of box dye, unwound in three sittings. A bone-blonde lifted in low concentration with bond therapy at every wash, then re-warmed with the lightest hand of amber gloss. The fringe was kept; everything else was forgiven.</p>
              <div className="ba-tags">
                <span className="ba-tag gold">Colour</span>
                <span className="ba-tag">Olaplex</span>
                <span className="ba-tag">Treatment</span>
                <span className="ba-tag">Cut</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="55">
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
            <div className="ba-side">
              <div className="idx">◇ Reveal 02 / 03 · Barber</div>
              <h3>Marc — The Saturday cut</h3>
              <div className="sub">Atelier du barbier · 1h30</div>
              <p>A scissor cut taken low and tight, beard sculpted with a straight razor under hot towel. No clipper above the temple. Cedar after-balm, a finger of single malt, the kind of quiet that doesn&apos;t apologise for itself.</p>
              <div className="ba-tags">
                <span className="ba-tag gold">Hot towel</span>
                <span className="ba-tag">Straight razor</span>
                <span className="ba-tag">Beard</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="42">
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
            <div className="ba-side">
              <div className="idx">◇ Reveal 03 / 03 · Skin</div>
              <h3>Renée — Ninety minutes of skin</h3>
              <div className="sub">Esthetics · HydraFacial & LED</div>
              <p>A two-part HydraFacial, dermaplaning at the brow line, then a quiet half-hour under red light. The skin was first read — sebum, hydration, the small map of the week — and only then approached. The glow holds for two weeks; the routine that follows for longer.</p>
              <div className="ba-tags">
                <span className="ba-tag gold">HydraFacial</span>
                <span className="ba-tag">LED</span>
                <span className="ba-tag">Dermaplane</span>
              </div>
            </div>
            <div className="ba-frame" data-ba data-clip="50">
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
            <h2>
              Six rituals, six rooms,
              <br />
              one careful afternoon.
            </h2>
          </div>

          <div
            className="vitrine-row"
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
              <p>Slow colour, custom dimensional work, and Olaplex-led repair — performed by senior stylists who treat your head of hair like an heirloom.</p>
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
            data-cat="barber"
            style={!isVisible("barber") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 02 · Barber · Barbier</div>
              <h3>
                <span className="en-only">The Barbering Atelier</span>
                <span className="fr">L&apos;atelier du barbier</span>
              </h3>
              <p>Hot-towel shaves, beard architecture, and the cut your grandfather used to take an hour to get right — straight razor, cedar after-balm, a tumbler of something dark.</p>
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
              <p>Builder-gel manicures, sculpted forms, custom inlays. A glass of pét-nat, ninety minutes off the phone, hands you&apos;ll catch yourself glancing at all week.</p>
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
            data-cat="lash"
            style={!isVisible("lash") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 04 · Lash · Cils</div>
              <h3>
                <span className="en-only">Lash & Brow Sanctuary</span>
                <span className="fr">Sanctuaire des cils</span>
              </h3>
              <p>Hand-mapped lash extensions, a quiet brow lamination room, lash lift & tint by senior artists. Forty-five minutes that change the rest of your week.</p>
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
              <p>HydraFacials, dermaplaning, retinol-sequenced peels, LED rooms in their own low light. We read the skin first, then we treat it. Always in that order.</p>
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
            data-cat="spa"
            style={!isVisible("spa") ? { display: "none" } : undefined}
          >
            <div className="copy">
              <div className="idx">N° 06 · Spa · Bien-être</div>
              <h3>
                <span className="en-only">Wellness & Body Rituals</span>
                <span className="fr">Rituels du corps</span>
              </h3>
              <p>Lymphatic drainage, body contouring, scalp rituals, and the kind of massage that resets the week. Heated stone, eucalyptus, low light, no phone.</p>
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
            <h2>The room, in fragments.</h2>
          </div>

          <div className="gallery" id="gallery">
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
        style={{ padding: "100px 48px 160px" }}
      >
        <div className="eyebrow cta-eyebrow">
          <span className="dot"></span>Twelve guests per day · Douze invités par jour
        </div>
        <h2>
          <span className="en-only">
            The next chair could
            <br />
            have your name on it.
          </span>
          <span className="fr">Le prochain fauteuil — peut-être le vôtre.</span>
        </h2>
        <Link href="/contact" className="btn-gold">
          <span>Explore the Rituals</span>
          <span className="fr">Explorer les rituels</span>
          <span className="arrow">→</span>
        </Link>
      </section>
    </>
  );
}
