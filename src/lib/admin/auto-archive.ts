import type { Lead, LeadStatus } from '@/lib/admin/types'
import { parseSheetTimestamp } from '@/lib/google-sheets'
import { isLeadArchived, setLeadArchived } from '@/lib/admin/storage'

const STALE_DAYS = 30
const FINAL_STATUSES: LeadStatus[] = ['Completed', 'Not Interested']

function startOfDay(date: Date): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function isLeadDateStale(dateStr: string, now = new Date()): boolean {
  const created = parseSheetTimestamp(dateStr)
  if (!created) return false
  const today = startOfDay(now)
  const createdDay = startOfDay(created)
  const diffDays = (today.getTime() - createdDay.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays >= STALE_DAYS
}

/** Silently archive final-status leads whose submission date is 30+ days old. */
export function autoArchiveStaleLeads(leads: Lead[]): void {
  if (typeof window === 'undefined') return

  for (const lead of leads) {
    if (!FINAL_STATUSES.includes(lead.effectiveStatus)) continue
    if (isLeadArchived(lead.sheetRow)) continue
    if (!isLeadDateStale(lead.date)) continue
    setLeadArchived(lead.sheetRow, true, lead.effectiveStatus)
  }
}
