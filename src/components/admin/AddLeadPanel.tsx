'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent, type TransitionEvent } from 'react'
import { createPortal } from 'react-dom'
import type { AdminBooking } from '@/lib/google-sheets'
import { BOOKING_SERVICES } from '@/data/booking'
import { AdminSelect } from '@/components/admin/AdminSelect'
import {
  createManualLead,
  LEAD_SOURCES,
  type ManualLeadInput,
} from '@/lib/admin/manual-leads'

const EMPTY_FORM: ManualLeadInput = {
  name: '',
  phone: '',
  email: '',
  serviceId: '',
  source: '',
  notes: '',
}

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (booking: AdminBooking) => void
}

export function AddLeadPanel({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ManualLeadInput>(EMPTY_FORM)
  const [nameError, setNameError] = useState('')
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const drawerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const requestClose = useCallback(() => {
    setClosing((prev) => {
      if (prev) return prev
      return true
    })
  }, [])

  useEffect(() => {
    if (open) {
      setVisible(true)
      setClosing(false)
      setForm(EMPTY_FORM)
      setNameError('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') requestClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, requestClose])

  function handleDrawerTransitionEnd(e: TransitionEvent<HTMLElement>) {
    if (e.target !== drawerRef.current || e.propertyName !== 'transform' || !closing) return
    setVisible(false)
    setClosing(false)
    onClose()
  }

  function updateField<K extends keyof ManualLeadInput>(key: K, value: ManualLeadInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key === 'name' && nameError) setNameError('')
  }

  function handleSave(e: FormEvent | MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const name = nameInputRef.current?.value ?? form.name
    if (!name.trim()) {
      setNameError('Name is required')
      nameInputRef.current?.focus()
      return
    }

    const booking = createManualLead({ ...form, name })
    onSubmit(booking)
    requestClose()
  }

  if ((!open && !visible) || !mounted) return null

  return createPortal(
    <div
      className={`admin-drawer-overlay${closing ? ' admin-drawer-overlay--closing' : ''}`}
      onClick={requestClose}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className={`admin-drawer${!closing ? ' admin-drawer--open' : ''}${closing ? ' admin-drawer--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleDrawerTransitionEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-lead-title"
      >
        <header className="admin-drawer-header">
          <h2 id="add-lead-title" className="admin-drawer-title">
            Add Lead
          </h2>
          <button
            type="button"
            className="admin-drawer-close"
            onClick={requestClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <form className="admin-drawer-body" noValidate onSubmit={handleSave}>
          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-name">
              Name <span className="admin-drawer-required">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="add-lead-name"
              type="text"
              className={`admin-filter-input${nameError ? ' admin-filter-input--error' : ''}`}
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              aria-invalid={nameError ? true : undefined}
              aria-describedby={nameError ? 'add-lead-name-error' : undefined}
              autoFocus
            />
            {nameError ? (
              <p id="add-lead-name-error" className="admin-field-error" role="alert">
                {nameError}
              </p>
            ) : null}
          </div>

          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-phone">
              Phone
            </label>
            <input
              id="add-lead-phone"
              type="tel"
              className="admin-filter-input"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>

          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-email">
              Email
            </label>
            <input
              id="add-lead-email"
              type="email"
              className="admin-filter-input"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>

          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-service">
              Service
            </label>
            <AdminSelect
              id="add-lead-service"
              variant="modal"
              value={form.serviceId}
              onChange={(e) => updateField('serviceId', e.target.value)}
            >
              <option value="">Select service</option>
              {BOOKING_SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nameEn}
                </option>
              ))}
            </AdminSelect>
          </div>

          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-source">
              Source
            </label>
            <AdminSelect
              id="add-lead-source"
              variant="modal"
              value={form.source}
              onChange={(e) => updateField('source', e.target.value)}
            >
              <option value="">Select source</option>
              {LEAD_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </AdminSelect>
          </div>

          <div className="admin-drawer-field">
            <label className="admin-filter-label" htmlFor="add-lead-notes">
              Notes
            </label>
            <textarea
              id="add-lead-notes"
              className="admin-filter-input admin-filter-textarea"
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={4}
            />
          </div>

          <footer className="admin-drawer-footer">
            <button
              type="button"
              className="admin-add-note-btn"
              onClick={handleSave}
            >
              Save Lead
            </button>
          </footer>
        </form>
      </aside>
    </div>,
    document.body,
  )
}
