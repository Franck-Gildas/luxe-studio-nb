import { LuxuryBookingForm } from '@/components/booking/LuxuryBookingForm'
import '@/styles/contact.css'

export default function ContactPage() {
  return (
    <>
      <div className="grain"></div>

      {/* PAGE HERO */}
      <section className="contact-hero" data-screen-label="01 Contact Hero">
        <div className="contact-hero-layout">
          <div className="contact-hero-inner" data-reveal-left>
            <div className="contact-hero-meta">
              <span><span className="v">◇ The chair</span> · 214 Rue Main · Suite 201</span>
              <span>Page <span className="v">06 / 06</span></span>
            </div>
            <h1 data-reveal>
              <span className="en-only">Pull up a chair.</span>
              <span className="fr-block">Approchez-vous.</span>
            </h1>
            <p className="hero-tagline">
              <span className="en-only">The door is open. We are waiting.</span>
              <span className="fr-block">La porte est ouverte. Nous vous attendons.</span>
            </p>
            <p className="lede">
              <span className="en-only">
                Send your invitation below — pick the room you&apos;d like to begin in, the day,
                the hour. We&apos;ll write back the same day with the artist&apos;s name, a small
                confirmation, and what to bring.
              </span>
              <span className="fr-block">
                Envoyez votre invitation ci-dessous — choisissez la salle où vous souhaitez
                commencer, le jour, l’heure. Nous vous répondrons le jour même avec le nom de
                l’artiste, une petite confirmation et quoi apporter.
              </span>
            </p>
          </div>
          <div className="chair-img">{/* 3D ANIMATED CHAIR — Three.js coming soon */}</div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        id="booking-section"
        className="contact-section"
        data-screen-label="02 Booking Form"
      >
        <div className="contact-grid">
          <aside className="sidebar" data-reveal-left>
            <div className="contact-map">
              <div className="grid-lines"></div>
              <div className="road r1"></div>
              <div className="road r2"></div>
              <div className="road r3"></div>
              <div className="road r4"></div>
              <div className="main"></div>
              <div className="main-label">Rue Main Street</div>
              <div className="pin"></div>
              <div className="pin-lbl">
                ◇ Luxe Studio NB<span className="sub">214 · Suite 201</span>
              </div>
              <div className="compass">
                N 46.0878°
                <br />
                W 64.7782°
              </div>
              <span className="placeholder-label" style={{ bottom: 14, left: 14 }}>
                Map · 214 Rue Main · brass door
              </span>
            </div>

            <div className="sidebar-block">
              <h4>The Atelier · L&apos;atelier</h4>
              <div className="address">
                214 Rue Main Street
                <br />
                Suite 201, Moncton
                <br />
                New Brunswick · E1C 1B8
                <span className="fr">Au deuxième étage, derrière la porte de laiton.</span>
              </div>
            </div>

            <div className="sidebar-block">
              <h4>Hours · Heures</h4>
              <div className="row">
                <span className="k">Tue — Thu</span>
                <span className="v">10 — 18</span>
              </div>
              <div className="row">
                <span className="k">Fri</span>
                <span className="v">10 — 22</span>
              </div>
              <div className="row">
                <span className="k">Sat</span>
                <span className="v">09 — 18</span>
              </div>
              <div className="row">
                <span className="k">Sun — Mon</span>
                <span className="v">Closed · Fermé</span>
              </div>
            </div>

            <div className="sidebar-block">
              <h4>Direct · Directement</h4>
              <p>
                <span className="en-only">
                  <a
                    href="tel:+15065550187"
                    style={{
                      color: 'var(--champagne)',
                      borderBottom: '1px solid var(--hairline)',
                      paddingBottom: 2,
                    }}
                  >
                    (506) 555 — 0187
                  </a>
                  <br />
                  <a
                    href="mailto:hello@luxestudionb.com"
                    style={{
                      color: 'var(--champagne)',
                      borderBottom: '1px solid var(--hairline)',
                      paddingBottom: 2,
                      display: 'inline-block',
                      marginTop: 8,
                    }}
                  >
                    hello@luxestudionb.com
                  </a>
                  <br />
                  <a
                    href="https://instagram.com/luxestudionb"
                    style={{ color: 'var(--bone)', display: 'inline-block', marginTop: 10 }}
                  >
                    @luxestudionb
                  </a>
                </span>
                <span className="fr-block">
                  (506) 555 — 0187 hello@luxestudionb.com @luxestudionb
                </span>
              </p>
            </div>

            <div className="sidebar-block">
              <h4>The cadence · La cadence</h4>
              <p>
                <span className="en-only">
                  Twelve guests per day across six rooms. We&apos;re taking new appointments
                  through the summer of <strong>2026</strong>. The first ten minutes are always
                  yours, before anything begins.
                </span>
                <span className="fr-block">
                  Douze invités par jour dans six salles. Nous prenons de nouveaux rendez-vous
                  jusqu’à l’été 2026. Les dix premières minutes sont toujours les vôtres, avant que
                  quoi que ce soit commence.
                </span>
              </p>
            </div>
          </aside>

          <LuxuryBookingForm />
        </div>
      </section>

      {/* CONCIERGE DEMO */}
      <section className="concierge-demo" data-screen-label="03 Concierge Demo">
        <div className="cd-inner">
          <div className="cd-copy" data-reveal-left>
            <div className="num">§ 02 — The concierge · La concierge</div>
            <h2 data-reveal>
              <span className="en-only">
                If a chair is easier
                <br />
                than a form, <em>write</em> us.
              </span>
              <span className="fr">Si le fauteuil est plus simple — écrivez.</span>
            </h2>
            <p>
              <span className="en-only">
                Élise, our house concierge, sits at the door from 09:00 to 22:00. She speaks French
                and English, holds appointments at her desk on a paper book, and will thread you to
                the artist most for the hour you&apos;re imagining.
              </span>
              <span className="fr-block">
                Élise, notre concierge maison, est à la porte de 09 h à 22 h. Elle parle français
                et anglais, tient les rendez-vous à son bureau dans un carnet papier et vous
                orientera vers l’artiste le plus juste pour l’heure que vous imaginez.
              </span>
            </p>
            <p>
              <span className="en-only">
                Open her at the bottom-right of any page — or simply call. We answer the phone
                before the second ring; that&apos;s the only thing we time at this address.
              </span>
              <span className="fr-block">
                Ouvrez-la en bas à droite de n’importe quelle page — ou appelez simplement. Nous
                décrochons avant la deuxième sonnerie ; c’est la seule chose que nous chronométrons à
                cette adresse.
              </span>
            </p>
            <ul>
              <li>Replies within the hour</li>
              <li>Bilingue · EN · FR</li>
              <li>One paper book, no algorithms</li>
              <li>09:00 — 22:00 · seven days</li>
            </ul>
          </div>

          <div className="cd-panel">
            <div className="cd-head">
              <div className="av"></div>
              <div className="id">
                <div className="name">Élise — Concierge</div>
                <div className="role">
                  <span className="live"></span>Atelier · Moncton · open
                </div>
              </div>
            </div>
            <div className="cd-body">
              <div className="cd-msg them">
                <em>Bonsoir.</em> Welcome to the atelier. I&apos;m Élise — I tend the room when the
                artists are at the chair. How may I make the next hour yours?
              </div>
              <div className="cd-chips">
                <span className="cd-chip">◇ Book a ritual</span>
                <span className="cd-chip">◇ The menu</span>
                <span className="cd-chip">◇ Gift card</span>
              </div>
              <div className="cd-msg you">A long bath, Friday evening — for two?</div>
              <div className="cd-msg them">
                A pleasure. I have Friday 29 May at 19:00 in Room N° 07, with Marc-André &amp;
                Léa. <em>Voulez-vous que je tienne l&apos;heure?</em>
              </div>
              <div className="cd-chips">
                <span className="cd-chip">◇ Yes, please hold it</span>
                <span className="cd-chip">◇ Other times</span>
              </div>
            </div>
            <div className="cd-input">
              <span className="dot"></span>A note, in EN or FR…
            </div>
            <div className="cd-foot">
              <span style={{ color: 'var(--brass)' }}>◇</span> Replies within the hour · réponse sous
              une heure
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
