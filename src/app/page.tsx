"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/home.css";

function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const button = form.querySelector("button");
  const input = form.querySelector("input");
  if (button) button.textContent = "✓ MERCI";
  if (input instanceof HTMLInputElement) input.value = "";
}

export default function HomePage() {
  useEffect(() => {
    document.querySelectorAll("#wordmark .l").forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${2.4 + i * 0.06}s`;
    });
  }, []);

  return (
    <>
      <div className="grain"></div>

      {/* HERO / THE ATRIUM */}
      <section className="atrium" data-screen-label="01 Home Hero">
        <div className="beam"></div>
        <div className="beam-line"></div>

        <div className="atrium-corners">
          <div className="tl">
            By appointment
            <br />
            <span className="glow">◇ 214 Rue Main · Suite 201 · Moncton</span>
          </div>
          <div className="tr">
            N 46.0878° · W 64.7782°
            <br />
            <span>Latitude / Longitude</span>
          </div>
          <div className="bl">
            House Élixir N° 01
            <br />
            <span>Bergamot · vetiver · amber</span>
          </div>
          <div className="br">
            The Atrium
            <br />
            <span>Open by appointment · 506 · 555 · 0187</span>
          </div>
        </div>

        <div className="atrium-stage">
          <div className="atrium-top">
            <div className="l">
              <span>◇ The House</span>
              <span className="v">Maison de beauté · Est. MMXXIV</span>
            </div>
            <div className="r">
              <span>Open today · ouvert</span>
              <span>10 — 22 · Moncton, NB</span>
            </div>
          </div>

          <div className="composition">
            <div className="vial-photo">
              <Image
                src="/img/apothecary-bottle.jpg"
                alt="House élixir"
                fill
                sizes="200px"
                className="object-cover"
                priority
              />
              <div className="vial-photo-glow"></div>
            </div>
            <div className="pedestal"></div>
            <div className="pedestal-shadow"></div>
            <div
              className="placeholder-label"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              3D · house élixir on marble pedestal · volumetric light
            </div>
          </div>

          <div className="atrium-bottom">
            <h1 className="wordmark" id="wordmark">
              <span className="l">L</span>
              <span className="l">U</span>
              <span className="l">X</span>
              <span className="l">E</span>
              <span className="gap"></span>
              <span className="l">S</span>
              <span className="l">T</span>
              <span className="l">U</span>
              <span className="l">D</span>
              <span className="l">I</span>
              <span className="l">O</span>
              <span className="sup">NB</span>
            </h1>

            <div className="tagline">
              <div className="tagline-en">Where beauty becomes ritual.</div>
              <div className="tagline-fr">Où la beauté devient rituel.</div>
            </div>

            <Link href="/contact" className="btn-gold" style={{ marginTop: 14 }}>
              <span>Book Your Ritual</span>
              <span className="fr">Réservez votre rituel</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="atrium-scroll">Enter · Entrer</div>
      </section>

      {/* MARQUEE */}
      <section className="marquee" data-screen-label="02 Home Marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-item">
            Hair <span className="sep"></span> Barbering <span className="sep"></span> Nails{" "}
            <span className="sep"></span> Lash &amp; Brow <span className="sep"></span> Esthetics{" "}
            <span className="sep"></span> Wellness <span className="sep"></span>
          </span>
          <span className="marquee-item">
            Cheveux <span className="sep"></span> Barbier <span className="sep"></span> Ongles{" "}
            <span className="sep"></span> Cils &amp; Sourcils <span className="sep"></span> Esthétique{" "}
            <span className="sep"></span> Bien‑être <span className="sep"></span>
          </span>
          <span className="marquee-item">
            Hair <span className="sep"></span> Barbering <span className="sep"></span> Nails{" "}
            <span className="sep"></span> Lash &amp; Brow <span className="sep"></span> Esthetics{" "}
            <span className="sep"></span> Wellness <span className="sep"></span>
          </span>
          <span className="marquee-item">
            Cheveux <span className="sep"></span> Barbier <span className="sep"></span> Ongles{" "}
            <span className="sep"></span> Cils &amp; Sourcils <span className="sep"></span> Esthétique{" "}
            <span className="sep"></span> Bien‑être <span className="sep"></span>
          </span>
        </div>
      </section>

      {/* INVITATION */}
      <section className="invitation" data-screen-label="03 Invitation">
        <div className="invitation-inner">
          <div className="eyebrow">
            <span className="dot"></span>The House
          </div>
          <h2>
            We craft <em>unforgettable</em> beauty rituals in New Brunswick — slow, sensorial, made for the way you live now.
            <span className="fr">
              Un atelier dédié aux rituels de beauté du Nouveau‑Brunswick — lent, sensuel, fait pour vous.
            </span>
          </h2>
        </div>
      </section>

      {/* SERVICES / EXPERIENCES */}
      <section className="services-section" data-screen-label="04 Experiences">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">
              § 01 — The House
              <br />
              Les expériences
            </div>
            <h2>
              Six rituals,
              <br />
              under one roof.
            </h2>
          </div>

          <div className="services-grid">
            <article className="exp">
              <div className="exp-num">01 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M13 3 C 9 9, 9 14, 13 23 C 17 14, 17 9, 13 3 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path d="M13 6 L 13 21" stroke="currentColor" strokeWidth="0.6" />
                </svg>
              </div>
              <h3>
                Signature Hair Rituals<span className="fr">Rituels de cheveux signature</span>
              </h3>
              <p>
                Slow colour, custom dimensional work, and Olaplex‑led repair — performed by senior stylists who treat your head of hair like an heirloom.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$185 · 2h30
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>

            <article className="exp">
              <div className="exp-num">02 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5 5 L 21 21" stroke="currentColor" strokeWidth="1" />
                  <path d="M21 5 L 5 21" stroke="currentColor" strokeWidth="1" />
                  <circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
                </svg>
              </div>
              <h3>
                Barbering Atelier<span className="fr">L&apos;atelier du barbier</span>
              </h3>
              <p>
                Hot‑towel shaves, beard architecture, and the cut your grandfather used to take an hour to get right — straight razor, cedar after‑balm, and a tumbler of something dark.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$95 · 1h15
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>

            <article className="exp">
              <div className="exp-num">03 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M13 4 C 9 4, 7 7, 7 12 L 7 22 L 19 22 L 19 12 C 19 7, 17 4, 13 4 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <line x1="9" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="0.6" />
                </svg>
              </div>
              <h3>
                Nail Couture<span className="fr">Couture des ongles</span>
              </h3>
              <p>
                Builder‑gel manicures, sculpted forms, custom inlays. A glass of pét‑nat, ninety minutes off the phone, hands you&apos;ll catch yourself glancing at all week.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$110 · 1h30
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>

            <article className="exp">
              <div className="exp-num">04 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M3 13 C 6 8, 10 6, 13 6 C 16 6, 20 8, 23 13"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <ellipse cx="13" cy="13" rx="4" ry="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  <circle cx="13" cy="13" r="1.4" fill="currentColor" />
                </svg>
              </div>
              <h3>
                Lash &amp; Brow Studio<span className="fr">Cils &amp; sourcils</span>
              </h3>
              <p>
                Hand‑mapped lash extensions, a quiet brow lamination room, lash lift &amp; tint by senior artists. Forty‑five minutes that change the rest of your week.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$140 · 2h
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>

            <article className="exp">
              <div className="exp-num">05 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="13" cy="13" r="5" stroke="currentColor" strokeWidth="0.7" fill="none" />
                  <circle cx="13" cy="13" r="1.6" fill="currentColor" />
                </svg>
              </div>
              <h3>
                Esthetics &amp; Skin<span className="fr">Esthétique &amp; soins de la peau</span>
              </h3>
              <p>
                HydraFacials, dermaplaning, retinol‑sequenced peels, LED rooms in their own low light. We read the skin first, then we treat it. Always in that order.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$215 · 1h45
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>

            <article className="exp">
              <div className="exp-num">06 / 06</div>
              <div className="exp-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5 13 Q 9 6, 13 13 T 21 13" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M5 18 Q 9 11, 13 18 T 21 18" stroke="currentColor" strokeWidth="0.7" fill="none" />
                </svg>
              </div>
              <h3>
                Wellness &amp; Body<span className="fr">Bien‑être &amp; corps</span>
              </h3>
              <p>
                Lymphatic drainage, body contouring, scalp rituals, and the kind of massage that resets the week. Heated stone, eucalyptus, low light, no phone.
              </p>
              <div className="menu">
                <span className="price">
                  <span className="from">From</span>$245 · 2h
                </span>
                <span className="arrow">↗</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* THE RITUAL */}
      <section className="section ritual" data-screen-label="05 The Ritual">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">
              § 02 — The Ritual
              <br />
              Le Rituel
            </div>
            <h2>
              Every visit, the same
              <br />
              five quiet movements.
            </h2>
          </div>

          <div className="ritual-rows">
            <div className="ritual-row">
              <div className="num">
                <span className="sup">Phase</span>01
              </div>
              <h3>
                The Welcome<span className="fr">L&apos;accueil</span>
              </h3>
              <p>
                You arrive ten minutes early to nothing. A robe of heavy linen, a glass of cucumber water, low Erik Satie. The door closes; the city ends.
              </p>
              <div className="meta">
                <span className="v">— 10 min</span>Arrival · Arrivée
              </div>
            </div>

            <div className="ritual-row">
              <div className="num">
                <span className="sup">Phase</span>02
              </div>
              <h3>
                The Consultation<span className="fr">La consultation</span>
              </h3>
              <p>
                Your artist sits across from you, not behind you. We talk about the week, the light at your kitchen window, the photograph in your phone you almost showed.
              </p>
              <div className="meta">
                <span className="v">15 min</span>Listening · Écoute
              </div>
            </div>

            <div className="ritual-row">
              <div className="num">
                <span className="sup">Phase</span>03
              </div>
              <h3>
                The Ritual<span className="fr">Le rituel</span>
              </h3>
              <p>
                The treatment itself, performed slowly, by hands that have done this fifteen thousand times. No upsell at the chair, no clock visible from where you sit.
              </p>
              <div className="meta">
                <span className="v">60 — 150 min</span>Service · Soin
              </div>
            </div>

            <div className="ritual-row">
              <div className="num">
                <span className="sup">Phase</span>04
              </div>
              <h3>
                The Finish<span className="fr">La touche finale</span>
              </h3>
              <p>
                The mirror is turned, the light is changed once, twice. A spritz of the house élixir, a final brush, a photograph for your records — only if you like.
              </p>
              <div className="meta">
                <span className="v">10 min</span>Reveal · Dévoilement
              </div>
            </div>

            <div className="ritual-row">
              <div className="num">
                <span className="sup">Phase</span>05
              </div>
              <h3>
                The After<span className="fr">L&apos;après</span>
              </h3>
              <p>
                Tea on the velvet bench. A small linen pouch of what you&apos;ll need at home for the next two weeks. Your next visit, already softly held.
              </p>
              <div className="meta">
                <span className="v">— 15 min</span>Sending‑off · Départ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER PREVIEW */}
      <section className="atelier" data-screen-label="06 The Room">
        <div className="atelier-grid">
          <div className="atelier-copy">
            <div className="eyebrow">
              <span className="dot"></span>The Room · La pièce
            </div>
            <h2>
              A house of six rooms,
              <br />
              arranged around quiet.<span className="fr">Six salles, agencées autour du silence.</span>
            </h2>
            <p>
              The studio sits on a corner of Robinson Street, behind a heavy brass door. <strong>Six private rooms</strong>, a marble apothecary, a velvet bench, and one window facing north — the only window we open.
            </p>
            <p>
              Walk‑ins are rare and gently turned away. Every guest is held, every visit is timed to its own. You will not pass another guest in the hall.
            </p>

            <div className="stats">
              <div className="stat">
                <div className="n">6</div>
                <div className="l">
                  Private rooms
                  <br />
                  Salles privées
                </div>
              </div>
              <div className="stat">
                <div className="n">22</div>
                <div className="l">
                  Senior artists
                  <br />
                  Artistes principaux
                </div>
              </div>
              <div className="stat">
                <div className="n">1 : 1</div>
                <div className="l">
                  Artist : guest
                  <br />
                  Artiste : invité
                </div>
              </div>
            </div>
          </div>

          <div className="atelier-img tonal warm">
            <Image
              src="/img/atelier-interior.jpg"
              alt="The hair atelier, late afternoon"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="corner-meta">
              <span className="v">◇ Room N° 02</span>
              <span>Hair atelier · 17:42</span>
            </div>
            <div className="frame-corners">
              <span className="tl"></span>
              <span className="tr"></span>
              <span className="bl"></span>
              <span className="br"></span>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS TEASER */}
      <section className="transforms" data-screen-label="06b Transformations Teaser">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">
              § 02b — Selected transformations
              <br />
              Métamorphoses
            </div>
            <h2>
              Quiet evidence,
              <br />
              from the chair.
            </h2>
          </div>

          <div className="transforms-grid">
            <article className="tx-card tx-card-lg">
              <span className="tag">◇ Hair · Cheveux</span>
              <Image
                src="/img/hair-1.jpg"
                alt="Hair transformation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>Hair Ritual · 03:20</span>
                  <span className="glow">N° 01</span>
                </div>
                <h3>
                  The slow colour, undone and rewritten<span className="fr">Le retour à la lumière</span>
                </h3>
              </div>
            </article>

            <article className="tx-card tx-card-sm">
              <span className="tag">◇ Nails</span>
              <Image
                src="/img/nails-5.jpg"
                alt="Gold nail couture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>Couture</span>
                  <span className="glow">N° 02</span>
                </div>
                <h3>
                  Gilded almond<span className="fr">Amande dorée</span>
                </h3>
              </div>
            </article>

            <article className="tx-card tx-card-sm">
              <span className="tag">◇ Lash &amp; Brow</span>
              <Image
                src="/img/lash-2.jpg"
                alt="Lash extensions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>Hand-mapped</span>
                  <span className="glow">N° 03</span>
                </div>
                <h3>
                  Doll lash, undone<span className="fr">Cils dénoués</span>
                </h3>
              </div>
            </article>
          </div>

          <div className="transforms-grid-bottom">
            <article className="tx-card">
              <span className="tag">◇ Barber</span>
              <Image
                src="/img/barber-2.jpg"
                alt="Barber cut"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>Atelier · Hot towel</span>
                  <span className="glow">N° 04</span>
                </div>
                <h3>
                  The Saturday cut<span className="fr">La coupe du samedi</span>
                </h3>
              </div>
            </article>

            <article className="tx-card">
              <span className="tag">◇ Esthetics</span>
              <Image
                src="/img/face-1.jpg"
                alt="Facial"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>HydraFacial · 90 min</span>
                  <span className="glow">N° 05</span>
                </div>
                <h3>
                  Skin, read aloud<span className="fr">La peau, lue</span>
                </h3>
              </div>
            </article>

            <article className="tx-card">
              <span className="tag">◇ Wellness</span>
              <Image
                src="/img/spa-3.jpg"
                alt="Spa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="meta">
                <div className="top">
                  <span>Bain · Vapeur</span>
                  <span className="glow">N° 06</span>
                </div>
                <h3>
                  The long bath<span className="fr">Le long bain</span>
                </h3>
              </div>
            </article>
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/work" className="btn-ghost">
              <span>Explore the Rituals</span>
              <span className="arrow" style={{ marginLeft: 8 }}>
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials" data-screen-label="07 Testimonials">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">
              § 03 — In their words
              <br />
              Témoignages
            </div>
            <h2>
              What the regulars
              <br />
              quietly say.
            </h2>
          </div>

          <div className="testi-grid">
            <article className="testi">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                I don&apos;t go to a salon. I go to LUXE. There is a difference and you feel it the moment the brass door closes behind you.
              </blockquote>
              <div className="who">
                <div className="name">Émilie D.</div>
                <div className="role">Hair · Three years a guest</div>
              </div>
            </article>

            <article className="testi">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                Le rituel commence avant même le soin. Le calme, le linge chaud, le silence. On en ressort une autre personne — pour deux semaines au moins.
              </blockquote>
              <div className="who">
                <div className="name">Jean‑Luc A.</div>
                <div className="role">Barbier · Caraquet</div>
              </div>
            </article>

            <article className="testi">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                The HydraFacial I&apos;d had elsewhere was a treatment. Here, it was a ninety‑minute composition. My skin is one thing; the rest of me is the surprise.
              </blockquote>
              <div className="who">
                <div className="name">Renée L.</div>
                <div className="role">Esthetics · Dieppe</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="cta-section" data-screen-label="08 CTA">
        <div className="eyebrow cta-eyebrow">
          <span className="dot"></span>The brass door is open
        </div>
        <h2>
          The hour is yours,
          <br />
          when you&apos;re ready.<span className="fr">L&apos;heure vous appartient,<br />quand vous le voulez.</span>
        </h2>
        <p>Twelve guests per day · Douze invités par jour</p>
        <Link href="/contact" className="btn-gold">
          <span>Book Your Ritual</span>
          <span className="fr">Réservez votre rituel</span>
          <span className="arrow">→</span>
        </Link>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-strip" data-screen-label="09 Newsletter">
        <div className="footer-mark">
          <div className="word">
            LUXE STUDIO<span className="sup">NB</span>
          </div>
          <div className="nl">
            <h4>The newsletter · La lettre</h4>
            <p>Once a season — solstice, equinox. New rituals, soft openings, the hour the door is open.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="your address · votre courriel" required />
              <button type="submit">Subscribe →</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
