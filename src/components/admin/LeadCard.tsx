'use client'

import type { Lead } from '@/lib/admin/types'
import { statusCardClass, statusDotClass } from '@/components/admin/StatusBadge'
import {
  getReminderUrgency,
  reminderBadgeClass,
  reminderBadgeLabel,
  type ReminderRecord,
} from '@/lib/admin/followups'

function formatCreatedAt(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr || '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type Props = {
  lead: Lead
  reminder?: ReminderRecord | null
  isDragging?: boolean
  onDragStart: (sheetRow: number) => void
  onDragEnd?: () => void
  onClick?: () => void
}

export function LeadCard({
  lead,
  reminder,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
}: Props) {
  const urgency = reminder ? getReminderUrgency(reminder) : null

  return (
    <div
      className={`admin-lead-card ${statusCardClass(lead.effectiveStatus)}${isDragging ? ' admin-lead-card--dragging' : ''}`}
      draggable
      onDragStart={() => onDragStart(lead.sheetRow)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      {urgency && (
        <span className={reminderBadgeClass(urgency)}>{reminderBadgeLabel(urgency)}</span>
      )}
      <div className="admin-lead-card-name">{lead.name || 'Unknown'}</div>
      <div className="admin-lead-card-meta">
        {lead.service.split('—')[0]?.trim() || lead.service || '—'}
      </div>
      <div className="admin-lead-card-meta">{lead.how_heard || '—'}</div>
      <div className="admin-lead-card-footer">
        <span className="admin-lead-card-meta">{formatCreatedAt(lead.date)}</span>
        <span className={statusDotClass(lead.effectiveStatus)} aria-hidden />
      </div>
    </div>
  )
}
