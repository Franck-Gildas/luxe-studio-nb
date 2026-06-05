'use client'

import { useEffect, useState, type ReactNode } from 'react'
import type { Lead, LeadStatus, FollowUpNote } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'
import {
  addFollowUpNote,
  getFollowUpNotes,
  NOTES_CHANGED_EVENT,
} from '@/lib/admin/storage'
import {
  REMINDER_CHANGED_EVENT,
  defaultReminderDate,
  defaultReminderTime,
  deleteReminder,
  formatReminderDateTime,
  getReminder,
  getReminderUrgency,
  setReminder,
  type ReminderRecord,
} from '@/lib/admin/followups'
import { parseAppointmentDate } from '@/lib/admin/appointment-date'
import { AdminSelect } from '@/components/admin/AdminSelect'
import {
  IconChevronLeft,
  IconChevronRight,
  IconMail,
  IconMessage,
  IconPhone,
} from '@/components/admin/AdminIcons'

function phoneForSms(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

function isEmptyFieldValue(value: string | undefined): boolean {
  const v = value?.trim()
  return !v || v === '—' || v === 'None' || v === 'Not provided'
}

function formatAppointmentParts(date: string, time: string): { dateLine: string; timeLine: string } | null {
  const parsed = parseAppointmentDate(date)
  if (parsed) {
    return {
      dateLine: parsed.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      timeLine: time?.trim() || '',
    }
  }
  if (date?.trim()) {
    return { dateLine: date.trim(), timeLine: time?.trim() || '' }
  }
  return null
}

type DetailGroupProps = {
  title: string
  children: ReactNode
}

function DetailGroup({ title, children }: DetailGroupProps) {
  return (
    <div className="admin-detail-group">
      <div className="admin-detail-group-title">{title}</div>
      {children}
    </div>
  )
}

type DetailFieldProps = {
  label: string
  children?: ReactNode
  value?: string
  emptyLabel?: string
  highlight?: boolean
  fullWidth?: boolean
  muted?: boolean
}

function DetailField({
  label,
  children,
  value,
  emptyLabel = 'Not provided',
  highlight = false,
  fullWidth = false,
  muted = false,
}: DetailFieldProps) {
  const isEmpty = value !== undefined ? isEmptyFieldValue(value) : false
  const valueClass = [
    'admin-detail-value',
    highlight ? 'admin-detail-value--highlight' : '',
    isEmpty || muted ? 'admin-detail-value--empty' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`admin-detail-field${fullWidth ? ' admin-detail-field--full' : ''}`}>
      <span className="admin-detail-label">{label}</span>
      <div className={valueClass}>
        {children ?? (isEmpty ? emptyLabel : value)}
      </div>
    </div>
  )
}

type Props = {
  lead: Lead
  leadIndex: number
  totalLeads: number
  hasPrevious: boolean
  hasNext: boolean
  onClose: () => void
  onSave: (sheetRow: number, status: LeadStatus) => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export function LeadDetailModal({
  lead,
  leadIndex,
  totalLeads,
  hasPrevious,
  hasNext,
  onClose,
  onSave,
  onNavigate,
}: Props) {
  const [status, setStatus] = useState<LeadStatus>(lead.effectiveStatus)
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState<FollowUpNote[]>([])
  const [reminder, setReminderState] = useState<ReminderRecord | null>(null)
  const [reminderDate, setReminderDate] = useState(defaultReminderDate())
  const [reminderTime, setReminderTime] = useState(defaultReminderTime())
  const [editingReminder, setEditingReminder] = useState(false)

  function loadReminder() {
    const existing = getReminder(lead.sheetRow)
    setReminderState(existing)
    if (existing) {
      setReminderDate(existing.date)
      setReminderTime(existing.time)
    } else {
      setReminderDate(defaultReminderDate())
      setReminderTime(defaultReminderTime())
    }
    setEditingReminder(false)
  }

  useEffect(() => {
    setStatus(lead.effectiveStatus)
    setNotes(getFollowUpNotes(lead.sheetRow))
    setNoteText('')
    loadReminder()
  }, [lead])

  useEffect(() => {
    function onRemindersChanged() {
      loadReminder()
      setNotes(getFollowUpNotes(lead.sheetRow))
    }
    window.addEventListener(REMINDER_CHANGED_EVENT, onRemindersChanged)
    window.addEventListener(NOTES_CHANGED_EVENT, onRemindersChanged)
    return () => {
      window.removeEventListener(REMINDER_CHANGED_EVENT, onRemindersChanged)
      window.removeEventListener(NOTES_CHANGED_EVENT, onRemindersChanged)
    }
  }, [lead.sheetRow])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowLeft' && hasPrevious) {
        e.preventDefault()
        onSave(lead.sheetRow, status)
        onNavigate('prev')
      }
      if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault()
        onSave(lead.sheetRow, status)
        onNavigate('next')
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [hasPrevious, hasNext, lead.sheetRow, status, onClose, onSave, onNavigate])

  const tel = lead.phone && lead.phone !== 'Not provided' ? lead.phone : ''
  const smsPhone = tel ? phoneForSms(tel) : ''
  const pronouns = lead.pronouns?.trim()
  const showPronouns = Boolean(pronouns && pronouns !== '—')
  const appointment = formatAppointmentParts(lead.appointment_date, lead.appointment_time)
  const hasAddons = !isEmptyFieldValue(lead.addons) && lead.addons !== 'None'
  const hasNotes = !isEmptyFieldValue(lead.notes) && lead.notes !== 'None'

  function persistAndNavigate(direction: 'prev' | 'next') {
    onSave(lead.sheetRow, status)
    onNavigate(direction)
  }

  function handleAddNote() {
    const updated = addFollowUpNote(lead.sheetRow, noteText)
    setNotes(updated)
    setNoteText('')
  }

  function handleSave() {
    onSave(lead.sheetRow, status)
    onClose()
  }

  function handleSetReminder() {
    if (!reminderDate || !reminderTime) return
    const saved = setReminder(lead.sheetRow, reminderDate, reminderTime)
    setReminderState(saved)
    setEditingReminder(false)
  }

  function handleDeleteReminder() {
    deleteReminder(lead.sheetRow)
    setReminderState(null)
    setEditingReminder(false)
    setReminderDate(defaultReminderDate())
    setReminderTime(defaultReminderTime())
  }

  const reminderUrgency = reminder ? getReminderUrgency(reminder) : null
  const showReminderForm = !reminder || editingReminder

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label={`Lead details for ${lead.name}`}>
      <div className="admin-modal admin-modal-inner">
        <div className="admin-modal-toolbar">
          <div className="admin-modal-nav">
            <button
              type="button"
              className="admin-modal-nav-btn"
              onClick={() => persistAndNavigate('prev')}
              disabled={!hasPrevious}
              aria-label="Previous lead"
              title="Previous lead"
            >
              <IconChevronLeft size={18} />
            </button>
            <span className="admin-modal-nav-count">
              {leadIndex + 1} <span className="admin-modal-nav-sep">of</span> {totalLeads}
            </span>
            <button
              type="button"
              className="admin-modal-nav-btn"
              onClick={() => persistAndNavigate('next')}
              disabled={!hasNext}
              aria-label="Next lead"
              title="Next lead"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="admin-modal-grid">
          <div className="admin-modal-section">
            <div className="admin-modal-section-head">
              <div className="admin-modal-section-title">Client</div>
            </div>

            <div className="admin-modal-client-hero">
              <div className="admin-modal-client-hero-main">
                <h2 className="admin-modal-client-name">{lead.name}</h2>
              </div>
              {(showPronouns || lead.first_visit?.toLowerCase() === 'yes') && (
                <div className="admin-modal-client-meta">
                  {showPronouns && (
                    <span className="admin-detail-chip admin-detail-chip--pronouns">{pronouns}</span>
                  )}
                  {lead.first_visit?.toLowerCase() === 'yes' && (
                    <span className="admin-detail-chip admin-detail-chip--first-visit">First visit</span>
                  )}
                </div>
              )}
            </div>

            <DetailGroup title="Contact">
              <div className="admin-detail-fields admin-detail-fields--pair">
                <DetailField label="Email">
                  <a className="admin-detail-link" href={`mailto:${lead.email}`}>
                    <IconMail size={14} />
                    <span>{lead.email}</span>
                  </a>
                </DetailField>

                <DetailField label="Phone">
                  {tel ? (
                    <div className="admin-detail-contact-row">
                      <a className="admin-detail-link" href={`tel:${tel}`}>
                        <IconPhone size={14} />
                        <span>{tel}</span>
                      </a>
                      {smsPhone && (
                        <a className="admin-detail-link admin-detail-link--secondary" href={`sms:${smsPhone}`}>
                          <IconMessage size={14} />
                          <span>SMS</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="admin-detail-value admin-detail-value--empty">Not provided</span>
                  )}
                </DetailField>
              </div>
            </DetailGroup>

            <DetailGroup title="Marketing">
              <div className="admin-detail-fields">
                <DetailField label="How they heard about us" value={lead.how_heard} fullWidth />
              </div>
            </DetailGroup>
          </div>

          <div className="admin-modal-section">
            <div className="admin-modal-section-head">
              <div className="admin-modal-section-title">Booking</div>
            </div>

            {appointment ? (
              <div className="admin-detail-appointment-spotlight">
                <span className="admin-detail-label">Appointment</span>
                <div className="admin-detail-appointment-date">{appointment.dateLine}</div>
                {appointment.timeLine && (
                  <div className="admin-detail-appointment-time">{appointment.timeLine}</div>
                )}
              </div>
            ) : (
              <div className="admin-detail-appointment-spotlight admin-detail-appointment-spotlight--empty">
                <span className="admin-detail-label">Appointment</span>
                <div className="admin-detail-value admin-detail-value--empty">Not scheduled</div>
              </div>
            )}

            <DetailGroup title="Service">
              <div className="admin-detail-fields admin-detail-fields--pair">
                <DetailField label="Service" value={lead.service} />
                <DetailField label="Artist" value={lead.artist} />
              </div>
            </DetailGroup>

            <div className="admin-detail-fields admin-detail-fields--summary">
              <DetailField
                label="Add-ons"
                value={lead.addons}
                muted={!hasAddons}
              />
              <div className="admin-detail-total-card">
                <span className="admin-detail-label">Total</span>
                <div className="admin-detail-total-value">{lead.total || '—'}</div>
              </div>
            </div>

            <DetailGroup title="Notes">
              <div className="admin-detail-fields">
                <DetailField
                  label="Special notes"
                  value={lead.notes}
                  fullWidth
                  muted={!hasNotes}
                />
              </div>
            </DetailGroup>
          </div>
        </div>

        <div className="admin-reminder-section">
          <div className="admin-modal-section-title">Follow-Up Reminder</div>

          {reminder && !editingReminder ? (
            <div className="admin-reminder-display">
              <p
                className={`admin-reminder-display-text${
                  reminderUrgency === 'overdue' ? ' admin-reminder-display-text--overdue' : ''
                }`}
              >
                Reminder set for: {formatReminderDateTime(reminder.date, reminder.time)}
              </p>
              <div className="admin-reminder-display-actions">
                <button
                  type="button"
                  className="admin-view-btn"
                  onClick={() => setEditingReminder(true)}
                >
                  Edit Reminder
                </button>
                <button
                  type="button"
                  className="admin-clear-filters-btn"
                  onClick={handleDeleteReminder}
                >
                  Delete Reminder
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-reminder-form">
              <div className="admin-reminder-form-row">
                <label className="admin-filter-label" htmlFor="reminder-date">
                  Date
                </label>
                <input
                  id="reminder-date"
                  type="date"
                  className="admin-filter-input admin-filter-input--date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                />
              </div>
              <div className="admin-reminder-form-row">
                <label className="admin-filter-label" htmlFor="reminder-time">
                  Time
                </label>
                <input
                  id="reminder-time"
                  type="time"
                  className="admin-filter-input"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
              </div>
              <div className="admin-reminder-form-actions">
                <button type="button" className="admin-add-note-btn" onClick={handleSetReminder}>
                  Set Reminder
                </button>
                {editingReminder && (
                  <button
                    type="button"
                    className="admin-view-btn"
                    onClick={() => {
                      setEditingReminder(false)
                      if (reminder) {
                        setReminderDate(reminder.date)
                        setReminderTime(reminder.time)
                      }
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="admin-notes-section">
          <div className="admin-modal-section-title">Follow-Up Notes</div>
          <textarea
            className="admin-notes-textarea"
            placeholder="Add a follow-up note…"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button type="button" className="admin-add-note-btn" onClick={handleAddNote}>
            Add Note
          </button>
          {notes.length > 0 ? (
            <div className="admin-notes-timeline">
              {notes.map((note, i) => (
                <div key={`${note.timestamp}-${i}`} className="admin-note-item">
                  <div className="admin-note-time">
                    {new Date(note.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="admin-note-text">{note.text}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-detail-value admin-detail-value--empty" style={{ marginBottom: 0 }}>
              No follow-up notes yet.
            </p>
          )}
        </div>

        <div className="admin-quick-actions">
          {tel && (
            <a className="admin-quick-action" href={`tel:${tel}`}>
              <IconPhone size={16} />
              <span>Call</span>
            </a>
          )}
          <a className="admin-quick-action" href={`mailto:${lead.email}`}>
            <IconMail size={16} />
            <span>Email</span>
          </a>
          {smsPhone && (
            <a className="admin-quick-action" href={`sms:${smsPhone}`}>
              <IconMessage size={16} />
              <span>SMS</span>
            </a>
          )}
          <AdminSelect
            variant="modal"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            aria-label="Lead status"
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </AdminSelect>
          <button type="button" className="admin-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
