'use client'

import type { Lead, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'
import { AdminSelect } from '@/components/admin/AdminSelect'
import { statusCardClass, statusDotClass } from '@/components/admin/StatusBadge'
import {
  getReminderUrgency,
  reminderBadgeClass,
  reminderBadgeLabel,
  type ReminderRecord,
} from '@/lib/admin/followups'
import { parseSheetTimestamp } from '@/lib/google-sheets'

function formatCreatedAt(dateStr: string): string {
  const d = parseSheetTimestamp(dateStr)
  if (!d) return dateStr || '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type PendingMove = {
  targetStatus: LeadStatus
  sourceStatus: LeadStatus
  kind: 'final-to-active' | 'final-to-final'
}

type Props = {
  lead: Lead
  reminder?: ReminderRecord | null
  isDragging?: boolean
  isArchived?: boolean
  showRestore?: boolean
  archivedFrom?: LeadStatus
  isArchivingOut?: boolean
  showArchivePrompt?: boolean
  pendingMove?: PendingMove
  onDragStart: (sheetRow: number) => void
  onDragEnd?: () => void
  onClick?: () => void
  onArchive?: () => void
  onRestore?: (sheetRow: number) => void
  onConfirmArchive?: (sheetRow: number) => void
  onDismissArchive?: (sheetRow: number) => void
  onConfirmMove?: (sheetRow: number) => void
  onCancelMove?: (sheetRow: number) => void
  draggable?: boolean
  showStatusPicker?: boolean
  onStatusChange?: (sheetRow: number, status: LeadStatus) => void
}

export function LeadCard({
  lead,
  reminder,
  isDragging,
  isArchived = false,
  showRestore = false,
  archivedFrom,
  isArchivingOut = false,
  showArchivePrompt = false,
  pendingMove,
  onDragStart,
  onDragEnd,
  onClick,
  onArchive,
  onRestore,
  onConfirmArchive,
  onDismissArchive,
  onConfirmMove,
  onCancelMove,
  draggable = true,
  showStatusPicker = false,
  onStatusChange,
}: Props) {
  const urgency = reminder ? getReminderUrgency(reminder) : null
  const showReminderBadge = urgency && urgency !== 'upcoming'
  const showArchiveBtn = !isArchived
  const showRestoreBtn = Boolean(onRestore) && showRestore && isArchived
  const showMoveConfirm = Boolean(pendingMove)
  const promptOpen = showArchivePrompt || showMoveConfirm
  const moveConfirmText =
    pendingMove?.kind === 'final-to-final'
      ? `Change final status to ${pendingMove.targetStatus}?`
      : pendingMove
        ? `This lead was marked ${pendingMove.sourceStatus}. Move back to ${pendingMove.targetStatus}?`
        : ''

  return (
    <div
      className={[
        'admin-lead-card',
        statusCardClass(lead.effectiveStatus),
        isDragging ? ' admin-lead-card--dragging' : '',
        isArchived ? ' admin-lead-card--archived' : '',
        isArchivingOut ? ' admin-lead-card--archiving-out' : '',
        promptOpen ? ' admin-lead-card--prompt-open' : '',
        !draggable ? ' admin-lead-card--touch' : '',
      ].join('')}
      draggable={draggable}
      onDragStart={draggable ? () => onDragStart(lead.sheetRow) : undefined}
      onDragEnd={draggable ? onDragEnd : undefined}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      {showReminderBadge && urgency && (
        <div className="admin-lead-card__top">
          <span className={reminderBadgeClass(urgency)}>{reminderBadgeLabel(urgency)}</span>
        </div>
      )}
      <div className="admin-lead-card-name">{lead.name || 'Unknown'}</div>
      {archivedFrom && (
        <span className="admin-lead-card__archive-reason">
          Archived as {archivedFrom}
        </span>
      )}
      <div className="admin-lead-card-meta">
        {lead.service.split('—')[0]?.trim() || lead.service || '—'}
      </div>
      <div className="admin-lead-card-meta">{lead.how_heard || '—'}</div>
      {showStatusPicker && onStatusChange && (
        <div
          className="admin-lead-card__status-picker"
          onClick={(e) => e.stopPropagation()}
        >
          <AdminSelect
            variant="status"
            value={lead.effectiveStatus}
            onChange={(e) =>
              onStatusChange(lead.sheetRow, e.target.value as LeadStatus)
            }
            aria-label={`Move ${lead.name || 'lead'} to`}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </AdminSelect>
        </div>
      )}
      <div className="admin-lead-card-footer">
        <span className="admin-lead-card-meta">{formatCreatedAt(lead.date)}</span>
        <div className="admin-lead-card-footer-actions">
          {showRestoreBtn && (
            <button
              type="button"
              className="admin-lead-card__archive-btn admin-lead-card__archive-btn--restore"
              onClick={(e) => {
                e.stopPropagation()
                onRestore?.(lead.sheetRow)
              }}
            >
              Restore
            </button>
          )}
          {showArchiveBtn && (
            <button
              type="button"
              className="admin-lead-card__archive-btn admin-lead-card__archive-btn--archive"
              onClick={(e) => {
                e.stopPropagation()
                onArchive?.()
              }}
            >
              Archive
            </button>
          )}
          {!showStatusPicker && (
            <span className={statusDotClass(lead.effectiveStatus)} aria-hidden />
          )}
        </div>
      </div>

      <div
        className="admin-lead-card__archive-prompt"
        aria-hidden={!showArchivePrompt}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-lead-card__archive-prompt-inner">
          <p className="admin-lead-card__archive-prompt-text">Archive this lead?</p>
          <div className="admin-lead-card__archive-prompt-actions">
            <button
              type="button"
              className="admin-lead-card__archive-prompt-btn admin-lead-card__archive-prompt-btn--primary"
              onClick={() => onConfirmArchive?.(lead.sheetRow)}
            >
              Archive
            </button>
            <button
              type="button"
              className="admin-lead-card__archive-prompt-btn"
              onClick={() => onDismissArchive?.(lead.sheetRow)}
            >
              Keep
            </button>
          </div>
        </div>
      </div>

      <div
        className="admin-lead-card__archive-prompt admin-lead-card__move-prompt"
        aria-hidden={!showMoveConfirm}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-lead-card__archive-prompt-inner">
          <p className="admin-lead-card__archive-prompt-text">{moveConfirmText}</p>
          <div className="admin-lead-card__archive-prompt-actions">
            <button
              type="button"
              className="admin-lead-card__archive-prompt-btn admin-lead-card__archive-prompt-btn--primary"
              onClick={() => onConfirmMove?.(lead.sheetRow)}
            >
              Confirm
            </button>
            <button
              type="button"
              className="admin-lead-card__archive-prompt-btn"
              onClick={() => onCancelMove?.(lead.sheetRow)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
