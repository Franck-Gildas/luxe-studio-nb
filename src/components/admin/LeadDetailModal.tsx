'use client'

import { useEffect, useState } from 'react'
import type { Lead, LeadStatus, FollowUpNote } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'
import {
  addFollowUpNote,
  getFollowUpNotes,
} from '@/lib/admin/storage'
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

  useEffect(() => {
    setStatus(lead.effectiveStatus)
    setNotes(getFollowUpNotes(lead.email))
    setNoteText('')
  }, [lead])

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

  function persistAndNavigate(direction: 'prev' | 'next') {
    onSave(lead.sheetRow, status)
    onNavigate(direction)
  }

  function handleAddNote() {
    const updated = addFollowUpNote(lead.email, noteText)
    setNotes(updated)
    setNoteText('')
  }

  function handleSave() {
    onSave(lead.sheetRow, status)
    onClose()
  }

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
            <div className="admin-modal-section-title">Client</div>
            <h2 className="admin-modal-client-name">{lead.name}</h2>
            <p className="admin-modal-field">
              <strong>Pronouns</strong>
              —
            </p>
            <p className="admin-modal-field">
              <strong>Email</strong>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </p>
            <p className="admin-modal-field">
              <strong>Phone</strong>
              {tel ? (
                <>
                  <a href={`tel:${tel}`}>{tel}</a>
                  {smsPhone && (
                    <>
                      {' · '}
                      <a href={`sms:${smsPhone}`}>SMS</a>
                    </>
                  )}
                </>
              ) : (
                '—'
              )}
            </p>
            <p className="admin-modal-field">
              <strong>How they heard about us</strong>
              {lead.how_heard || '—'}
            </p>
            {lead.first_visit?.toLowerCase() === 'yes' && (
              <span className="admin-first-visit-badge">First visit</span>
            )}
          </div>

          <div className="admin-modal-section">
            <div className="admin-modal-section-title">Booking</div>
            <p className="admin-modal-field">
              <strong>Service</strong>
              {lead.service || '—'}
            </p>
            <p className="admin-modal-field">
              <strong>Add-ons</strong>
              {lead.addons || 'None'}
            </p>
            <p className="admin-modal-field">
              <strong>Total</strong>
              <span style={{ fontFamily: 'var(--serif)', color: 'var(--champagne)' }}>
                {lead.total}
              </span>
            </p>
            <p className="admin-modal-field">
              <strong>Artist</strong>
              {lead.artist || '—'}
            </p>
            <p className="admin-modal-field">
              <strong>Appointment</strong>
              {lead.appointment_date || '—'}
              {lead.appointment_time ? ` at ${lead.appointment_time}` : ''}
            </p>
            <p className="admin-modal-field">
              <strong>Special notes</strong>
              {lead.notes || 'None'}
            </p>
          </div>
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
            <p className="admin-modal-field" style={{ marginBottom: 0 }}>
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
