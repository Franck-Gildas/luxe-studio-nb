'use client'

import '@/styles/about.css'
import Image from 'next/image'
import Link from 'next/link'
import { BookingLink } from '@/components/ui/BookingLink'

export default function AboutPage() {
  return (
    <>
      <div className="grain"></div>

      {/* HERO */}
      <section className="about-hero" data-screen-label="01 About Hero">
        <div className="about-hero-bg about-img">
          <div className="about-hero-media" data-parallax>
            <Image
              src="/img/atelier-interior-2.jpg"
              alt="The atelier, late afternoon"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="about-hero-inner">
          <div className="about-hero-meta">
            <span><span className="v">◇ L&apos;atelier</span> · 214 Rue Main · Suite 201 · Moncton</span>
            <span>Page <span className="v">04 / 06</span></span>
          </div>
          <h1 data-reveal>
            <span className="en-only">A house of quiet.</span>
            <span className="fr-block">Une maison du silence.</span>
          </h1>
          <p className="hero-tagline">
            <span className="en-only">Kept on Main Street, since MMXXIV.</span>
            <span className="fr-block">Sur la rue Main, depuis MMXXIV.</span>
          </p>
        </div>
        <div className="about-hero-scroll">The story · l&apos;histoire</div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philo" data-screen-label="02 Philosophy">
        <div className="philo-inner">
          <div className="left" data-reveal-left>
            <div className="num">§ 01 — The Philosophy · La philosophie</div>
            <h2 data-reveal>
              <span className="en-only">
                The room first,<br />then the work.
              </span>
              <span className="fr">La pièce d&apos;abord, le soin ensuite.</span>
            </h2>
          </div>
          <div className="right">
            <p data-reveal><span className="en-only">We opened a single door on <span className="gold">Rue Main Street</span>
<span className="fr-block">Nous avons ouvert une seule porte sur la rue Main</span> in the winter of 2024, after fifteen years of working in other people&apos;s rooms. We had one belief between us: that the room is the treatment, and the treatment is only the most visible part of it.</span></p>
            <p data-reveal><span className="en-only">So we built the room first. Six private suites, a marble apothecary, a velvet bench, one north-facing window, and a brass door heavy enough to close the day behind you. Then — only then — we filled it with twenty-two senior artists who&apos;d never compromised, and never wanted to.</span>
<span className="fr-block">Alors nous avons bâti la salle d’abord. Six suites privées, une apothicairerie de marbre, un banc de velours, une fenêtre orientée au nord et une porte de laiton assez lourde pour refermer la journée derrière vous. Puis — seulement ensuite — nous l’avons remplie de vingt-deux artistes seniors qui n’avaient jamais transigé et n’avaient jamais voulu le faire.</span></p>
            <p data-reveal><span className="en-only">We don&apos;t do walk-ins. We don&apos;t double-book. We don&apos;t have a clock visible from any chair. <strong>Every visit is held in its own pocket of time</strong> — fifteen minutes to arrive into the room, fifteen to leave it. A robe of heavy linen. A glass of cucumber water. Low Erik Satie, always.</span>
<span className="fr-block">Nous ne faisons pas de visites sans rendez-vous. Nous ne double-bookons pas. Nous n’avons pas d’horloge visible depuis aucun fauteuil. Chaque visite est tenue dans sa propre poche de temps — quinze minutes pour entrer dans la salle, quinze pour en sortir. Un peignoir de lin épais. Un verre d’eau au concombre. Du Satie tout bas, toujours.</span></p>
            <p data-reveal><span className="en-only">Because the room <em>is</em> the treatment. The treatment is the most visible part of it, but never the most important one. We learned this in fifteen years of cutting hair at a window facing a parking lot. We promised, if we ever opened our own room, the window would face north — and the day would end at the door.</span>
<span className="fr-block">Parce que la salle est le soin. Le soin en est la partie la plus visible, mais jamais la plus importante. Nous l’avons appris en quinze ans à couper des cheveux devant une fenêtre sur un stationnement. Nous avons promis, si un jour nous ouvrions notre propre salle, que la fenêtre serait au nord — et que la journée se terminerait à la porte.</span></p>

            <div className="signature">
              With our quiet welcome,
              <span className="name">◇ Émilie &amp; Marc-André, Founders</span>
            </div>
          </div>
        </div>
      </section>

      {/* TENETS */}
      <section className="tenets" data-screen-label="03 Tenets">
        <div className="tenets-grid" data-stagger>
          <div className="tenet">
            <div className="roman">I.</div>
            <h4><span className="en-only">By appointment only</span><span className="fr">Sur rendez-vous</span></h4>
            <p><span className="en-only">We don&apos;t take walk-ins, and we never double-book. Your hour is yours; the room is yours; the artist is yours.</span></p>
          </div>
          <div className="tenet">
            <div className="roman">II.</div>
            <h4><span className="en-only">Twelve guests per day</span><span className="fr">Douze invités</span></h4>
            <p><span className="en-only">Across all six rooms — a deliberate cap. You will not pass another guest in the hall.</span></p>
          </div>
          <div className="tenet">
            <div className="roman">III.</div>
            <h4><span className="en-only">Senior artists only</span><span className="fr">Artistes principaux</span></h4>
            <p><span className="en-only">Every artist has spent at least seven years at the chair. No assistants do client work. Ever.</span></p>
          </div>
          <div className="tenet">
            <div className="roman">IV.</div>
            <h4><span className="en-only">Bilingual, always</span><span className="fr">Toujours bilingue</span></h4>
            <p><span className="en-only">Every artist speaks French and English at the chair. We&apos;ve been Acadian since the day we opened.</span>
<span className="fr-block">Chaque artiste parle français et anglais au fauteuil. Nous sommes acadiens depuis le jour de notre ouverture.</span></p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team" data-screen-label="04 Team">
        <div className="section-inner">
          <div className="section-head">
            <div className="num">§ 02 — The artists<br />Les artistes</div>
            <h2 data-reveal>
              <span className="en-only">
                Twenty-two pairs<br />of senior hands.
              </span>
              <span className="fr-block">
                Vingt-deux paires<br />de mains expertes.
              </span>
            </h2>
          </div>

          <div className="team-grid" data-stagger>
            <article className="team-card span-3">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-1.jpg"
                  alt="Émilie Doiron"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 720px"
                />
                <span className="badge">◇ Founder · Hair</span>
              </div>
              <div className="team-info">
                <div className="role">Founder · Senior Stylist</div>
                <h4>Émilie<span className="last">Doiron</span></h4>
                <div className="bio">Eighteen years at the chair. Trained at Toni &amp; Guy London, then Paris under Tournier. Specialises in slow colour and the cut you don&apos;t notice for two weeks.</div>
                <div className="craft"><span>Cheveux · Couleur</span><span className="v">Room N° 02</span></div>
              </div>
            </article>

            <article className="team-card span-3">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-male-1.jpg"
                  alt="Marc-André Daigle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 720px"
                />
                <span className="badge">◇ Founder · Spa</span>
              </div>
              <div className="team-info">
                <div className="role">Founder · Senior Therapist</div>
                <h4>Marc-André<span className="last">Daigle</span></h4>
                <div className="bio">Trained at the Banff Centre &amp; in Kyoto. Master of lymphatic drainage and the long-bath ritual. Holds the room&apos;s silence like a second instrument.</div>
                <div className="craft"><span>Bien-être · Massage</span><span className="v">Room N° 07</span></div>
              </div>
            </article>

            <article className="team-card span-2">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-2.jpg"
                  alt="Sophie Léger"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 480px"
                />
                <span className="badge">◇ Lash</span>
              </div>
              <div className="team-info">
                <div className="role">Lash &amp; Brow Artist</div>
                <h4>Sophie<span className="last">Léger</span></h4>
                <div className="bio">Eleven years. Drew the lash maps the whole house uses, by hand, on butter paper.</div>
                <div className="craft"><span>Cils · Mapping</span><span className="v">N° 05</span></div>
              </div>
            </article>

            <article className="team-card span-2">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-3.jpg"
                  alt="Camille Bourque"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 480px"
                />
                <span className="badge">◇ Nails</span>
              </div>
              <div className="team-info">
                <div className="role">Nail Couturier</div>
                <h4>Camille<span className="last">Bourque</span></h4>
                <div className="bio">Sculpts free-hand from gel. Studied applied arts at NSCAD. Three-time NB nail-art winner.</div>
                <div className="craft"><span>Ongles · Couture</span><span className="v">N° 03</span></div>
              </div>
            </article>

            <article className="team-card span-2">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-male-2.jpg"
                  alt="Jean-Luc Arseneau"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 50vw, 480px"
                />
                <span className="badge">◇ Barber</span>
              </div>
              <div className="team-info">
                <div className="role">Maître Barbier</div>
                <h4>Jean-Luc<span className="last">Arseneau</span></h4>
                <div className="bio">Caraquet-born. Straight razor &amp; cedar after-balm. Won&apos;t use a clipper above the temple.</div>
                <div className="craft"><span>Barbier · Rasage</span><span className="v">N° 04</span></div>
              </div>
            </article>

            <article className="team-card span-3">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/staff-customer.jpg"
                  alt="Renée Léblanc"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 42%' }}
                  sizes="(max-width: 1100px) 50vw, 720px"
                  quality={90}
                />
                <span className="badge">◇ Esthetics</span>
              </div>
              <div className="team-info">
                <div className="role">Senior Aesthetician</div>
                <h4>Renée<span className="last">Léblanc</span></h4>
                <div className="bio">IDI Montréal, then four years at La Mer&apos;s atelier in Montréal. Reads skin like a card-reader reads light — first, then never in reverse.</div>
                <div className="craft"><span>Esthétique · HydraFacial · LED</span><span className="v">Room N° 06</span></div>
              </div>
            </article>

            <article className="team-card span-3">
              <div className="portrait team-photo" data-reveal-scale>
                <Image
                  src="/img/team-hands.jpg"
                  alt="The atelier hands"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center bottom' }}
                  sizes="(max-width: 1100px) 50vw, 720px"
                  quality={90}
                />
                <span className="badge">◇ + 16 artists</span>
              </div>
              <div className="team-info">
                <div className="role">The rest of the house</div>
                <h4>
                  <span className="en-only">
                    And sixteen more<span className="last">pairs of hands</span>
                  </span>
                  <span className="fr-block">
                    Et seize autres<span className="last">paires de mains</span>
                  </span>
                </h4>
                <div className="bio">Stylists, colourists, lash artists, aestheticians, therapists. Every one a senior. We&apos;ll introduce you to the right pair, by name, when you book.</div>
                <div className="craft"><span>Across all six rooms</span><span className="v">Senior · 7+ yrs</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location" data-screen-label="05 Location">
        <div className="location-inner">
          <div className="map">
            <div className="grid-lines"></div>
            <div className="road r1"></div>
            <div className="road r2"></div>
            <div className="road r3"></div>
            <div className="road r4"></div>
            <div className="road-main"></div>
            <div className="road-main-label">Rue Main Street</div>
            <div className="block b1"></div>
            <div className="block b2"></div>
            <div className="block b3"></div>
            <div className="block b4"></div>
            <div className="block b5"></div>
            <div className="block b6"></div>
            <div className="water"></div>
            <div className="water-label">Petitcodiac</div>
            <div className="pin"></div>
            <div className="pin-label">◇ Luxe Studio NB<span className="sub">214 · Suite 201</span></div>
            <div className="compass">N <span className="glow">46.0878°</span><br />W <span className="glow">64.7782°</span></div>
            <div className="scale"><span className="bar"></span><span>200 m</span></div>
            <span className="placeholder-label">Map · downtown Moncton, the brass door</span>
          </div>

          <div className="location-copy">
            <div className="num">§ 03 — Visit · La visite</div>
            <h2 data-reveal>
              <span className="en-only">
                The brass door is on<br />Main Street, second floor.
              </span>
              <span className="fr">La porte est sur la rue Main, au deuxième étage.</span>
            </h2>

            <div className="address-card">
              <div className="line">
                <span className="k">◇ Address</span>
                <span className="v">214 Rue Main Street<br /><span className="address-detail">Suite 201 · second floor</span></span>
              </div>
              <div className="line">
                <span className="k">◇ City</span>
                <span className="v">Moncton<span className="fr">New Brunswick · Canada</span></span>
              </div>
              <div className="line">
                <span className="k">◇ Postal</span>
                <span className="v">E1C 1B8</span>
              </div>
              <div className="line">
                <span className="k">◇ Direct</span>
                <span className="v">(506) 555 — 0187<span className="fr">hello@luxestudionb.com</span></span>
              </div>
              <div className="line">
                <span className="k">◇ Elsewhere</span>
                <span className="v"><a href="https://instagram.com/luxestudionb" style={{ color: 'var(--champagne)' }}>@luxestudionb</a></span>
              </div>
            </div>

            <div className="hours-card">
              <h5>◇ Hours · Heures d&apos;ouverture</h5>
              <div className="row"><span className="k">Tuesday — Thursday</span><span className="v">10 — 18</span></div>
              <div className="row"><span className="k">Friday</span><span className="v">10 — 22</span></div>
              <div className="row"><span className="k">Saturday</span><span className="v">09 — 18</span></div>
              <div className="row"><span className="k">Sunday — Monday</span><span className="v">Closed · Fermé</span></div>
            </div>

            <BookingLink className="btn-gold">
              <span>Visit the Atelier</span>
              <span className="fr">Visitez l&apos;atelier</span>
              <span className="arrow">→</span>
            </BookingLink>
          </div>
        </div>
      </section>
    </>
  )
}
