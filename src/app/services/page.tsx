'use client'

import '@/styles/services.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <>
      <div className="grain"></div>

      {/* HERO */}
      <section className="menu-hero" data-screen-label="01 Menu Hero">
        <div className="menu-hero-inner">
          <div className="menu-hero-meta">
            <span><span className="v">◇ Le menu</span> · Six houses, one roof</span>
            <span>Page <span className="v">03 / 06</span></span>
          </div>
          <h1>
            The Beauty<br />
            <em>Menu.</em>
            <span className="fr">Le menu — six maisons, une seule porte.</span>
          </h1>
          <p className="lede">Every ritual below is performed by a senior artist, in a private room, on the cadence of an actual visit — never to a clock visible from where you sit. Prices in Canadian dollars; gratuity is included in every service.</p>
        </div>
      </section>

      {/* INDEX */}
      <nav className="menu-index" data-screen-label="02 Menu Index">
        <div className="menu-index-inner">
          <a href="#hair" className="menu-index-item">
            <span className="n">01 · Hair</span>
            <h4>Signature Hair Rituals</h4>
            <span className="price"><span className="from">From</span>$185 · 2h30</span>
          </a>
          <a href="#barber" className="menu-index-item">
            <span className="n">02 · Barber</span>
            <h4>The Barbering Atelier</h4>
            <span className="price"><span className="from">From</span>$95 · 1h15</span>
          </a>
          <a href="#nail" className="menu-index-item">
            <span className="n">03 · Nails</span>
            <h4>Nail Couture Studio</h4>
            <span className="price"><span className="from">From</span>$110 · 1h30</span>
          </a>
          <a href="#lash" className="menu-index-item">
            <span className="n">04 · Lash</span>
            <h4>Lash & Brow Sanctuary</h4>
            <span className="price"><span className="from">From</span>$140 · 2h</span>
          </a>
          <a href="#face" className="menu-index-item">
            <span className="n">05 · Esthetics</span>
            <h4>Skin Alchemy</h4>
            <span className="price"><span className="from">From</span>$215 · 1h45</span>
          </a>
          <a href="#spa" className="menu-index-item">
            <span className="n">06 · Wellness</span>
            <h4>Body Rituals</h4>
            <span className="price"><span className="from">From</span>$245 · 2h</span>
          </a>
        </div>
      </nav>

      {/* 01 HAIR */}
      <section className="cat" id="hair" data-screen-label="03 Hair">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 01 — Hair · Cheveux</div>
            <h2>Signature<br />Hair Rituals<span className="fr">Le rituel des cheveux</span></h2>
            <p className="sensory">"Slow colour, custom dimensional work, and bond therapy at every wash. Your head of hair, treated like an heirloom."</p>
            <p className="body">All colour is mixed at the chair, by the artist who&apos;ll apply it. Cuts are dry-finished and re-checked at standing height. Olaplex No. 0 + No. 3 are folded into every chemical service at no extra cost.</p>
            <span className="room"><span className="dot"></span>Room N° 02 — North light, two chairs</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/hair-1.jpg"
                alt="Hair ritual"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Hair · The slow colour, three sittings</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">The Signature Cut<span className="fr">La coupe maison</span><span className="desc">Consultation, wash, scalp massage, dry-finished cut, in-chair coffee.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name">Slow Colour, Single Process<span className="fr">Couleur lente, un procédé</span><span className="desc">Mixed at the chair, applied in layers, bond therapy at every wash.</span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$225</span>
              </div>
              <div className="row">
                <span className="name">Dimensional Highlights<span className="fr">Balayage dimensionnel</span><span className="desc">Hand-painted, free-hand. Veil-fine for first-timers, dense for the return guest.</span></span>
                <span className="dur">3h30</span>
                <span className="price"><span className="from">From</span>$345</span>
              </div>
              <div className="row">
                <span className="name">The Restoration<span className="fr">La restauration</span><span className="desc">Three-stage Olaplex with steam, glaze, and a heavy mask. For hair that&apos;s been through it.</span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$165</span>
              </div>
              <div className="row">
                <span className="name">Bridal — The Morning Of<span className="fr">Le matin du mariage</span><span className="desc">Style consultation, on-site or in-room. Includes touch-up kit + a quiet champagne.</span></span>
                <span className="dur">3h</span>
                <span className="price"><span className="from">From</span>$420</span>
              </div>
            </div>

            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name">Olaplex No. 0 + No. 3 mask <span className="fr">masque-soin</span></span><span className="v">+ $32</span></div>
              <div className="row"><span className="name">Hot oil & steam scalp ritual <span className="fr">cuir chevelu</span></span><span className="v">+ $48</span></div>
              <div className="row"><span className="name">In-room glass of wine <span className="fr">verre de vin</span></span><span className="v">complimentary</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 BARBER */}
      <section className="cat flip" id="barber" data-screen-label="04 Barber">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 02 — Barber · Barbier</div>
            <h2>The Barbering<br />Atelier<span className="fr">L&apos;atelier du barbier</span></h2>
            <p className="sensory">"Hot-towel shaves, beard architecture, and the cut your grandfather used to take an hour to get right."</p>
            <p className="body">A single-chair atelier behind its own door. Straight razor, badger brush, cedar after-balm. The cut takes the time it takes; the conversation is yours to set the tempo of. A tumbler of something dark, on request.</p>
            <span className="room"><span className="dot"></span>Room N° 04 — The barbier, single chair</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/barber-1.jpg"
                alt="Barber atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Barber · The chair, single seat</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">The Saturday Cut<span className="fr">La coupe du samedi</span><span className="desc">Scissor over comb, dry-checked, finished with a hot towel and cedar after-balm.</span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$95</span>
              </div>
              <div className="row">
                <span className="name">Beard Architecture<span className="fr">L&apos;architecture du visage</span><span className="desc">Hand-shaped with straight razor, balm-conditioned, finished with cedar.</span></span>
                <span className="dur">45 min</span>
                <span className="price"><span className="from">From</span>$65</span>
              </div>
              <div className="row">
                <span className="name">Hot-Towel Royal Shave<span className="fr">Rasage royal</span><span className="desc">Three hot towels, two passes, balm-and-balm finish. The Saturday morning fix.</span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$110</span>
              </div>
              <div className="row">
                <span className="name">Father & Son<span className="fr">Père et fils</span><span className="desc">Two chairs, two cuts, one quiet hour. For the boy whose first chair is yours.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$155</span>
              </div>
            </div>

            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name">Brow & ear groom <span className="fr">détails</span></span><span className="v">+ $18</span></div>
              <div className="row"><span className="name">Cedar after-balm massage <span className="fr">baume cèdre</span></span><span className="v">+ $25</span></div>
              <div className="row"><span className="name">A finger of single malt <span className="fr">whisky de la maison</span></span><span className="v">complimentary</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 NAILS */}
      <section className="cat" id="nail" data-screen-label="05 Nails">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 03 — Nails · Ongles</div>
            <h2>Nail<br />Couture Studio<span className="fr">Couture des ongles</span></h2>
            <p className="sensory">"Builder gel, sculpted forms, custom inlays. Ninety minutes off the phone, hands you&apos;ll catch yourself glancing at all week."</p>
            <p className="body">A two-chair atelier behind a curtain of smoked glass. Every set is sculpted, not extended — the form is built fresh from gel, sanded by hand, and finished under cold light. We don&apos;t do quick fixes here; we do hands you&apos;ll forget aren&apos;t part of you.</p>
            <span className="room"><span className="dot"></span>Room N° 03 — Smoked glass, two chairs</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/nails-5.jpg"
                alt="Nail couture"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Nails · Gilded almond, builder gel</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">The Couture Manicure<span className="fr">La manucure couture</span><span className="desc">Cuticle work, hand & arm massage, builder-gel polish or BIAB structure.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$110</span>
              </div>
              <div className="row">
                <span className="name">Sculpted Set, Custom Form<span className="fr">Ongles sculptés sur mesure</span><span className="desc">Free-hand from gel, sanded and shaped by eye. Custom inlays on request.</span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name">Pedicure, Slow<span className="fr">Pédicure lente</span><span className="desc">Salt soak, callus work, paraffin wrap, hot stone foot massage.</span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$135</span>
              </div>
              <div className="row">
                <span className="name">Gold-leaf Inlay<span className="fr">Feuille d&apos;or, à la main</span><span className="desc">Hand-laid 24k leaf, sealed under top coat. Sold by the digit.</span></span>
                <span className="dur">30 min</span>
                <span className="price"><span className="from">From</span>$28<span style={{ color: 'var(--bone-mute)', fontSize: '12px' }}>/nail</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 LASH */}
      <section className="cat flip" id="lash" data-screen-label="06 Lash">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 04 — Lash · Cils & Sourcils</div>
            <h2>Lash & Brow<br />Sanctuary<span className="fr">Le sanctuaire des cils</span></h2>
            <p className="sensory">"Hand-mapped lash extensions, a quiet brow lamination room, lash lift & tint by senior artists."</p>
            <p className="body">Every lash set begins with a paper map — one for each eye. We measure, we draw, we choose the curl by hand, then we lay each extension under low light, in our own quiet pacing. Forty-five minutes that change the rest of your week.</p>
            <span className="room"><span className="dot"></span>Room N° 05 — Low light, reclining chair</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/lash-1.jpg"
                alt="Lash sanctuary"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Lash · Doll lash, hand-mapped</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">Classic Lash Set<span className="fr">Pose classique</span><span className="desc">One-to-one, hand-mapped per eye. Veil-soft, holds three weeks.</span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name">Volume Set, Russian<span className="fr">Volume russe</span><span className="desc">Fan-built at the chair, 2D–6D depending on natural lash. Editorial finish.</span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$245</span>
              </div>
              <div className="row">
                <span className="name">Lash Lift & Tint<span className="fr">Rehaussement & teinture</span><span className="desc">Keratin lift, six-week hold. The morning-after look, without effort.</span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$140</span>
              </div>
              <div className="row">
                <span className="name">Brow Lamination & Shape<span className="fr">Lamination des sourcils</span><span className="desc">Set, tint, hand-shape, finish. The brow you wake up wanting.</span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$125</span>
              </div>
            </div>

            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name">Two-week lash fill <span className="fr">remplissage</span></span><span className="v">$95</span></div>
              <div className="row"><span className="name">Brow tint only <span className="fr">teinture sourcils</span></span><span className="v">$48</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 ESTHETICS */}
      <section className="cat" id="face" data-screen-label="07 Esthetics">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 05 — Esthetics · Esthétique</div>
            <h2>Esthetics &<br />Skin Alchemy<span className="fr">L&apos;alchimie de la peau</span></h2>
            <p className="sensory">"We read the skin first, then we treat it. Always in that order — never in reverse."</p>
            <p className="body">A dedicated skin room with its own dimmable light, an LED canopy, and a HydraFacial unit kept in clinical condition. Every facial begins with a fifteen-minute read — sebum, hydration, surface map — by an aesthetician trained at IDI Montréal. Then, and only then, do we begin.</p>
            <span className="room"><span className="dot"></span>Room N° 06 — Dimmable, LED canopy</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/face-1.jpg"
                alt="Skin alchemy"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Esthetics · Skin, read first</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">The Signature HydraFacial<span className="fr">L&apos;HydraFacial signature</span><span className="desc">Cleanse, extract, hydrate, plump. Sixty quiet minutes, no needles.</span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$215</span>
              </div>
              <div className="row">
                <span className="name">Dermaplane & Glow<span className="fr">Dermaplane & éclat</span><span className="desc">Scalpel-fine exfoliation, vitamin-C infusion, ten minutes of cryo-globe.</span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$165</span>
              </div>
              <div className="row">
                <span className="name">Retinol-Sequenced Peel<span className="fr">Peeling à séquence</span><span className="desc">A four-week course of light peels, sequenced to your skin&apos;s cadence.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$295</span>
              </div>
              <div className="row">
                <span className="name">LED & Lymphatic, Quiet<span className="fr">LED & drainage</span><span className="desc">Red-light canopy with manual lymphatic drainage. Pure recovery, no extractions.</span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$245</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 SPA */}
      <section className="cat flip" id="spa" data-screen-label="08 Spa">
        <div className="cat-inner">
          <div className="cat-copy">
            <div className="num">N° 06 — Wellness · Bien-être</div>
            <h2>Wellness &<br />Body Rituals<span className="fr">Les rituels du corps</span></h2>
            <p className="sensory">"Lymphatic drainage, body contouring, scalp rituals, and the kind of massage that resets the week."</p>
            <p className="body">The long bath room sits at the back of the atelier, north-facing, behind two doors and a curtain of heavy linen. Heated stone, eucalyptus, candle-light. We don&apos;t take phones in this room — they wait, in a small linen pouch, on a teak shelf, by the door.</p>
            <span className="room"><span className="dot"></span>Room N° 07 — The long bath, two doors</span>
          </div>

          <div className="cat-right">
            <div className="cat-img">
              <Image
                src="/img/spa-3.jpg"
                alt="Wellness ritual"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Wellness · The long bath, north-facing</span>
            </div>
            <div className="cat-list">
              <div className="row">
                <span className="name">The Long Bath<span className="fr">Le long bain</span><span className="desc">Eucalyptus steam, hot stone, scalp ritual, herbal infusion to finish.</span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$245</span>
              </div>
              <div className="row">
                <span className="name">Lymphatic Drainage<span className="fr">Drainage lymphatique</span><span className="desc">Full-body manual technique. Two cushions, low light, a long exhale.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$195</span>
              </div>
              <div className="row">
                <span className="name">The Reset Massage<span className="fr">Massage de remise</span><span className="desc">Deep-tissue, by request only firmer. The end-of-week prescription.</span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$175</span>
              </div>
              <div className="row">
                <span className="name">Body Contour & Glow<span className="fr">Contour & éclat</span><span className="desc">Dry-brush, vacuum massage, body oil ritual. Visible, gradual, gentle.</span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$285</span>
              </div>
              <div className="row">
                <span className="name">Two-Person Ritual<span className="fr">Le rituel à deux</span><span className="desc">Twin beds, two therapists, side by side. For the visit you take together.</span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$485</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOUSE NOTE */}
      <section className="house-note" data-screen-label="09 House note">
        <p>
          Every visit includes a fifteen-minute <span className="gold">welcome</span>, a robe of heavy linen, a spritz of the house élixir at the end, and a small linen pouch of what you&apos;ll need at home for the next two weeks.
          <span className="fr">Chaque visite inclut un accueil de quinze minutes, un peignoir de lin lourd, un voile d&apos;élixir maison, et une petite pochette en lin pour la maison.</span>
        </p>
      </section>

      {/* CTA */}
      <section className="cta-section" data-screen-label="10 CTA" style={{ padding: '160px 48px' }}>
        <div className="eyebrow cta-eyebrow"><span className="dot"></span>Twelve guests per day · Douze invités par jour</div>
        <h2>The brass door is open<br />for the menu you choose.<span className="fr">La porte est ouverte — pour le menu que vous choisissez.</span></h2>
        <Link href="/contact" className="btn-gold">
          <span>Book Your Ritual</span>
          <span className="fr">Réservez votre rituel</span>
          <span className="arrow">→</span>
        </Link>
      </section>
    </>
  )
}
