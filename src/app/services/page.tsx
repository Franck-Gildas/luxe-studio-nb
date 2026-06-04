'use client'

import { useState } from 'react'
import '@/styles/services.css'
import Image from 'next/image'
import { BookingLink } from '@/components/ui/BookingLink'
import ServiceHighlighter from '@/components/ui/ServiceHighlighter'
import { CopyRitualSpine, ServiceMenuScroll } from '@/components/ui/RitualUi'
import MenuServiceList from '@/components/MenuServiceList'
import ShareRitualModal from '@/components/ShareRitualModal'
import { MENU_BY_SECTION, type MenuService } from '@/data/services-menu'
import { useRitualDeepLinkScroll } from '@/hooks/useRitualDeepLinkScroll'

export default function ServicesPage() {
  const [shareService, setShareService] = useState<MenuService | null>(null)
  useRitualDeepLinkScroll()

  return (
    <>
      <ServiceHighlighter />
      <ShareRitualModal
        open={!!shareService}
        service={shareService}
        onClose={() => setShareService(null)}
      />
      <div className="grain"></div>

      {/* HERO */}
      <section className="menu-hero" data-screen-label="01 Menu Hero">
        <div className="menu-hero-inner">
          <div className="menu-hero-meta">
            <span><span className="v">◇ Le menu</span> · Six houses, one roof</span>
            <span>Page <span className="v">03 / 06</span></span>
          </div>
          <h1 data-reveal>
            <span className="en-only">Six rituals. One house.</span>
            <span className="fr-block">Six rituels. Une maison.</span>
          </h1>
          <p className="hero-tagline">
            <span className="en-only">Each service, performed slowly.</span>
            <span className="fr-block">Chaque soin, exécuté lentement.</span>
          </p>
          <p className="lede"><span className="en-only">Every ritual below is performed by a senior artist, in a private room, on the cadence of an actual visit — never to a clock visible from where you sit. Prices in Canadian dollars; gratuity is included in every service.</span>
<span className="fr-block">Chaque rituel ci-dessous est exécuté par un artiste senior, dans une salle privée, au rythme d’une vraie visite — jamais au gré d’une horloge visible d’où vous êtes assis. Prix en dollars canadiens ; le pourboire est inclus dans chaque service.</span></p>
        </div>
      </section>

      {/* INDEX */}
      <nav className="menu-index" data-screen-label="02 Menu Index">
        <div className="menu-index-inner" data-stagger>
          <a href="#hair" className="menu-index-item">
            <span className="n">01 · Hair</span>
            <h4>
              <span className="en-only">Signature Hair Rituals</span>
              <span className="fr-block">Rituels capillaires signature</span>
            </h4>
            <span className="price"><span className="from">From</span>$185 · 2h30</span>
          </a>
          <a href="#barber" className="menu-index-item">
            <span className="n">02 · Barber</span>
            <h4>
              <span className="en-only">The Barbering Atelier</span>
              <span className="fr-block">L&apos;atelier du barbier</span>
            </h4>
            <span className="price"><span className="from">From</span>$95 · 1h15</span>
          </a>
          <a href="#nail" className="menu-index-item">
            <span className="n">03 · Nails</span>
            <h4>
              <span className="en-only">Nail Couture Studio</span>
              <span className="fr-block">Studio couture des ongles</span>
            </h4>
            <span className="price"><span className="from">From</span>$110 · 1h30</span>
          </a>
          <a href="#lash" className="menu-index-item">
            <span className="n">04 · Lash</span>
            <h4>
              <span className="en-only">Lash & Brow Sanctuary</span>
              <span className="fr-block">Sanctuaire des cils et sourcils</span>
            </h4>
            <span className="price"><span className="from">From</span>$140 · 2h</span>
          </a>
          <a href="#face" className="menu-index-item">
            <span className="n">05 · Esthetics</span>
            <h4>
              <span className="en-only">Skin Alchemy</span>
              <span className="fr-block">Alchimie de la peau</span>
            </h4>
            <span className="price"><span className="from">From</span>$215 · 1h45</span>
          </a>
          <a href="#spa" className="menu-index-item">
            <span className="n">06 · Wellness</span>
            <h4>
              <span className="en-only">Body Rituals</span>
              <span className="fr-block">Rituels du corps</span>
            </h4>
            <span className="price"><span className="from">From</span>$245 · 2h</span>
          </a>
        </div>
      </nav>

      {/* 01 HAIR */}
      <section className="cat" id="hair" data-screen-label="03 Hair">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-left>
            <div className="num">N° 01 — Hair · Cheveux</div>
            <h2 data-reveal>
              <span className="en-only">
                Signature<br />Hair Rituals
              </span>
              <span className="fr">Le rituel des cheveux</span>
            </h2>
            <p className="sensory">"Slow colour, custom dimensional work, and bond therapy at every wash. Your head of hair, treated like an heirloom."</p>
            <p className="body"><span className="en-only">All colour is mixed at the chair, by the artist who&apos;ll apply it. Cuts are dry-finished and re-checked at standing height. Olaplex No. 0 + No. 3 are folded into every chemical service at no extra cost.</span>
<span className="fr-block">Toute la couleur est mélangée au fauteuil, par l’artiste qui l’appliquera. Les coupes sont finies à sec et revérifiées debout. Olaplex No. 0 + No. 3 sont intégrés à chaque service chimique sans frais supplémentaires.</span></p>
            <CopyRitualSpine index="01" treatmentCount={5} />
            <span className="room"><span className="dot"></span>Room N° 02 — North light, two chairs</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/hair-1.jpg"
                alt="Hair ritual"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Hair · The slow colour, three sittings</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.hair}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name"><span className="en-only">Olaplex No. 0 + No. 3 mask</span><span className="fr">masque-soin</span></span><span className="v">+ $32</span></div>
              <div className="row"><span className="name"><span className="en-only">Hot oil & steam scalp ritual</span><span className="fr">cuir chevelu</span></span><span className="v">+ $48</span></div>
              <div className="row"><span className="name"><span className="en-only">In-room glass of wine</span><span className="fr">verre de vin</span></span><span className="v">complimentary</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 BARBER */}
      <section className="cat flip" id="barber" data-screen-label="04 Barber">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-right>
            <div className="num">N° 02 — Barber · Barbier</div>
            <h2 data-reveal>
              <span className="en-only">
                The Barbering<br />Atelier
              </span>
              <span className="fr">L&apos;atelier du barbier</span>
            </h2>
            <p className="sensory">"Hot-towel shaves, beard architecture, and the cut your grandfather used to take an hour to get right."</p>
            <p className="body"><span className="en-only">A single-chair atelier behind its own door. Straight razor, badger brush, cedar after-balm. The cut takes the time it takes; the conversation is yours to set the tempo of. A tumbler of something dark, on request.</span>
<span className="fr-block">Un atelier à un seul fauteuil derrière sa propre porte. Rasoir droit, blaireau, baume après-rasage au cèdre. La coupe prend le temps qu’elle prend ; la conversation est à vous pour en fixer le tempo. Un verre de quelque chose de sombre, sur demande.</span></p>
            <CopyRitualSpine index="02" treatmentCount={4} />
            <span className="room"><span className="dot"></span>Room N° 04 — The barbier, single chair</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/barber-1.jpg"
                alt="Barber atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Barber · The chair, single seat</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.barber}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name"><span className="en-only">Brow & ear groom</span><span className="fr">détails</span></span><span className="v">+ $18</span></div>
              <div className="row"><span className="name"><span className="en-only">Cedar after-balm massage</span><span className="fr">baume cèdre</span></span><span className="v">+ $25</span></div>
              <div className="row"><span className="name"><span className="en-only">A finger of single malt</span><span className="fr">whisky de la maison</span></span><span className="v">complimentary</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 NAILS */}
      <section className="cat" id="nail" data-screen-label="05 Nails">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-left>
            <div className="num">N° 03 — Nails · Ongles</div>
            <h2 data-reveal>
              <span className="en-only">
                Nail<br />Couture Studio
              </span>
              <span className="fr">Couture des ongles</span>
            </h2>
            <p className="sensory">"Builder gel, sculpted forms, custom inlays. Ninety minutes off the phone, hands you&apos;ll catch yourself glancing at all week."</p>
            <p className="body"><span className="en-only">A two-chair atelier behind a curtain of smoked glass. Every set is sculpted, not extended — the form is built fresh from gel, sanded by hand, and finished under cold light. We don&apos;t do quick fixes here; we do hands you&apos;ll forget aren&apos;t part of you.</span>
<span className="fr-block">Un atelier à deux fauteuils derrière un rideau de verre fumé. Chaque pose est sculptée, non étendue — la forme est bâtie neuve au gel, poncée à la main et finie sous lumière froide. Nous ne faisons pas de raccourcis ici ; nous faisons des mains que vous oublierez ne pas être les vôtres.</span></p>
            <CopyRitualSpine index="03" treatmentCount={4} />
            <span className="room"><span className="dot"></span>Room N° 03 — Smoked glass, two chairs</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/nails-5.jpg"
                alt="Nail couture"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Nails · Gilded almond, builder gel</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.nail}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
          </div>
        </div>
      </section>

      {/* 04 LASH */}
      <section className="cat flip" id="lash" data-screen-label="06 Lash">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-right>
            <div className="num">N° 04 — Lash · Cils & Sourcils</div>
            <h2 data-reveal>
              <span className="en-only">
                Lash & Brow<br />Sanctuary
              </span>
              <span className="fr">Le sanctuaire des cils</span>
            </h2>
            <p className="sensory">"Hand-mapped lash extensions, a quiet brow lamination room, lash lift & tint by senior artists."</p>
            <p className="body"><span className="en-only">Every lash set begins with a paper map — one for each eye. We measure, we draw, we choose the curl by hand, then we lay each extension under low light, in our own quiet pacing. Forty-five minutes that change the rest of your week.</span>
<span className="fr-block">Chaque pose de cils commence par une carte papier — une par œil. Nous mesurons, nous dessinons, nous choisissons la courbure à la main, puis nous posons chaque extension sous lumière basse, à notre propre rythme feutré. Quarante-cinq minutes qui transforment le reste de votre semaine.</span></p>
            <CopyRitualSpine index="04" treatmentCount={4} />
            <span className="room"><span className="dot"></span>Room N° 05 — Low light, reclining chair</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/lash-1.jpg"
                alt="Lash sanctuary"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Lash · Doll lash, hand-mapped</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.lash}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
            <div className="addons">
              <h5>◇ House additions · Petits ajouts</h5>
              <div className="row"><span className="name"><span className="en-only">Two-week lash fill</span><span className="fr">remplissage</span></span><span className="v">$95</span></div>
              <div className="row"><span className="name"><span className="en-only">Brow tint only</span><span className="fr">teinture sourcils</span></span><span className="v">$48</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 ESTHETICS */}
      <section className="cat" id="face" data-screen-label="07 Esthetics">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-left>
            <div className="num">N° 05 — Esthetics · Esthétique</div>
            <h2 data-reveal>
              <span className="en-only">
                Esthetics &<br />Skin Alchemy
              </span>
              <span className="fr">L&apos;alchimie de la peau</span>
            </h2>
            <p className="sensory">"We read the skin first, then we treat it. Always in that order — never in reverse."</p>
            <p className="body"><span className="en-only">A dedicated skin room with its own dimmable light, an LED canopy, and a HydraFacial unit kept in clinical condition. Every facial begins with a fifteen-minute read — sebum, hydration, surface map — by an aesthetician trained at IDI Montréal. Then, and only then, do we begin.</span>
<span className="fr-block">Une salle de peau dédiée avec sa propre lumière graduable, une canopée LED et une unité HydraFacial tenue en condition clinique. Chaque soin du visage commence par une lecture de quinze minutes — sébum, hydratation, carte de surface — par une esthéticienne formée à l’IDI Montréal. Ensuite, et seulement ensuite, nous commençons.</span></p>
            <CopyRitualSpine index="05" treatmentCount={4} />
            <span className="room"><span className="dot"></span>Room N° 06 — Dimmable, LED canopy</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/face-1.jpg"
                alt="Skin alchemy"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Esthetics · Skin, read first</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.face}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
          </div>
        </div>
      </section>

      {/* 06 SPA */}
      <section className="cat flip" id="spa" data-screen-label="08 Spa">
        <div className="cat-inner">
          <div className="cat-copy" data-reveal-right>
            <div className="num">N° 06 — Wellness · Bien-être</div>
            <h2 data-reveal>
              <span className="en-only">
                Wellness &<br />Body Rituals
              </span>
              <span className="fr">Les rituels du corps</span>
            </h2>
            <p className="sensory">"Lymphatic drainage, body contouring, scalp rituals, and the kind of massage that resets the week."</p>
            <p className="body"><span className="en-only">The long bath room sits at the back of the atelier, north-facing, behind two doors and a curtain of heavy linen. Heated stone, eucalyptus, candle-light. We don&apos;t take phones in this room — they wait, in a small linen pouch, on a teak shelf, by the door.</span>
<span className="fr-block">La salle du long bain est au fond de l’atelier, orientée au nord, derrière deux portes et un rideau de lin épais. Pierre chauffée, eucalyptus, lumière de bougies. Nous ne prenons pas les téléphones dans cette salle — ils attendent, dans une petite pochette de lin, sur une étagère en teck, près de la porte.</span></p>
            <CopyRitualSpine index="06" treatmentCount={5} />
            <span className="room"><span className="dot"></span>Room N° 07 — The long bath, two doors</span>
          </div>

          <div className="cat-right">
            <div className="cat-img" data-reveal-scale>
              <Image
                src="/img/spa-3.jpg"
                alt="Wellness ritual"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <span className="label">Wellness · The long bath, north-facing</span>
            </div>
            <ServiceMenuScroll>
            <MenuServiceList
              services={MENU_BY_SECTION.spa}
              onShare={setShareService}
            />
            </ServiceMenuScroll>
          </div>
        </div>
      </section>

      {/* HOUSE NOTE */}
      <section className="house-note" data-screen-label="09 House note">
        <p data-reveal>
          <span className="en-only">
            Every visit includes a fifteen-minute <span className="gold">welcome</span>, a robe of heavy linen, a spritz of the house élixir at the end, and a small linen pouch of what you&apos;ll need at home for the next two weeks.
          </span>
          <span className="fr">Chaque visite inclut un accueil de quinze minutes, un peignoir de lin lourd, un voile d&apos;élixir maison, et une petite pochette en lin pour la maison.</span>
        </p>
      </section>

      {/* CTA */}
      <section className="cta-section" data-screen-label="10 CTA">
        <div className="eyebrow cta-eyebrow"><span className="dot"></span>Twelve guests per day · Douze invités par jour</div>
        <h2 data-reveal>
          <span className="en-only">
            The brass door is open<br />for the menu you choose.
          </span>
          <span className="fr">La porte est ouverte — pour le menu que vous choisissez.</span>
        </h2>
        <BookingLink className="btn-gold">
          <span>Book Your Ritual</span>
          <span className="fr">Réservez votre rituel</span>
          <span className="arrow">→</span>
        </BookingLink>
      </section>
    </>
  )
}
