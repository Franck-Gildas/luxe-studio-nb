'use client'

import type { CSSProperties } from 'react'
import type { Lead, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { AdminSelect } from '@/components/admin/AdminSelect'
import { AdminIconButton } from '@/components/admin/AdminIconButton'
import { IconBell, IconExternal, IconMail, IconMessage, IconPhone } from '@/components/admin/AdminIcons'
import { formatReminderShort } from '@/lib/admin/followups'
import { useFollowUps } from '@/lib/admin/use-followups'

import { parseSheetTimestamp } from '@/lib/google-sheets'

function formatDate(dateStr: string): string {
  const d = parseSheetTimestamp(dateStr)
  if (!d) return dateStr || '—'
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function phoneForSms(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

type Props = {
  leads: Lead[]
  revealKey?: number
  onStatusChange: (sheetRow: number, status: LeadStatus) => void
  onViewLead: (lead: Lead) => void
  onReminderClick?: (lead: Lead) => void
}

const STAGGER_CAP = 28
const STAGGER_MS = 14

function rowStyle(index: number): CSSProperties {
  return { '--row-i': Math.min(index, STAGGER_CAP) } as CSSProperties
}

function rowRevealStyle(index: number): CSSProperties {
  return {
    ...rowStyle(index),
    animationDelay: `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms`,
  } as CSSProperties
}

function ContactActions({ email, phone }: { email: string; phone: string }) {
  const tel = phone && phone !== 'Not provided' ? phone : ''
  const smsPhone = tel ? phoneForSms(tel) : ''

  return (
    <div className="admin-contact-actions">
      {tel && (
        <AdminIconButton href={`tel:${tel}`} label="Call">
          <IconPhone size={16} />
        </AdminIconButton>
      )}
      {email && (
        <AdminIconButton href={`mailto:${email}`} label="Email">
          <IconMail size={16} />
        </AdminIconButton>
      )}
      {smsPhone && (
        <AdminIconButton href={`sms:${smsPhone}`} label="Send SMS">
          <IconMessage size={16} />
        </AdminIconButton>
      )}
    </div>
  )
}

function rowStaggerClass(): string {
  return 'admin-table-row'
}

export function LeadsTable({
  leads,
  revealKey = 0,
  onStatusChange,
  onViewLead,
  onReminderClick,
}: Props) {
  const followUps = useFollowUps()

  if (leads.length === 0) {
    return <p className="admin-empty">No leads match your filters.</p>
  }

  const revealActive = revealKey > 0

  return (
    <>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Total</th>
              <th>Artist</th>
              <th>Appointment</th>
              <th>Reminder</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody
            key={revealKey}
            className={revealActive ? 'admin-table-body--reveal' : undefined}
          >
            {leads.map((lead, index) => {
              const reminder = followUps[String(lead.sheetRow)]
              return (
              <tr
                key={lead.sheetRow}
                className={rowStaggerClass()}
                style={revealActive ? rowRevealStyle(index) : rowStyle(index)}
              >
                <td>{formatDate(lead.date)}</td>
                <td>{lead.name}</td>
                <td>
                  <div>{lead.email}</div>
                  <div className="admin-table-contact-phone">{lead.phone}</div>
                  <ContactActions email={lead.email} phone={lead.phone} />
                </td>
                <td>{lead.service.split('—')[0]?.trim() || lead.service}</td>
                <td className="admin-table-total">{lead.total}</td>
                <td>{lead.artist.split('—')[0]?.trim() || lead.artist}</td>
                <td>
                  <div>{lead.appointment_date || '—'}</div>
                  <div className="admin-table-contact-phone">
                    {lead.appointment_time || ''}
                  </div>
                </td>
                <td>
                  {reminder ? (
                    <button
                      type="button"
                      className="admin-reminder-bell-btn"
                      title={formatReminderShort(reminder.date, reminder.time)}
                      aria-label={`Reminder: ${formatReminderShort(reminder.date, reminder.time)}`}
                      onClick={() => onReminderClick?.(lead) ?? onViewLead(lead)}
                    >
                      <IconBell size={18} />
                    </button>
                  ) : (
                    <span className="admin-reminder-empty" aria-hidden>
                      —
                    </span>
                  )}
                </td>
                <td>
                  <AdminSelect
                    variant="status"
                    value={lead.effectiveStatus}
                    onChange={(e) =>
                      onStatusChange(lead.sheetRow, e.target.value as LeadStatus)
                    }
                    aria-label={`Status for ${lead.name}`}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </AdminSelect>
                </td>
                <td>
                  <button
                    type="button"
                    className="admin-view-btn"
                    onClick={() => onViewLead(lead)}
                  >
                    <span>View</span>
                    <IconExternal size={14} />
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      <div
        className={`admin-mobile-cards${revealActive ? ' admin-mobile-cards--reveal' : ''}`}
        key={`mobile-${revealKey}`}
      >
        {leads.map((lead, index) => {
          const reminder = followUps[String(lead.sheetRow)]
          return (
          <div
            key={lead.sheetRow}
            className="admin-mobile-card"
            style={revealActive ? rowRevealStyle(index) : rowStyle(index)}
          >
            <div className="admin-mobile-card-header">
              <span className="admin-mobile-card-name">{lead.name}</span>
              <div className="admin-mobile-card-header-badges">
                {reminder && (
                  <button
                    type="button"
                    className="admin-reminder-bell-btn"
                    title={formatReminderShort(reminder.date, reminder.time)}
                    aria-label={`Reminder: ${formatReminderShort(reminder.date, reminder.time)}`}
                    onClick={() => onReminderClick?.(lead) ?? onViewLead(lead)}
                  >
                    <IconBell size={18} />
                  </button>
                )}
                <StatusBadge status={lead.effectiveStatus} />
              </div>
            </div>
            <div className="admin-mobile-card-row">
              <span>Date</span>
              <span>{formatDate(lead.date)}</span>
            </div>
            <div className="admin-mobile-card-row">
              <span>Service</span>
              <span>{lead.service.split('—')[0]?.trim() || lead.service}</span>
            </div>
            <div className="admin-mobile-card-row">
              <span>Total</span>
              <span className="admin-table-total">{lead.total}</span>
            </div>
            <div className="admin-mobile-card-row">
              <span>Artist</span>
              <span>{lead.artist.split('—')[0]?.trim() || lead.artist}</span>
            </div>
            <div className="admin-mobile-card-row">
              <span>Appointment</span>
              <span>
                {lead.appointment_date} {lead.appointment_time}
              </span>
            </div>
            <ContactActions email={lead.email} phone={lead.phone} />
            <div className="admin-mobile-card-actions">
              <AdminSelect
                variant="status"
                value={lead.effectiveStatus}
                onChange={(e) =>
                  onStatusChange(lead.sheetRow, e.target.value as LeadStatus)
                }
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </AdminSelect>
              <button
                type="button"
                className="admin-view-btn"
                onClick={() => onViewLead(lead)}
              >
                <span>View</span>
                <IconExternal size={14} />
              </button>
            </div>
          </div>
        )})}
      </div>
    </>
  )
}
