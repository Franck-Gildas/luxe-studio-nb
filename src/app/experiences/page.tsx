'use client'

import '@/styles/experiences.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ExperiencesPage() {
  return (
    <>
      <div className="grain"></div>

      {/* HERO */}
      <section className="exp-hero" data-screen-label="01 Experiences Hero">
        <div className="exp-hero-inner">
          <div className="exp-hero-meta">
            <span><span className="v">◇ Le rituel</span> · Five quiet movements</span>
            <span>Page <span className="v">05 / 06</span></span>
          </div>
          <div className="exp-hero-grid">
            <div className="exp-hero-copy">
              <h1 data-reveal>
                <span className="en-only">The Ritual.</span>
                <span className="fr-block">Le Rituel.</span>
              </h1>
              <p className="hero-tagline">
                <span className="en-only">Five quiet movements, every visit.</span>
                <span className="fr-block">Cinq mouvements lents, à chaque visite.</span>
              </p>
              <p className="lede"><span className="en-only">Every visit, regardless of which menu you&apos;ve chosen, follows the same five quiet movements.
                They were not invented; they were noticed — across fifteen years of work in other people&apos;s rooms, in the
                moments we&apos;d return to in our minds.</span>
<span className="fr-block">Chaque visite, peu importe le menu choisi, suit les cinq mêmes mouvements feutrés. Ils n’ont pas été inventés ; ils ont été remarqués — au fil de quinze ans de travail dans les salles des autres, dans les instants auxquels nous revenions en pensée.</span></p>
            </div>
            <ol className="hero-timeline" aria-label="Five ritual phases">
              <li className="hero-timeline-item is-active">
                <span className="phase-num">01</span>
                <h2 className="phase-name"><span className="en-only">The Welcome</span><span className="fr">L&apos;accueil</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">02</span>
                <h2 className="phase-name"><span className="en-only">The Consultation</span><span className="fr">La consultation</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">03</span>
                <h2 className="phase-name"><span className="en-only">The Ritual</span><span className="fr">Le rituel</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">04</span>
                <h2 className="phase-name"><span className="en-only">The Finish</span><span className="fr">La touche finale</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">05</span>
                <h2 className="phase-name"><span className="en-only">The After</span><span className="fr">L&apos;après</span></h2>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* THE RITUAL — 5 MOVEMENTS */}
      <section className="ritual-section" data-screen-label="02 The Ritual">
        <div className="ritual-stage">
          <div className="ritual-copy">
            <div className="num">§ 01 — The Ritual · Le rituel</div>
            <h2 data-reveal>
              <span className="en-only">
                The same five<br />quiet movements.
              </span>
              <span className="fr">Les cinq mouvements de la maison.</span>
            </h2>
            <p><span className="en-only">&quot;Whatever the room, whichever the artist, however quick or long the menu — the cadence does not change. The
              room holds the cadence; the artist holds the room.&quot;</span>
<span className="fr-block">« Quelle que soit la salle, quel que soit l’artiste, quel que soit le menu, bref ou long — le rythme ne change pas. La salle tient le rythme ; l’artiste tient la salle. »</span></p>
            <div className="totals">
              <div className="item">
                <div className="n" data-counter="5">5</div>
                <div className="l">Movements<br />Mouvements</div>
              </div>
              <div className="item">
                <div className="n">~15</div>
                <div className="l">Welcome &amp; after<br />Accueil &amp; après</div>
              </div>
              <div className="item">
                <div className="n">1:1</div>
                <div className="l">Artist · guest<br />Artiste : invité</div>
              </div>
              <div className="item">
                <div className="n" data-counter="0">0</div>
                <div className="l">Phones at the chair<br />Sans téléphone</div>
              </div>
            </div>
          </div>

          <div className="movements" data-stagger>
            <div className="movement">
              <div>
                <div className="phase">Phase 01 · L&apos;accueil</div>
                <h3><span className="en-only">The Welcome</span><span className="fr">L&apos;accueil</span></h3>
                <p><span className="en-only">You arrive ten minutes early to nothing. A robe of heavy linen, a glass of cucumber water, low Erik
                  Satie. The door closes; the city ends. Your phone is offered a small linen pouch on a teak shelf, by the
                  door.</span>
<span className="fr-block">Vous arrivez dix minutes en avance dans le rien. Un peignoir de lin épais, un verre d’eau au concombre, du Satie tout bas. La porte se ferme ; la ville s’arrête. Votre téléphone se voit offrir une petite pochette de lin sur une étagère en teck, près de la porte.</span></p>
                <div className="sensory"><span>Linen</span><span>Cucumber water</span><span>Satie</span><span>Low light</span>
                </div>
              </div>
              <div className="img movement-img">
                <Image src="/img/atelier-interior.jpg" alt="The welcome" fill className="object-cover" sizes="200px" />
                <span className="duration">— 10 min</span>
              </div>
            </div>

            <div className="movement">
              <div>
                <div className="phase">Phase 02 · La consultation</div>
                <h3><span className="en-only">The Consultation</span><span className="fr">La consultation</span></h3>
                <p><span className="en-only">Your artist sits across from you, not behind you. We talk about the week, the light at your kitchen
                  window, the photograph in your phone you almost showed. Notes are kept; the routine that follows you home
                  is built here.</span>
<span className="fr-block">Votre artiste est en face de vous, pas derrière. Nous parlons de la semaine, de la lumière à la fenêtre de votre cuisine, de la photo dans votre téléphone que vous avez failli montrer. Des notes sont tenues ; la routine qui vous suit à la maison se construit ici.</span></p>
                <div className="sensory"><span>Across</span><span>Notebook</span><span>The reference</span><span>The plan</span>
                </div>
              </div>
              <div className="img movement-img">
                <Image src="/img/staff-customer.jpg" alt="The consultation" fill className="object-cover" sizes="200px" />
                <span className="duration">15 min</span>
              </div>
            </div>

            <div className="movement">
              <div>
                <div className="phase">Phase 03 · Le rituel</div>
                <h3><span className="en-only">The Ritual</span><span className="fr">Le rituel</span></h3>
                <p><span className="en-only">The treatment itself, performed slowly, by hands that have done this fifteen thousand times. No upsell at
                  the chair, no clock visible from where you sit. Coffee or champagne, on the small marble side-table. Music
                  chosen for the room, not the playlist.</span>
<span className="fr-block">Le soin lui-même, exécuté lentement, par des mains qui l’ont fait quinze mille fois. Pas de vente additionnelle au fauteuil, pas d’horloge visible d’où vous êtes assis. Café ou champagne, sur la petite table d’appoint en marbre. Musique choisie pour la salle, pas pour la playlist.</span></p>
                <div className="sensory"><span>60 — 180 min</span><span>Marble side-table</span><span>House
                    élixir</span><span>No clock</span></div>
              </div>
              <div className="img movement-img">
                <Image src="/img/hair-1.jpg" alt="The ritual" fill className="object-cover" sizes="200px" />
                <span className="duration">60 — 180 min</span>
              </div>
            </div>

            <div className="movement">
              <div>
                <div className="phase">Phase 04 · La touche finale</div>
                <h3><span className="en-only">The Finish</span><span className="fr">La touche finale</span></h3>
                <p><span className="en-only">The mirror is turned, the light is changed once, twice. A spritz of the house élixir on the linen of your
                  robe, a final brush, a photograph for your records — only if you&apos;d like. The artist asks the only question
                  that matters: <em>is it yours?</em></span>
<span className="fr-block">Le miroir est tourné, la lumière est modifiée une fois, deux fois. Une brume de l’élixir maison sur le lin de votre peignoir, une dernière brosse, une photographie pour vos archives — seulement si vous le souhaitez. L’artiste pose la seule question qui compte : est-ce à vous ?</span></p>
                <div className="sensory"><span>Mirror</span><span>House élixir</span><span>Soft photograph</span><span>One
                    question</span></div>
              </div>
              <div className="img movement-img">
                <Image src="/img/face-1.jpg" alt="The finish" fill className="object-cover" sizes="200px" />
                <span className="duration">10 min</span>
              </div>
            </div>

            <div className="movement">
              <div>
                <div className="phase">Phase 05 · L&apos;après</div>
                <h3><span className="en-only">The After</span><span className="fr">L&apos;après</span></h3>
                <p><span className="en-only">Tea on the velvet bench by the brass door. A small linen pouch of what you&apos;ll need at home for the next
                  two weeks. Your next visit, already softly held — in the artist&apos;s calendar, in your name, at the hour we
                  both know is yours.</span>
<span className="fr-block">Thé sur le banc de velours près de la porte de laiton. Une petite pochette de lin de ce dont vous aurez besoin à la maison pour les deux prochaines semaines. Votre prochaine visite, déjà doucement retenue — dans l’agenda de l’artiste, à votre nom, à l’heure que nous savons tous les deux être la vôtre.</span></p>
                <div className="sensory"><span>Velvet bench</span><span>Tea</span><span>Linen pouch</span><span>Held
                    appointment</span></div>
              </div>
              <div className="img movement-img">
                <Image src="/img/spa-5.jpg" alt="The after" fill className="object-cover" sizes="200px" />
                <span className="duration">— 15 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GIFT CARDS */}
      <section className="giftcards" data-screen-label="03 Gift Cards">
        <div className="gc-head">
          <div>
            <div className="num">§ 02 — Gift cards · Cartes-cadeaux</div>
            <h2 data-reveal>
              <span className="en-only">
                Give the <em>hour</em>,<br />not the thing.
              </span>
              <span className="fr">Offrez l&apos;heure — pas la chose.</span>
            </h2>
          </div>
          <p><span className="en-only"><strong>House cards are presented in a linen envelope</strong>, hand-addressed by Émilie, and delivered by post
            or in person at the brass door. The recipient books at their cadence — the card holds for two years from the
            date of issue. <em className="italic" style={{ color: 'var(--rose)' }}>Vous pouvez aussi nous écrire pour un montant sur
              mesure.</em></span>
<span className="fr-block">Les cartes maison sont présentées dans une enveloppe de lin, adressées à la main par Émilie, et remises par la poste ou en personne à la porte de laiton. Le destinataire réserve à son rythme — la carte est valide deux ans à compter de la date d’émission. Vous pouvez aussi nous écrire pour un montant sur mesure.</span></p>
        </div>

        <div className="gc-grid" data-stagger>
          <article className="gc-card bronze gc-flip">
            <div className="gc-flip-inner">
              <div className="gc-flip-front">
                <div className="seal">N°</div>
                <div className="top"><span>Carte cadeau N° 01</span><span className="v">Bronze</span></div>
                <div className="amt"><span className="cur">CAD</span>185</div>
                <h3><span className="en-only">The Hour</span><span className="fr">Une heure</span></h3>
                <p><span className="en-only">One signature service, by the artist of their choosing. A welcome, a robe, a quiet hour, the house élixir to
                  take home.</span>
<span className="fr-block">Un service signature, par l’artiste de son choix. Un accueil, un peignoir, une heure feutrée, l’élixir maison à emporter.</span></p>
                <div className="foot"><span>◇ Holds for 24 months</span><span>Linen envelope</span></div>
              </div>
              <div className="gc-flip-back">
                <div className="amt"><span className="cur">CAD</span>185</div>
                <p><span className="en-only">One signature service, by the artist of their choosing. A welcome, a robe, a quiet hour, the house élixir to take home.</span>
<span className="fr-block">Un service signature, par l’artiste de son choix. Un accueil, un peignoir, une heure feutrée, l’élixir maison à emporter.</span></p>
                <Link href="/contact" className="btn-ghost gc-back-cta">
                  <span>Order a Card</span>
                  <span className="arrow" style={{ marginLeft: "8px" }}>→</span>
                </Link>
              </div>
            </div>
          </article>

          <article className="gc-card rose gc-flip">
            <div className="gc-flip-inner">
              <div className="gc-flip-front">
                <div className="seal">N°</div>
                <div className="top"><span>Carte cadeau N° 02</span><span className="v">Rose</span></div>
                <div className="amt"><span className="cur">CAD</span>385</div>
                <h3><span className="en-only">The Long Afternoon</span><span className="fr">Le long après-midi</span></h3>
                <p><span className="en-only">Two services, paired by the house — hair &amp; lash, esthetics &amp; long bath. With a chilled bottle, on the
                  marble side-table.</span>
<span className="fr-block">Deux services, jumelés par la maison — cheveux et cils, esthétique et long bain. Avec une bouteille fraîche, sur la table d’appoint en marbre.</span></p>
                <div className="foot"><span>◇ Holds for 24 months</span><span>Hand-addressed</span></div>
              </div>
              <div className="gc-flip-back">
                <div className="amt"><span className="cur">CAD</span>385</div>
                <p><span className="en-only">Two services, paired by the house — hair &amp; lash, esthetics &amp; long bath. With a chilled bottle, on the marble side-table.</span>
<span className="fr-block">Deux services, jumelés par la maison — cheveux et cils, esthétique et long bain. Avec une bouteille fraîche, sur la table d’appoint en marbre.</span></p>
                <Link href="/contact" className="btn-ghost gc-back-cta">
                  <span>Order a Card</span>
                  <span className="arrow" style={{ marginLeft: "8px" }}>→</span>
                </Link>
              </div>
            </div>
          </article>

          <article className="gc-card smoke gc-flip">
            <div className="gc-flip-inner">
              <div className="gc-flip-front">
                <div className="seal">N°</div>
                <div className="top"><span>Carte cadeau N° 03</span><span className="v">Obsidian</span></div>
                <div className="amt"><span className="cur">CAD</span>785</div>
                <h3><span className="en-only">The Whole Day</span><span className="fr">La journée entière</span></h3>
                <p><span className="en-only">The full house — every room visited, with a quiet lunch in between. Four artists, six hours, the brass door
                  closed behind you.</span>
<span className="fr-block">La maison au complet — chaque salle visitée, avec un déjeuner feutré entre les deux. Quatre artistes, six heures, la porte de laiton refermée derrière vous.</span></p>
                <div className="foot"><span>◇ Holds for 24 months</span><span>By hand, by post</span></div>
              </div>
              <div className="gc-flip-back">
                <div className="amt"><span className="cur">CAD</span>785</div>
                <p><span className="en-only">The full house — every room visited, with a quiet lunch in between. Four artists, six hours, the brass door closed behind you.</span>
<span className="fr-block">La maison au complet — chaque salle visitée, avec un déjeuner feutré entre les deux. Quatre artistes, six heures, la porte de laiton refermée derrière vous.</span></p>
                <Link href="/contact" className="btn-ghost gc-back-cta">
                  <span>Order a Card</span>
                  <span className="arrow" style={{ marginLeft: "8px" }}>→</span>
                </Link>
              </div>
            </div>
          </article>
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <Link href="/contact" className="btn-ghost">
            <span>Order a Card</span>
            <span className="arrow" style={{ marginLeft: '8px' }}>→</span>
          </Link>
        </div>
      </section>

      {/* SEASONAL */}
      <section className="seasonal" data-screen-label="04 Seasonal">
        <div className="seasonal-inner">
          <div className="section-head">
            <div className="num">§ 03 — Seasonal · Saisonnier</div>
            <h2 data-reveal>
              <span className="en-only">
                What is offered now,<br />and only now.
              </span>
              <span className="fr-block">
                Ce qui est offert maintenant,<br />et seulement maintenant.
              </span>
            </h2>
          </div>

          <div className="season-grid">
            <article className="season-card" data-reveal-scale>
              <div className="movement-photo">
                <Image src="/img/spa-1.jpg" alt="Solstice ritual" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Now · Spring &apos;26</span>
                <h3><span className="en-only">The <em>Solstice</em> Bath</span><span className="fr">Le bain du solstice</span></h3>
                <p className="desc"><span className="en-only">A two-hour ritual built around the lengthening of the days — eucalyptus steam, lavender oil
                  sourced from the Memramcook valley, a small almond cake at the end. Available only through the end of
                  June.</span>
<span className="fr-block">Un rituel de deux heures autour de l’allongement des jours — vapeur d’eucalyptus, huile de lavande de la vallée de Memramcook, un petit gâteau aux amandes à la fin. Disponible seulement jusqu’à la fin de juin.</span></p>
                <div className="meta">
                  <span>Duration<span className="v">2h</span></span>
                  <span>Investment<span className="v">From $295</span></span>
                  <span>Until<span className="v">21 June</span></span>
                </div>
              </div>
            </article>

            <article className="season-card" data-reveal-scale>
              <div className="movement-photo">
                <Image src="/img/hair-5.jpg" alt="The colour study" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Spring &apos;26</span>
                <h3><span className="en-only">The Colour Study</span><span className="fr">L&apos;étude des couleurs</span></h3>
                <p className="desc"><span className="en-only">A three-sitting hair-colour deep-dive — for the guest who wants to understand the why, not
                  only the how. Includes a hand-painted reference card kept at the chair, your name on it.</span>
<span className="fr-block">Une immersion couleur en trois séances — pour l’invité qui veut comprendre le pourquoi, pas seulement le comment. Comprend une carte de référence peinte à la main conservée au fauteuil, avec votre nom.</span></p>
                <div className="meta">
                  <span>Sessions<span className="v">×3</span></span>
                  <span>From<span className="v">$485</span></span>
                </div>
              </div>
            </article>
          </div>

          <div className="season-grid alt">
            <article className="season-card" data-reveal-scale>
              <div className="movement-photo">
                <Image src="/img/lash-3.jpg" alt="Wedding atelier" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Wedding season &apos;26</span>
                <h3><span className="en-only">The Atelier on the morning of</span><span className="fr">L&apos;atelier le matin du mariage</span></h3>
                <p className="desc"><span className="en-only">Hair, lash, brow, and skin — all four artists, all four rooms, opened privately for one
                  party from 06:00. Includes a chilled bottle, a small linen breakfast, and a touch-up kit by post the day
                  before.</span>
<span className="fr-block">Cheveux, cils, sourcils et peau — les quatre artistes, les quatre salles, ouvertes en privé pour une seule fête à partir de 06 h. Comprend une bouteille fraîche, un petit déjeuner de lin et une trousse de retouche par la poste la veille.</span></p>
                <div className="meta">
                  <span>Party<span className="v">Up to 6</span></span>
                  <span>Hour<span className="v">06 — 10</span></span>
                  <span>Investment<span className="v">From $2,400</span></span>
                </div>
              </div>
            </article>

            <article className="season-card" data-reveal-scale>
              <div className="movement-photo">
                <Image src="/img/nails-2.jpg" alt="Mother's day" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Mother&apos;s Day · May &apos;26</span>
                <h3><span className="en-only">For the mother</span><span className="fr">Pour la mère</span></h3>
                <p className="desc"><span className="en-only">A two-person ritual: hands together at the manicure bar, then twin beds for the long bath.
                  Tea between, lavender after, a linen pouch each.</span>
<span className="fr-block">Un rituel à deux : les mains ensemble au bar à manucure, puis lits jumeaux pour le long bain. Thé entre les deux, lavande après, une pochette de lin chacun.</span></p>
                <div className="meta">
                  <span>Duration<span className="v">3h</span></span>
                  <span>For two<span className="v">$485</span></span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section className="memberships" data-screen-label="05 Memberships">
        <div className="mem-head">
          <div className="num">§ 04 — La maison · The house circle</div>
          <h2 data-reveal>
            <span className="en-only">
              For the regulars,<br />quietly held.
            </span>
            <span className="fr">Pour les habituées — un soin discret.</span>
          </h2>
        </div>

        <div className="mem-grid" data-stagger>
          <div className="mem">
            <div className="tier">N° 01 · L&apos;invitée</div>
            <h3><span className="en-only">The Invited</span><span className="fr">L&apos;invitée</span></h3>
            <div className="price">$185<span className="month">per month · par mois</span></div>
            <ul>
              <li>One signature service of your choosing, per month</li>
              <li>Priority booking — Tuesdays, twenty-four hours ahead of the house</li>
              <li>House élixir, refilled at every visit</li>
              <li>Hold the same hour, in the same chair</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-ghost">Join ·
                S&apos;inscrire</Link>
            </div>
          </div>

          <div className="mem featured">
            <div className="tier">N° 02 · La maison</div>
            <h3><span className="en-only">The House</span><span className="fr">La maison</span></h3>
            <div className="price">$365<span className="month">per month · par mois</span></div>
            <ul>
              <li>Two services per month, paired by the house</li>
              <li>Priority booking — Tuesdays, forty-eight hours ahead</li>
              <li>Quarterly long-bath ritual, complimentary</li>
              <li>15 % off any third service in any month</li>
              <li>A linen pouch of essentials, posted each solstice</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-gold">
                Join · S&apos;inscrire <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="mem">
            <div className="tier">N° 03 · L&apos;atelier</div>
            <h3><span className="en-only">The Atelier</span><span className="fr">L&apos;atelier</span></h3>
            <div className="price">$685<span className="month">per month · par mois</span></div>
            <ul>
              <li>Four services per month, any room of the house</li>
              <li>First call on every soft opening + seasonal release</li>
              <li>One whole-day ritual per quarter, included</li>
              <li>Two guest passes per year, for the people you love</li>
              <li>Your own number at the chair — and at the door</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-ghost">Join ·
                S&apos;inscrire</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-screen-label="06 CTA">
        <div className="eyebrow cta-eyebrow"><span className="dot"></span>The brass door is open</div>
        <h2 data-reveal>
          <span className="en-only">
            Begin your ritual,<br />at your cadence.
          </span>
          <span className="fr">Commencez votre rituel — à votre rythme.</span>
        </h2>
        <Link href="/contact" className="btn-gold">
          <span>Begin Your Ritual</span>
          <span className="fr">Commencez le rituel</span>
          <span className="arrow">→</span>
        </Link>
      </section>
    </>
  )
}
