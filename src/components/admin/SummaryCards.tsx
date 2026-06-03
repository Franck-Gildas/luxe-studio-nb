import type { SummaryStats } from '@/lib/admin/types'
import { formatCurrency } from '@/lib/admin/parse-total'

type Props = {
  stats: SummaryStats
}

const CARDS: { key: keyof SummaryStats; label: string; format?: (v: number) => string }[] = [
  { key: 'newLeadsToday', label: 'New leads today' },
  { key: 'totalNewBookings', label: 'Total new bookings' },
  { key: 'leadsNeedingFollowUp', label: 'Leads needing follow-up' },
  { key: 'bookedThisWeek', label: 'Booked this week' },
  { key: 'revenuePotential', label: 'Revenue potential', format: formatCurrency },
]

export function SummaryCards({ stats }: Props) {
  return (
    <div className="admin-summary-grid admin-animate-in admin-animate-in--2">
      {CARDS.map(({ key, label, format }, index) => (
        <div
          key={key}
          className={`admin-summary-card admin-summary-card--stagger-${index + 1}`}
        >
          <div className="admin-summary-value">
            {format ? format(stats[key]) : stats[key]}
          </div>
          <div className="admin-summary-label">{label}</div>
        </div>
      ))}
    </div>
  )
}
