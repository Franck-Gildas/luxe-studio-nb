import type { Lead } from '@/lib/admin/types'
import { getFollowUpNotes } from '@/lib/admin/storage'

function escapeCsvField(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

const COLUMNS = [
  'date',
  'name',
  'pronouns',
  'email',
  'phone',
  'service',
  'addons',
  'total',
  'artist',
  'appointment_date',
  'appointment_time',
  'first_visit',
  'how_heard',
  'source',
  'notes',
  'status',
  'effective_status',
  'follow_up_notes',
] as const

export function exportLeadsCsv(leads: Lead[]): void {
  const header = COLUMNS.join(',')
  const rows = leads.map((lead) => {
    const followUpNotes = getFollowUpNotes(lead.email)
      .map((n) => `[${new Date(n.timestamp).toLocaleString()}] ${n.text}`)
      .join(' | ')

    const values = [
      lead.date,
      lead.name,
      lead.pronouns,
      lead.email,
      lead.phone,
      lead.service,
      lead.addons,
      lead.total,
      lead.artist,
      lead.appointment_date,
      lead.appointment_time,
      lead.first_visit,
      lead.how_heard,
      lead.how_heard,
      lead.notes,
      lead.status,
      lead.effectiveStatus,
      followUpNotes,
    ]

    return values.map(escapeCsvField).join(',')
  })

  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const date = new Date().toISOString().slice(0, 10)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `luxe-leads-${date}.csv`
  anchor.click()
  URL.revokeObjectURL(url)
}
