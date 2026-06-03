'use client'

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  BOOKING_ADDONS,
  BOOKING_ARTISTS,
  BOOKING_SERVICES,
  HEARD_OPTIONS,
  NO_PREFERENCE_ARTIST,
  PRONOUN_OPTIONS,
} from '@/data/booking'
import {
  computeBookingTotal,
  findFirstOpenDay,
  formatAppointmentDate,
  formatPrice,
  generateBookingDays,
  getAllSlotsForDate,
  getAvailableTimeSlots,
  getFormspreeEndpoint,
  getServiceById,
  isValidEmail,
} from '@/lib/booking'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function LuxuryBookingForm() {
  const bookingDays = useMemo(() => generateBookingDays(14), [])
  const firstOpenDay = useMemo(() => findFirstOpenDay(bookingDays), [bookingDays])

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([])
  const [staffId, setStaffId] = useState(NO_PREFERENCE_ARTIST.id)
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [firstVisit, setFirstVisit] = useState<'yes' | 'no'>('yes')
  const [howHeard, setHowHeard] = useState<(typeof HEARD_OPTIONS)[number]>(HEARD_OPTIONS[0])
  const [notes, setNotes] = useState('')

  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const selectedService = getServiceById(selectedServiceId)
  const total = computeBookingTotal(selectedService, selectedAddonIds)

  const selectedDay = useMemo(
    () => bookingDays.find((d) => d.key === selectedDayKey) ?? null,
    [bookingDays, selectedDayKey],
  )

  const selectedDate = selectedDay?.date ?? null
  const timeSlotGroups = useMemo(
    () => getAvailableTimeSlots(selectedDate),
    [selectedDate],
  )

  const selectedArtist = useMemo(() => {
    if (staffId === NO_PREFERENCE_ARTIST.id) return NO_PREFERENCE_ARTIST
    return BOOKING_ARTISTS.find((a) => a.id === staffId) ?? NO_PREFERENCE_ARTIST
  }, [staffId])

  const selectedAddons = useMemo(
    () => BOOKING_ADDONS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds],
  )

  useEffect(() => {
    if (firstOpenDay && !selectedDayKey) {
      setSelectedDayKey(firstOpenDay.key)
    }
  }, [firstOpenDay, selectedDayKey])

  useEffect(() => {
    if (!selectedTime || !selectedDate) return
    const available = getAllSlotsForDate(selectedDate)
    if (!available.includes(selectedTime)) {
      setSelectedTime(available[0] ?? null)
    }
  }, [selectedDate, selectedTime])

  const toggleAddon = useCallback((id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const validate = useCallback((): string | null => {
    if (!selectedServiceId) return 'Please select a service. · Veuillez choisir un service.'
    if (!selectedDayKey || !selectedDay || selectedDay.closed) {
      return 'Please select an available day. · Veuillez choisir un jour disponible.'
    }
    if (!selectedTime) return 'Please select a time. · Veuillez choisir une heure.'
    if (!name.trim()) return 'Full name is required. · Le nom complet est requis.'
    if (!email.trim()) return 'Email is required. · Le courriel est requis.'
    if (!isValidEmail(email)) return 'Please enter a valid email. · Courriel invalide.'
    return null
  }, [selectedServiceId, selectedDayKey, selectedDay, selectedTime, name, email])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitState === 'submitting' || submitState === 'success') return

    const validationError = validate()
    if (validationError) {
      setErrorMessage(validationError)
      setSubmitState('error')
      return
    }

    const endpoint = getFormspreeEndpoint()
    if (!endpoint) {
      setErrorMessage(
        'Booking is not configured. Please set NEXT_PUBLIC_FORMSPREE_ID. · Configuration manquante.',
      )
      setSubmitState('error')
      return
    }

    setSubmitState('submitting')
    setErrorMessage('')

    const serviceLabel = selectedService
      ? `${selectedService.nameEn} / ${selectedService.nameFr} — ${formatPrice(selectedService.price)} · ${selectedService.duration}`
      : ''

    const addonsLabel =
      selectedAddons.length > 0
        ? selectedAddons
            .map((a) => `${a.nameEn} (+${formatPrice(a.price)})`)
            .join('; ')
        : 'None'

    const artistLabel =
      staffId === NO_PREFERENCE_ARTIST.id
        ? `${NO_PREFERENCE_ARTIST.name} / ${NO_PREFERENCE_ARTIST.specialty}`
        : `${selectedArtist.name} — ${selectedArtist.specialty}`

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          pronouns: pronouns || '—',
          phone: phone.trim() || '—',
          firstVisit: firstVisit === 'yes' ? 'Yes' : 'No',
          howHeard,
          notes: notes.trim() || '—',
          service: serviceLabel,
          addons: addonsLabel,
          total: formatPrice(total),
          artist: artistLabel,
          appointmentDate: formatAppointmentDate(selectedDate),
          appointmentTime: selectedTime,
          _subject: 'Luxe Studio NB — Ritual Booking',
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? 'Submission failed. Please try again.')
      }

      setSubmitState('success')
    } catch (err) {
      setSubmitState('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again. · Une erreur est survenue.',
      )
    }
  }

  const isDisabled = submitState === 'submitting' || submitState === 'success'

  return (
    <form className="form-frame" id="booking" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>
          <span className="en-only">Book Your Ritual</span>
          <span className="fr">Réservez votre rituel</span>
        </h2>
        <div className="stamp">
          <span className="v">№ — Rendez-vous</span>
          <span>Réf. · LSN-BOOK</span>
        </div>
      </div>

      {submitState === 'success' ? (
        <div className="form-status form-status--success" role="status">
          <p className="form-status-title">
            ✓ Your ritual is reserved. / Votre rituel est réservé.
          </p>
          <p className="form-status-sub">We will confirm within the hour.</p>
          <p className="form-status-sub fr">Nous confirmerons dans l&apos;heure.</p>
        </div>
      ) : (
        <div className="booking-form-body">
          {/* SECTION 1 — Service */}
          <section className="booking-section" aria-labelledby="booking-services">
            <h3 id="booking-services" className="booking-section-label">
              <span className="en-only">01 — Choose your ritual</span>
              <span className="fr-block">01 — Choisissez votre rituel</span>
            </h3>
            <div className="service-pick booking-service-pick">
              {BOOKING_SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  className={`service-card${selectedServiceId === srv.id ? ' on' : ''}`}
                  onClick={() => setSelectedServiceId(srv.id)}
                  disabled={isDisabled}
                  aria-pressed={selectedServiceId === srv.id}
                >
                  <span className="service-card-name">{srv.nameEn}</span>
                  <span className="service-card-fr">{srv.nameFr}</span>
                  <span className="service-card-meta">
                    {formatPrice(srv.price)} · {srv.duration}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 2 — Add-ons */}
          {selectedService && (
            <section className="booking-section" aria-labelledby="booking-addons">
              <h3 id="booking-addons" className="booking-section-label">
                <span className="en-only">02 — Enhance your ritual</span>
                <span className="fr-block">02 — Enrichissez votre rituel</span>
              </h3>
              <ul className="addon-list">
                {BOOKING_ADDONS.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id)
                  return (
                    <li key={addon.id}>
                      <label className={`addon-check${checked ? ' on' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                          disabled={isDisabled}
                        />
                        <span className="addon-check-box" aria-hidden />
                        <span className="addon-check-text">
                          <span className="addon-name">{addon.nameEn}</span>
                          <span className="addon-fr">{addon.nameFr}</span>
                        </span>
                        <span className="addon-price">+{formatPrice(addon.price)}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
              <p className="booking-running-total">
                <span className="en-only">Running total</span>
                <span className="fr-block">Total provisoire</span>
                <strong>{formatPrice(total)}</strong>
              </p>
            </section>
          )}

          {/* SECTION 3 — Staff */}
          <section className="booking-section" aria-labelledby="booking-staff">
            <h3 id="booking-staff" className="booking-section-label">
              <span className="en-only">03 — Your artist</span>
              <span className="fr-block">03 — Votre artiste</span>
            </h3>
            <div className="staff-pick">
              {[NO_PREFERENCE_ARTIST, ...BOOKING_ARTISTS].map((artist) => (
                <button
                  key={artist.id}
                  type="button"
                  className={`staff-card${staffId === artist.id ? ' on' : ''}`}
                  onClick={() => setStaffId(artist.id)}
                  disabled={isDisabled}
                  aria-pressed={staffId === artist.id}
                >
                  <span className="staff-avatar" aria-hidden />
                  <span className="staff-name">{artist.name}</span>
                  <span className="staff-specialty">{artist.specialty}</span>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 4 — Date & time */}
          <section className="booking-section" aria-labelledby="booking-datetime">
            <h3 id="booking-datetime" className="booking-section-label">
              <span className="en-only">04 — Day & hour</span>
              <span className="fr-block">04 — Jour & heure</span>
            </h3>
            <div className="form-field full booking-datetime-field">
              <label>
                Preferred day <span className="opt">jour préféré</span>
              </label>
              <div className="day-pick day-pick-scroll">
                {bookingDays.map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    className={`day${selectedDayKey === day.key ? ' on' : ''}${day.closed ? ' closed' : ''}`}
                    onClick={() => !day.closed && setSelectedDayKey(day.key)}
                    disabled={day.closed || isDisabled}
                    aria-pressed={selectedDayKey === day.key}
                  >
                    <span className="num">{day.date.getDate()}</span>
                    <span className="lbl">{day.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field full booking-datetime-field">
              <label>
                Preferred hour <span className="opt">heure préférée</span>
              </label>
              {timeSlotGroups.map((group) => (
                <div key={group.id} className="time-period">
                  <p className="time-period-label">
                    {group.labelEn} · {group.labelFr}
                  </p>
                  <div className="time-pick time-grid">
                    {group.slots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time${selectedTime === time ? ' on' : ''}`}
                        onClick={() => setSelectedTime(time)}
                        disabled={isDisabled}
                        aria-pressed={selectedTime === time}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5 — Guest info */}
          <section className="booking-section" aria-labelledby="booking-guest">
            <h3 id="booking-guest" className="booking-section-label">
              <span className="en-only">05 — Your details</span>
              <span className="fr-block">05 — Vos coordonnées</span>
            </h3>
            <div className="form-grid">
              <div className="form-field">
                <label>
                  Full name <span className="opt">nom complet</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Émilie Doiron"
                  disabled={isDisabled}
                />
              </div>
              <div className="form-field">
                <label>
                  Pronouns <span className="opt">pronoms — optional</span>
                </label>
                <select
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  disabled={isDisabled}
                >
                  <option value="">—</option>
                  {PRONOUN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>
                  Email <span className="opt">courriel</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bonjour@luxestudionb.com"
                  disabled={isDisabled}
                />
              </div>
              <div className="form-field">
                <label>
                  Phone <span className="opt">téléphone — optional</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (506) 555 — 0187"
                  disabled={isDisabled}
                />
              </div>
              <div className="form-field">
                <label>
                  First visit? <span className="opt">première visite?</span>
                </label>
                <div className="visit-toggle">
                  <button
                    type="button"
                    className={firstVisit === 'yes' ? 'on' : ''}
                    onClick={() => setFirstVisit('yes')}
                    disabled={isDisabled}
                    aria-pressed={firstVisit === 'yes'}
                  >
                    Yes · Oui
                  </button>
                  <button
                    type="button"
                    className={firstVisit === 'no' ? 'on' : ''}
                    onClick={() => setFirstVisit('no')}
                    disabled={isDisabled}
                    aria-pressed={firstVisit === 'no'}
                  >
                    No · Non
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label>
                  How did you hear about us? <span className="opt">comment nous avez-vous trouvés?</span>
                </label>
                <select
                  value={howHeard}
                  onChange={(e) =>
                    setHowHeard(e.target.value as (typeof HEARD_OPTIONS)[number])
                  }
                  disabled={isDisabled}
                >
                  {HEARD_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field full">
                <label>
                  Special notes <span className="opt">demandes particulières</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergies, references, hopes for the room — anything we should know."
                  disabled={isDisabled}
                />
              </div>
            </div>
          </section>

          {/* SECTION 6 — Summary */}
          <section className="booking-section" aria-labelledby="booking-summary">
            <h3 id="booking-summary" className="booking-section-label">
              <span className="en-only">06 — Order summary</span>
              <span className="fr-block">06 — Récapitulatif</span>
            </h3>
            <div className="booking-summary">
              <div className="booking-summary-row">
                <span>Service</span>
                <span>
                  {selectedService
                    ? `${selectedService.nameEn} — ${formatPrice(selectedService.price)}`
                    : '—'}
                </span>
              </div>
              {selectedAddons.length > 0 ? (
                selectedAddons.map((addon) => (
                  <div key={addon.id} className="booking-summary-row">
                    <span>{addon.nameEn}</span>
                    <span>+{formatPrice(addon.price)}</span>
                  </div>
                ))
              ) : (
                <div className="booking-summary-row muted">
                  <span>Add-ons</span>
                  <span>—</span>
                </div>
              )}
              <div className="booking-summary-row total">
                <span>Total</span>
                <span>{selectedService ? formatPrice(total) : '—'}</span>
              </div>
              <div className="booking-summary-row">
                <span>Artist</span>
                <span>
                  {staffId === NO_PREFERENCE_ARTIST.id
                    ? 'No preference'
                    : selectedArtist.name}
                </span>
              </div>
              <div className="booking-summary-row">
                <span>Date & time</span>
                <span>
                  {selectedDay && selectedTime
                    ? `${formatAppointmentDate(selectedDate)} · ${selectedTime}`
                    : '—'}
                </span>
              </div>
              <div className="booking-summary-row">
                <span>Guest</span>
                <span>{name.trim() || '—'}</span>
              </div>
            </div>
          </section>

          {/* SECTION 7 — Submit */}
          <div className="form-foot">
            {submitState === 'error' && errorMessage && (
              <p className="form-status form-status--error" role="alert">
                {errorMessage}
              </p>
            )}
            <div className="note">
              <span className="v">◇ Quiet handling</span>
              <br />
              One reply, the same day.
              <br />
              No follow-up newsletters · pas de courriels insistants.
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitState === 'submitting'}
            >
              {submitState === 'submitting' ? (
                <>
                  <span>Sending...</span>
                  <span className="fr">Envoi...</span>
                </>
              ) : (
                <>
                  <span>Confirm Your Ritual</span>
                  <span className="fr">Confirmer votre rituel</span>
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
