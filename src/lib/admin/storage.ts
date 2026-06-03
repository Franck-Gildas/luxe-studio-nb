import type { FollowUpNote, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'

const STATUS_OVERRIDES_KEY = 'luxe-admin-status-overrides'

export function getStatusOverrides(): Record<number, LeadStatus> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STATUS_OVERRIDES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, string>
    const result: Record<number, LeadStatus> = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (LEAD_STATUSES.includes(value as LeadStatus)) {
        result[Number(key)] = value as LeadStatus
      }
    }
    return result
  } catch {
    return {}
  }
}

export function setStatusOverride(sheetRow: number, status: LeadStatus): void {
  const overrides = getStatusOverrides()
  overrides[sheetRow] = status
  localStorage.setItem(STATUS_OVERRIDES_KEY, JSON.stringify(overrides))
}

export function notesKey(email: string): string {
  return `luxe-admin-notes-${email.toLowerCase().trim()}`
}

export function getFollowUpNotes(email: string): FollowUpNote[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(notesKey(email))
    if (!raw) return []
    const parsed = JSON.parse(raw) as FollowUpNote[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addFollowUpNote(email: string, text: string): FollowUpNote[] {
  const trimmed = text.trim()
  if (!trimmed) return getFollowUpNotes(email)
  const notes = getFollowUpNotes(email)
  const note: FollowUpNote = {
    text: trimmed,
    timestamp: new Date().toISOString(),
  }
  const updated = [note, ...notes]
  localStorage.setItem(notesKey(email), JSON.stringify(updated))
  return updated
}
