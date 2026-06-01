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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">The Signature Cut</span><span className="fr">La coupe maison</span><span className="desc"><span className="en-only">Consultation, wash, scalp massage, dry-finished cut, in-chair coffee.</span>
<span className="fr-block">Consultation, lavage, massage du cuir chevelu, coupe finie à sec, café au fauteuil.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Slow Colour, Single Process</span><span className="fr">Couleur lente, un procédé</span><span className="desc"><span className="en-only">Mixed at the chair, applied in layers, bond therapy at every wash.</span>
<span className="fr-block">Mélangé au fauteuil, appliqué en couches, thérapie de liaison à chaque lavage.</span></span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$225</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Dimensional Highlights</span><span className="fr">Balayage dimensionnel</span><span className="desc"><span className="en-only">Hand-painted, free-hand. Veil-fine for first-timers, dense for the return guest.</span>
<span className="fr-block">Peint à la main, libre. Voile fin pour les premières fois, dense pour l’invité de retour.</span></span></span>
                <span className="dur">3h30</span>
                <span className="price"><span className="from">From</span>$345</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">The Restoration</span><span className="fr">La restauration</span><span className="desc"><span className="en-only">Three-stage Olaplex with steam, glaze, and a heavy mask. For hair that&apos;s been through it.</span>
<span className="fr-block">Olaplex en trois étapes avec vapeur, glaze et masque lourd. Pour les cheveux qui ont tout vécu.</span></span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$165</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Bridal — The Morning Of</span><span className="fr">Le matin du mariage</span><span className="desc"><span className="en-only">Style consultation, on-site or in-room. Includes touch-up kit + a quiet champagne.</span>
<span className="fr-block">Consultation de style, sur place ou en salle. Comprend trousse de retouche + un champagne discret.</span></span></span>
                <span className="dur">3h</span>
                <span className="price"><span className="from">From</span>$420</span>
              </div>
            </div>

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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">The Saturday Cut</span><span className="fr">La coupe du samedi</span><span className="desc"><span className="en-only">Scissor over comb, dry-checked, finished with a hot towel and cedar after-balm.</span>
<span className="fr-block">Ciseaux sur peigne, vérifié à sec, fini à la serviette chaude et au baume après-rasage au cèdre.</span></span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$95</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Beard Architecture</span><span className="fr">L&apos;architecture du visage</span><span className="desc"><span className="en-only">Hand-shaped with straight razor, balm-conditioned, finished with cedar.</span>
<span className="fr-block">Façonné à la main au rasoir droit, conditionné au baume, fini au cèdre.</span></span></span>
                <span className="dur">45 min</span>
                <span className="price"><span className="from">From</span>$65</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Hot-Towel Royal Shave</span><span className="fr">Rasage royal</span><span className="desc"><span className="en-only">Three hot towels, two passes, balm-and-balm finish. The Saturday morning fix.</span>
<span className="fr-block">Trois serviettes chaudes, deux passages, finition baume sur baume. Le rituel du samedi matin.</span></span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$110</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Father & Son</span><span className="fr">Père et fils</span><span className="desc"><span className="en-only">Two chairs, two cuts, one quiet hour. For the boy whose first chair is yours.</span>
<span className="fr-block">Deux fauteuils, deux coupes, une heure feutrée. Pour le garçon dont le premier fauteuil est le vôtre.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$155</span>
              </div>
            </div>

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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">The Couture Manicure</span><span className="fr">La manucure couture</span><span className="desc"><span className="en-only">Cuticle work, hand & arm massage, builder-gel polish or BIAB structure.</span>
<span className="fr-block">Travail des cuticules, massage des mains et des bras, vernis au gel de construction ou structure BIAB.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$110</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Sculpted Set, Custom Form</span><span className="fr">Ongles sculptés sur mesure</span><span className="desc"><span className="en-only">Free-hand from gel, sanded and shaped by eye. Custom inlays on request.</span>
<span className="fr-block">Main libre au gel, poncé et façonné à l’œil. Incrustations sur mesure sur demande.</span></span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Pedicure, Slow</span><span className="fr">Pédicure lente</span><span className="desc"><span className="en-only">Salt soak, callus work, paraffin wrap, hot stone foot massage.</span>
<span className="fr-block">Trempage au sel, travail des callosités, enveloppement à la paraffine, massage des pieds aux pierres chaudes.</span></span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$135</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Gold-leaf Inlay</span><span className="fr">Feuille d&apos;or, à la main</span><span className="desc"><span className="en-only">Hand-laid 24k leaf, sealed under top coat. Sold by the digit.</span>
<span className="fr-block">Feuille d’or 24 carats posée à la main, scellée sous couche de finition. Vendue à l’unité.</span></span></span>
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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">Classic Lash Set</span><span className="fr">Pose classique</span><span className="desc"><span className="en-only">One-to-one, hand-mapped per eye. Veil-soft, holds three weeks.</span>
<span className="fr-block">Un à un, cartographié à la main par œil. Doux comme un voile, tient trois semaines.</span></span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$185</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Volume Set, Russian</span><span className="fr">Volume russe</span><span className="desc"><span className="en-only">Fan-built at the chair, 2D–6D depending on natural lash. Editorial finish.</span>
<span className="fr-block">Volume en éventail au fauteuil, 2D–6D selon le cil naturel. Finition éditoriale.</span></span></span>
                <span className="dur">2h30</span>
                <span className="price"><span className="from">From</span>$245</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Lash Lift & Tint</span><span className="fr">Rehaussement & teinture</span><span className="desc"><span className="en-only">Keratin lift, six-week hold. The morning-after look, without effort.</span>
<span className="fr-block">Rehaussement à la kératine, tenue de six semaines. Le regard du lendemain matin, sans effort.</span></span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$140</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Brow Lamination & Shape</span><span className="fr">Lamination des sourcils</span><span className="desc"><span className="en-only">Set, tint, hand-shape, finish. The brow you wake up wanting.</span>
<span className="fr-block">Pose, teinture, façonnage à la main, finition. Le sourcil dont vous vous réveillez en rêvant.</span></span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$125</span>
              </div>
            </div>

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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">The Signature HydraFacial</span><span className="fr">L&apos;HydraFacial signature</span><span className="desc"><span className="en-only">Cleanse, extract, hydrate, plump. Sixty quiet minutes, no needles.</span>
<span className="fr-block">Nettoyer, extraire, hydrater, repulper. Soixante minutes feutrées, sans aiguilles.</span></span></span>
                <span className="dur">1h15</span>
                <span className="price"><span className="from">From</span>$215</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Dermaplane & Glow</span><span className="fr">Dermaplane & éclat</span><span className="desc"><span className="en-only">Scalpel-fine exfoliation, vitamin-C infusion, ten minutes of cryo-globe.</span>
<span className="fr-block">Exfoliation fine au scalpel, infusion de vitamine C, dix minutes de globe cryogénique.</span></span></span>
                <span className="dur">1h</span>
                <span className="price"><span className="from">From</span>$165</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Retinol-Sequenced Peel</span><span className="fr">Peeling à séquence</span><span className="desc"><span className="en-only">A four-week course of light peels, sequenced to your skin&apos;s cadence.</span>
<span className="fr-block">Un parcours de quatre semaines de peelings légers, séquencés au rythme de votre peau.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$295</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">LED & Lymphatic, Quiet</span><span className="fr">LED & drainage</span><span className="desc"><span className="en-only">Red-light canopy with manual lymphatic drainage. Pure recovery, no extractions.</span>
<span className="fr-block">Canopée à lumière rouge avec drainage lymphatique manuel. Récupération pure, sans extractions.</span></span></span>
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
            <div className="cat-list">
              <div className="row">
                <span className="name"><span className="en-only">The Long Bath</span><span className="fr">Le long bain</span><span className="desc"><span className="en-only">Eucalyptus steam, hot stone, scalp ritual, herbal infusion to finish.</span>
<span className="fr-block">Vapeur d’eucalyptus, pierre chaude, rituel du cuir chevelu, infusion aux herbes pour finir.</span></span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$245</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Lymphatic Drainage</span><span className="fr">Drainage lymphatique</span><span className="desc"><span className="en-only">Full-body manual technique. Two cushions, low light, a long exhale.</span>
<span className="fr-block">Technique manuelle du corps entier. Deux coussins, lumière basse, une longue expiration.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$195</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">The Reset Massage</span><span className="fr">Massage de remise</span><span className="desc"><span className="en-only">Deep-tissue, by request only firmer. The end-of-week prescription.</span>
<span className="fr-block">Tissus profonds, sur demande seulement plus ferme. La prescription de fin de semaine.</span></span></span>
                <span className="dur">1h30</span>
                <span className="price"><span className="from">From</span>$175</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Body Contour & Glow</span><span className="fr">Contour & éclat</span><span className="desc"><span className="en-only">Dry-brush, vacuum massage, body oil ritual. Visible, gradual, gentle.</span>
<span className="fr-block">Brossage à sec, massage par aspiration, rituel d’huile corporelle. Visible, graduel, doux.</span></span></span>
                <span className="dur">1h45</span>
                <span className="price"><span className="from">From</span>$285</span>
              </div>
              <div className="row">
                <span className="name"><span className="en-only">Two-Person Ritual</span><span className="fr">Le rituel à deux</span><span className="desc"><span className="en-only">Twin beds, two therapists, side by side. For the visit you take together.</span>
<span className="fr-block">Lits jumeaux, deux thérapeutes, côte à côte. Pour la visite que vous partagez.</span></span></span>
                <span className="dur">2h</span>
                <span className="price"><span className="from">From</span>$485</span>
              </div>
            </div>
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
        <Link href="/contact" className="btn-gold">
          <span>Book Your Ritual</span>
          <span className="fr">Réservez votre rituel</span>
          <span className="arrow">→</span>
        </Link>
      </section>
    </>
  )
}
