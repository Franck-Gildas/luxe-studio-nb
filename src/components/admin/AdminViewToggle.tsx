'use client'

import { IconCalendar } from '@/components/admin/AdminIcons'

export type AdminLeadsView = 'table' | 'calendar'

type Props = {
  view: AdminLeadsView
  onChange: (view: AdminLeadsView) => void
}

function IconTable({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6.5h14v11H5v-11zM9 6.5v11M5 10.5h14M5 14.5h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AdminViewToggle({ view, onChange }: Props) {
  return (
    <div className="admin-view-toggle" role="tablist" aria-label="Leads view">
      <button
        type="button"
        role="tab"
        aria-selected={view === 'table'}
        className={`admin-view-toggle-btn${view === 'table' ? ' admin-view-toggle-btn--active' : ''}`}
        onClick={() => onChange('table')}
      >
        <IconTable size={16} />
        <span className="admin-view-toggle-label">Table</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === 'calendar'}
        className={`admin-view-toggle-btn${view === 'calendar' ? ' admin-view-toggle-btn--active' : ''}`}
        onClick={() => onChange('calendar')}
      >
        <IconCalendar size={16} />
        <span className="admin-view-toggle-label">Calendar</span>
      </button>
    </div>
  )
}
