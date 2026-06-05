'use client'

import { useMemo } from 'react'
import type { Lead } from '@/lib/admin/types'
import {
  completeReminder,
  formatReminderDateTime,
  groupReminders,
  type ReminderUrgency,
} from '@/lib/admin/followups'
import { useFollowUps } from '@/lib/admin/use-followups'
import {
  IconMail,
  IconMessage,
  IconPhone,
} from '@/components/admin/AdminIcons'

function phoneForSms(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

type Props = {
  leads: Lead[]
  onViewLead: (lead: Lead) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const SECTIONS: { key: ReminderUrgency; title: string; className: string }[] = [
  { key: 'overdue', title: 'Overdue', className: 'reminders-section--overdue' },
  { key: 'today', title: 'Due Today', className: 'reminders-section--today' },
  { key: 'tomorrow', title: 'Due Tomorrow', className: 'reminders-section--tomorrow' },
  { key: 'upcoming', title: 'Upcoming', className: 'reminders-section--upcoming' },
]

export function RemindersPanel({
  leads,
  onViewLead,
  collapsed = false,
  onToggleCollapse,
}: Props) {
  const store = useFollowUps()

  const leadBySheetRow = useMemo(() => {
    const map = new Map<number, Lead>()
    for (const lead of leads) {
      map.set(lead.sheetRow, lead)
    }
    return map
  }, [leads])

  const groups = useMemo(() => groupReminders(store), [store])
  const totalCount =
    groups.overdue.length +
    groups.today.length +
    groups.tomorrow.length +
    groups.upcoming.length

  if (totalCount === 0) return null

  return (
    <section
      className={`reminders-panel admin-animate-in admin-animate-in--4${collapsed ? ' reminders-panel--collapsed' : ''}`}
      id="reminders-panel"
    >
      <div className="reminders-panel-header">
        <h2 className="admin-section-title reminders-panel-title">Follow-Up Reminders</h2>
        {onToggleCollapse && (
          <button
            type="button"
            className="admin-view-btn reminders-panel-toggle"
            onClick={onToggleCollapse}
            aria-expanded={!collapsed}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="reminders-panel-body">
          {SECTIONS.map(({ key, title, className }) => {
            const items = groups[key]
            if (items.length === 0) return null
            return (
              <div key={key} className={`reminders-section ${className}`}>
                <h3 className="reminders-section-title">{title}</h3>
                <ul className="reminders-section-list">
                  {items.map(({ sheetRow, record }) => {
                    const lead = leadBySheetRow.get(sheetRow)
                    const email = lead?.email ?? ''
                    const name = lead?.name || `Lead #${sheetRow}`
                    const service =
                      lead?.service.split('—')[0]?.trim() || lead?.service || '—'
                    const tel =
                      lead?.phone && lead.phone !== 'Not provided' ? lead.phone : ''
                    const smsPhone = tel ? phoneForSms(tel) : ''

                    return (
                      <li key={sheetRow} className="reminder-item">
                        <button
                          type="button"
                          className="reminder-item-main"
                          onClick={() => lead && onViewLead(lead)}
                        >
                          <span className="reminder-item-name">{name}</span>
                          <span className="reminder-item-service">{service}</span>
                          <span className="reminder-item-time">
                            {formatReminderDateTime(record.date, record.time)}
                          </span>
                        </button>
                        <div className="reminder-actions">
                          {tel && (
                            <a
                              className="reminder-action"
                              href={`tel:${tel}`}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Call ${name}`}
                            >
                              <IconPhone size={14} />
                              <span>Call</span>
                            </a>
                          )}
                          {smsPhone && (
                            <a
                              className="reminder-action"
                              href={`sms:${smsPhone}`}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`SMS ${name}`}
                            >
                              <IconMessage size={14} />
                              <span>SMS</span>
                            </a>
                          )}
                          {email && (
                            <a
                              className="reminder-action"
                              href={`mailto:${email}`}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Email ${name}`}
                            >
                              <IconMail size={14} />
                              <span>Email</span>
                            </a>
                          )}
                          <button
                            type="button"
                            className="reminder-done-btn"
                            onClick={() => completeReminder(sheetRow)}
                          >
                            Mark as Done
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
