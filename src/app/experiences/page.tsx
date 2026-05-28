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
              <h1>
                The<br />
                <em>Ritual.</em>
                <span className="fr">Le rituel — cinq mouvements lents.</span>
              </h1>
              <p className="lede">Every visit, regardless of which menu you&apos;ve chosen, follows the same five quiet movements.
                They were not invented; they were noticed — across fifteen years of work in other people&apos;s rooms, in the
                moments we&apos;d return to in our minds.</p>
            </div>
            <ol className="hero-timeline" aria-label="Five ritual phases">
              <li className="hero-timeline-item is-active">
                <span className="phase-num">01</span>
                <h2 className="phase-name">The Welcome<span className="fr">L&apos;accueil</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">02</span>
                <h2 className="phase-name">The Consultation<span className="fr">La consultation</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">03</span>
                <h2 className="phase-name">The Ritual<span className="fr">Le rituel</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">04</span>
                <h2 className="phase-name">The Finish<span className="fr">La touche finale</span></h2>
              </li>
              <li className="hero-timeline-item">
                <span className="phase-num">05</span>
                <h2 className="phase-name">The After<span className="fr">L&apos;après</span></h2>
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
            <h2>The same five<br />quiet movements.<span className="fr">Les cinq mouvements de la maison.</span></h2>
            <p>&quot;Whatever the room, whichever the artist, however quick or long the menu — the cadence does not change. The
              room holds the cadence; the artist holds the room.&quot;</p>
            <div className="totals">
              <div className="item">
                <div className="n">5</div>
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
                <div className="n">0</div>
                <div className="l">Phones at the chair<br />Sans téléphone</div>
              </div>
            </div>
          </div>

          <div className="movements">
            <div className="movement">
              <div>
                <div className="phase">Phase 01 · L&apos;accueil</div>
                <h3>The Welcome<span className="fr">L&apos;accueil</span></h3>
                <p>You arrive ten minutes early to nothing. A robe of heavy linen, a glass of cucumber water, low Erik
                  Satie. The door closes; the city ends. Your phone is offered a small linen pouch on a teak shelf, by the
                  door.</p>
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
                <h3>The Consultation<span className="fr">La consultation</span></h3>
                <p>Your artist sits across from you, not behind you. We talk about the week, the light at your kitchen
                  window, the photograph in your phone you almost showed. Notes are kept; the routine that follows you home
                  is built here.</p>
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
                <h3>The Ritual<span className="fr">Le rituel</span></h3>
                <p>The treatment itself, performed slowly, by hands that have done this fifteen thousand times. No upsell at
                  the chair, no clock visible from where you sit. Coffee or champagne, on the small marble side-table. Music
                  chosen for the room, not the playlist.</p>
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
                <h3>The Finish<span className="fr">La touche finale</span></h3>
                <p>The mirror is turned, the light is changed once, twice. A spritz of the house élixir on the linen of your
                  robe, a final brush, a photograph for your records — only if you&apos;d like. The artist asks the only question
                  that matters: <em>is it yours?</em></p>
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
                <h3>The After<span className="fr">L&apos;après</span></h3>
                <p>Tea on the velvet bench by the brass door. A small linen pouch of what you&apos;ll need at home for the next
                  two weeks. Your next visit, already softly held — in the artist&apos;s calendar, in your name, at the hour we
                  both know is yours.</p>
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
            <h2>Give the <em>hour</em>,<br />not the thing.<span className="fr">Offrez l&apos;heure — pas la chose.</span></h2>
          </div>
          <p><strong>House cards are presented in a linen envelope</strong>, hand-addressed by Émilie, and delivered by post
            or in person at the brass door. The recipient books at their cadence — the card holds for two years from the
            date of issue. <em className="italic" style={{ color: 'var(--rose)' }}>Vous pouvez aussi nous écrire pour un montant sur
              mesure.</em></p>
        </div>

        <div className="gc-grid">
          <article className="gc-card bronze">
            <div className="seal">N°</div>
            <div className="top"><span>Carte cadeau N° 01</span><span className="v">Bronze</span></div>
            <div className="amt"><span className="cur">CAD</span>185</div>
            <h3>The Hour<span className="fr">Une heure</span></h3>
            <p>One signature service, by the artist of their choosing. A welcome, a robe, a quiet hour, the house élixir to
              take home.</p>
            <div className="foot"><span>◇ Holds for 24 months</span><span>Linen envelope</span></div>
          </article>

          <article className="gc-card rose">
            <div className="seal">N°</div>
            <div className="top"><span>Carte cadeau N° 02</span><span className="v">Rose</span></div>
            <div className="amt"><span className="cur">CAD</span>385</div>
            <h3>The Long Afternoon<span className="fr">Le long après-midi</span></h3>
            <p>Two services, paired by the house — hair &amp; lash, esthetics &amp; long bath. With a chilled bottle, on the
              marble side-table.</p>
            <div className="foot"><span>◇ Holds for 24 months</span><span>Hand-addressed</span></div>
          </article>

          <article className="gc-card smoke">
            <div className="seal">N°</div>
            <div className="top"><span>Carte cadeau N° 03</span><span className="v">Obsidian</span></div>
            <div className="amt"><span className="cur">CAD</span>785</div>
            <h3>The Whole Day<span className="fr">La journée entière</span></h3>
            <p>The full house — every room visited, with a quiet lunch in between. Four artists, six hours, the brass door
              closed behind you.</p>
            <div className="foot"><span>◇ Holds for 24 months</span><span>By hand, by post</span></div>
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
            <h2>What is offered now,<br />and only now.</h2>
          </div>

          <div className="season-grid">
            <article className="season-card">
              <div className="movement-photo">
                <Image src="/img/spa-1.jpg" alt="Solstice ritual" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Now · Spring &apos;26</span>
                <h3>The <em>Solstice</em> Bath<span className="fr">Le bain du solstice</span></h3>
                <p className="desc">A two-hour ritual built around the lengthening of the days — eucalyptus steam, lavender oil
                  sourced from the Memramcook valley, a small almond cake at the end. Available only through the end of
                  June.</p>
                <div className="meta">
                  <span>Duration<span className="v">2h</span></span>
                  <span>Investment<span className="v">From $295</span></span>
                  <span>Until<span className="v">21 June</span></span>
                </div>
              </div>
            </article>

            <article className="season-card">
              <div className="movement-photo">
                <Image src="/img/hair-5.jpg" alt="The colour study" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Spring &apos;26</span>
                <h3>The Colour Study<span className="fr">L&apos;étude des couleurs</span></h3>
                <p className="desc">A three-sitting hair-colour deep-dive — for the guest who wants to understand the why, not
                  only the how. Includes a hand-painted reference card kept at the chair, your name on it.</p>
                <div className="meta">
                  <span>Sessions<span className="v">×3</span></span>
                  <span>From<span className="v">$485</span></span>
                </div>
              </div>
            </article>
          </div>

          <div className="season-grid alt">
            <article className="season-card">
              <div className="movement-photo">
                <Image src="/img/lash-3.jpg" alt="Wedding atelier" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Wedding season &apos;26</span>
                <h3>The Atelier on the morning of<span className="fr">L&apos;atelier le matin du mariage</span></h3>
                <p className="desc">Hair, lash, brow, and skin — all four artists, all four rooms, opened privately for one
                  party from 06:00. Includes a chilled bottle, a small linen breakfast, and a touch-up kit by post the day
                  before.</p>
                <div className="meta">
                  <span>Party<span className="v">Up to 6</span></span>
                  <span>Hour<span className="v">06 — 10</span></span>
                  <span>Investment<span className="v">From $2,400</span></span>
                </div>
              </div>
            </article>

            <article className="season-card">
              <div className="movement-photo">
                <Image src="/img/nails-2.jpg" alt="Mother's day" fill className="object-cover" sizes="(max-width: 1100px) 100vw, 50vw" />
              </div>
              <div className="info">
                <span className="tag"><span className="dot"></span>Mother&apos;s Day · May &apos;26</span>
                <h3>For the mother<span className="fr">Pour la mère</span></h3>
                <p className="desc">A two-person ritual: hands together at the manicure bar, then twin beds for the long bath.
                  Tea between, lavender after, a linen pouch each.</p>
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
          <h2>For the regulars,<br />quietly held.<span className="fr">Pour les habituées — un soin discret.</span></h2>
        </div>

        <div className="mem-grid">
          <div className="mem">
            <div className="tier">N° 01 · L&apos;invitée</div>
            <h3>The Invited<span className="fr">L&apos;invitée</span></h3>
            <div className="price">$185<span className="month">per month · par mois</span></div>
            <ul>
              <li>One signature service of your choosing, per month</li>
              <li>Priority booking — Tuesdays, twenty-four hours ahead of the house</li>
              <li>House élixir, refilled at every visit</li>
              <li>Hold the same hour, in the same chair</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Join ·
                S&apos;inscrire</Link>
            </div>
          </div>

          <div className="mem featured">
            <div className="tier">N° 02 · La maison</div>
            <h3>The House<span className="fr">La maison</span></h3>
            <div className="price">$365<span className="month">per month · par mois</span></div>
            <ul>
              <li>Two services per month, paired by the house</li>
              <li>Priority booking — Tuesdays, forty-eight hours ahead</li>
              <li>Quarterly long-bath ritual, complimentary</li>
              <li>15 % off any third service in any month</li>
              <li>A linen pouch of essentials, posted each solstice</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px 20px' }}>
                Join · S&apos;inscrire <span className="arrow" style={{ marginLeft: '8px' }}>→</span>
              </Link>
            </div>
          </div>

          <div className="mem">
            <div className="tier">N° 03 · L&apos;atelier</div>
            <h3>The Atelier<span className="fr">L&apos;atelier</span></h3>
            <div className="price">$685<span className="month">per month · par mois</span></div>
            <ul>
              <li>Four services per month, any room of the house</li>
              <li>First call on every soft opening + seasonal release</li>
              <li>One whole-day ritual per quarter, included</li>
              <li>Two guest passes per year, for the people you love</li>
              <li>Your own number at the chair — and at the door</li>
            </ul>
            <div className="cta">
              <Link href="/contact" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Join ·
                S&apos;inscrire</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-screen-label="06 CTA" style={{ padding: '160px 48px' }}>
        <div className="eyebrow cta-eyebrow"><span className="dot"></span>The brass door is open</div>
        <h2>Begin your ritual,<br />at your cadence.<span className="fr">Commencez votre rituel — à votre rythme.</span></h2>
        <Link href="/contact" className="btn-gold">
          <span>Begin Your Ritual</span>
          <span className="fr">Commencez le rituel</span>
          <span className="arrow">→</span>
        </Link>
      </section>
    </>
  )
}
