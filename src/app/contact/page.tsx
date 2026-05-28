'use client'

import { useState, type FormEvent } from 'react'
import '@/styles/contact.css'

const DAYS = [
  { num: '27', lbl: 'Wed', closed: false },
  { num: '28', lbl: 'Thu', closed: false },
  { num: '29', lbl: 'Fri', closed: false },
  { num: '30', lbl: 'Sat', closed: false },
  { num: '31', lbl: 'Sun · Fermé', closed: true },
  { num: '01', lbl: 'Mon · Fermé', closed: true },
  { num: '02', lbl: 'Tue', closed: false },
  { num: '03', lbl: 'Wed', closed: false },
  { num: '04', lbl: 'Thu', closed: false },
  { num: '05', lbl: 'Fri', closed: false },
] as const

const TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'] as const

const SERVICES = [
  { id: 'srv-hair', ico: 'N° 01', name: 'Hair Rituals', fr: 'Cheveux' },
  { id: 'srv-barber', ico: 'N° 02', name: 'Barbering', fr: 'Barbier' },
  { id: 'srv-nail', ico: 'N° 03', name: 'Nail Couture', fr: 'Ongles' },
  { id: 'srv-lash', ico: 'N° 04', name: 'Lash & Brow', fr: 'Cils & sourcils' },
  { id: 'srv-face', ico: 'N° 05', name: 'Skin Alchemy', fr: 'Esthétique' },
  { id: 'srv-spa', ico: 'N° 06', name: 'Wellness & Body', fr: 'Bien-être' },
] as const

const VISITED_OPTIONS = [
  'First visit · première visite',
  "I'm a regular · habituée",
  "A guest brought me · invitée d'une habituée",
  'Returning after a long time',
] as const

const HEARD_OPTIONS = [
  'A friend at the chair · une amie',
  'Instagram · @luxestudionb',
  'Press · article',
  'Search · Google',
  'Other · autre',
] as const

export default function ContactPage() {
  const [name, setName] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('srv-hair')
  const [selectedDay, setSelectedDay] = useState('29')
  const [selectedTime, setSelectedTime] = useState('13:00')
  const [visitedBefore, setVisitedBefore] = useState("I'm a regular · habituée")
  const [howHeard, setHowHeard] = useState('A friend at the chair · une amie')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitted) return
    setSubmitted(true)
  }

  return (
    <>
      <div className="grain"></div>

      {/* PAGE HERO */}
      <section className="contact-hero" data-screen-label="01 Contact Hero">
        <div className="contact-hero-layout">
          <div className="contact-hero-inner">
            <div className="contact-hero-meta">
              <span><span className="v">◇ The chair</span> · 214 Rue Main · Suite 201</span>
              <span>Page <span className="v">06 / 06</span></span>
            </div>
            <h1>
              Pull up<br />
              a <em>chair.</em>
              <span className="fr">Approchez-vous — la porte est ouverte.</span>
            </h1>
            <p className="lede">Send your invitation below — pick the room you&apos;d like to begin in, the day, the hour. We&apos;ll write back the same day with the artist&apos;s name, a small confirmation, and what to bring.</p>
          </div>
          <div className="chair-img">
            {/* 3D ANIMATED CHAIR — Three.js coming soon */}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="contact-section" data-screen-label="02 Booking Form">
        <div className="contact-grid">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="contact-map">
              <div className="grid-lines"></div>
              <div className="road r1"></div>
              <div className="road r2"></div>
              <div className="road r3"></div>
              <div className="road r4"></div>
              <div className="main"></div>
              <div className="main-label">Rue Main Street</div>
              <div className="pin"></div>
              <div className="pin-lbl">◇ Luxe Studio NB<span className="sub">214 · Suite 201</span></div>
              <div className="compass">N 46.0878°<br />W 64.7782°</div>
              <span className="placeholder-label" style={{ bottom: 14, left: 14 }}>Map · 214 Rue Main · brass door</span>
            </div>

            <div className="sidebar-block">
              <h4>The Atelier · L&apos;atelier</h4>
              <div className="address">
                214 Rue Main Street<br />Suite 201, Moncton<br />New Brunswick · E1C 1B8
                <span className="fr">Au deuxième étage, derrière la porte de laiton.</span>
              </div>
            </div>

            <div className="sidebar-block">
              <h4>Hours · Heures</h4>
              <div className="row"><span className="k">Tue — Thu</span><span className="v">10 — 18</span></div>
              <div className="row"><span className="k">Fri</span><span className="v">10 — 22</span></div>
              <div className="row"><span className="k">Sat</span><span className="v">09 — 18</span></div>
              <div className="row"><span className="k">Sun — Mon</span><span className="v">Closed · Fermé</span></div>
            </div>

            <div className="sidebar-block">
              <h4>Direct · Directement</h4>
              <p>
                <a href="tel:+15065550187" style={{ color: 'var(--champagne)', borderBottom: '1px solid var(--hairline)', paddingBottom: 2 }}>(506) 555 — 0187</a><br />
                <a href="mailto:hello@luxestudionb.com" style={{ color: 'var(--champagne)', borderBottom: '1px solid var(--hairline)', paddingBottom: 2, display: 'inline-block', marginTop: 8 }}>hello@luxestudionb.com</a><br />
                <a href="https://instagram.com/luxestudionb" style={{ color: 'var(--bone)', display: 'inline-block', marginTop: 10 }}>@luxestudionb</a>
              </p>
            </div>

            <div className="sidebar-block">
              <h4>The cadence · La cadence</h4>
              <p>Twelve guests per day across six rooms. We&apos;re taking new appointments through the summer of <strong>2026</strong>. The first ten minutes are always yours, before anything begins.</p>
            </div>
          </aside>

          {/* FORM */}
          <form className="form-frame" id="booking" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Book Your Ritual<span className="fr">Réservez votre rituel</span></h2>
              <div className="stamp">
                <span className="v">№ — Rendez-vous</span>
                <span>Réf. · LSN-BOOK</span>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-field">
                <label>Your name <span className="opt">votre nom</span></label>
                <input
                  type="text"
                  placeholder="Émilie Doiron"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>The pronouns we&apos;ll use <span className="opt">pronoms — optional</span></label>
                <input
                  type="text"
                  placeholder="elle · she · they"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Email <span className="opt">courriel</span></label>
                <input
                  type="email"
                  placeholder="bonjour@luxestudionb.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Phone <span className="opt">téléphone</span></label>
                <input
                  type="tel"
                  placeholder="+1 (506) 555 — 0187"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-field full">
                <label>Which room? <span className="opt">la pièce — choose one</span></label>
                <div className="service-pick">
                  {SERVICES.map((srv) => (
                    <span key={srv.id} style={{ display: 'contents' }}>
                      <input
                        type="radio"
                        id={srv.id}
                        name="srv"
                        checked={service === srv.id}
                        onChange={() => setService(srv.id)}
                      />
                      <label htmlFor={srv.id}>
                        <span className="ico">{srv.ico}</span>
                        <span className="name">
                          {srv.name}
                          <span className="fr">{srv.fr}</span>
                        </span>
                      </label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-field full">
                <label>Preferred day <span className="opt">choisissez un jour — next ten days</span></label>
                <div className="day-pick" id="day-pick">
                  {DAYS.map((day) => (
                    <button
                      key={day.num + day.lbl}
                      type="button"
                      className={`day${selectedDay === day.num ? ' on' : ''}${day.closed ? ' closed' : ''}`}
                      onClick={() => !day.closed && setSelectedDay(day.num)}
                    >
                      <span className="num">{day.num}</span>
                      <span className="lbl">{day.lbl}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field full">
                <label>Preferred hour <span className="opt">l&apos;heure — Fri 29 May</span></label>
                <div className="time-pick" id="time-pick">
                  {TIMES.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time${selectedTime === time ? ' on' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>Have you visited before? <span className="opt">déjà venue?</span></label>
                <select required value={visitedBefore} onChange={(e) => setVisitedBefore(e.target.value)}>
                  {VISITED_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>How you heard of us <span className="opt">comment nous avez-vous trouvés?</span></label>
                <select value={howHeard} onChange={(e) => setHowHeard(e.target.value)}>
                  {HEARD_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-field full">
                <label>The note <span className="opt">le mot — anything we should know at the door</span></label>
                <textarea
                  placeholder={"A reference, an allergy, a hope for the room — anything you'd say at the chair before we begin."}
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

            </div>

            <div className="form-foot">
              <div className="note">
                <span className="v">◇ Quiet handling</span><br />
                One reply, the same day.<br />
                No follow-up newsletters · pas de courriels insistants.
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={submitted ? { pointerEvents: 'none' } : undefined}
              >
                {submitted ? (
                  <>
                    <span>✓ Invitation reçue</span>
                    <span className="fr">A reply within the hour</span>
                  </>
                ) : (
                  <>
                    <span>Send Your Invitation</span>
                    <span className="fr">Envoyer l&apos;invitation</span>
                    <span className="arrow">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CONCIERGE DEMO */}
      <section className="concierge-demo" data-screen-label="03 Concierge Demo">
        <div className="cd-inner">
          <div className="cd-copy">
            <div className="num">§ 02 — The concierge · La concierge</div>
            <h2>If a chair is easier<br />than a form, <em>write</em> us.<span className="fr">Si le fauteuil est plus simple — écrivez.</span></h2>
            <p>Élise, our house concierge, sits at the door from 09:00 to 22:00. She speaks French and English, holds appointments at her desk on a paper book, and will thread you to the artist most for the hour you&apos;re imagining.</p>
            <p>Open her at the bottom-right of any page — or simply call. We answer the phone before the second ring; that&apos;s the only thing we time at this address.</p>
            <ul>
              <li>Replies within the hour</li>
              <li>Bilingue · EN · FR</li>
              <li>One paper book, no algorithms</li>
              <li>09:00 — 22:00 · seven days</li>
            </ul>
          </div>

          {/* Static concierge mockup */}
          <div className="cd-panel">
            <div className="cd-head">
              <div className="av"></div>
              <div className="id">
                <div className="name">Élise — Concierge</div>
                <div className="role"><span className="live"></span>Atelier · Moncton · open</div>
              </div>
            </div>
            <div className="cd-body">
              <div className="cd-msg them"><em>Bonsoir.</em> Welcome to the atelier. I&apos;m Élise — I tend the room when the artists are at the chair. How may I make the next hour yours?</div>
              <div className="cd-chips">
                <span className="cd-chip">◇ Book a ritual</span>
                <span className="cd-chip">◇ The menu</span>
                <span className="cd-chip">◇ Gift card</span>
              </div>
              <div className="cd-msg you">A long bath, Friday evening — for two?</div>
              <div className="cd-msg them">A pleasure. I have Friday 29 May at 19:00 in Room N° 07, with Marc-André &amp; Léa. <em>Voulez-vous que je tienne l&apos;heure?</em></div>
              <div className="cd-chips">
                <span className="cd-chip">◇ Yes, please hold it</span>
                <span className="cd-chip">◇ Other times</span>
              </div>
            </div>
            <div className="cd-input">
              <span className="dot"></span>A note, in EN or FR…
            </div>
            <div className="cd-foot"><span style={{ color: 'var(--brass)' }}>◇</span> Replies within the hour · réponse sous une heure</div>
          </div>
        </div>
      </section>
    </>
  )
}
