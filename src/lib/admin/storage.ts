import type { FollowUpNote, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'

const STATUS_OVERRIDES_KEY = 'luxe-admin-status-overrides'
const ARCHIVED_ROWS_KEY = 'luxe-admin-archived-rows'

export const ARCHIVE_CHANGED_EVENT = 'luxe-admin-archive-changed'

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

export type ArchivedFromMap = Record<number, LeadStatus>

function parseArchivedFromMap(parsed: unknown): ArchivedFromMap {
  const result: ArchivedFromMap = {}
  if (Array.isArray(parsed)) {
    for (const n of parsed) {
      if (typeof n === 'number' && Number.isFinite(n)) {
        result[n] = 'Completed'
      }
    }
    return result
  }
  if (parsed && typeof parsed === 'object') {
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const row = Number(key)
      if (Number.isFinite(row) && LEAD_STATUSES.includes(value as LeadStatus)) {
        result[row] = value as LeadStatus
      }
    }
  }
  return result
}

export function getArchivedFromMap(): ArchivedFromMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(ARCHIVED_ROWS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    const map = parseArchivedFromMap(parsed)
    if (Array.isArray(parsed)) {
      persistArchivedFromMap(map)
    }
    return map
  } catch {
    return {}
  }
}

function persistArchivedFromMap(map: ArchivedFromMap): void {
  const serialized: Record<string, LeadStatus> = {}
  for (const [row, status] of Object.entries(map)) {
    serialized[String(row)] = status
  }
  localStorage.setItem(ARCHIVED_ROWS_KEY, JSON.stringify(serialized))
}

export function getArchivedRows(): Set<number> {
  return new Set(Object.keys(getArchivedFromMap()).map(Number))
}

export function getArchivedFrom(sheetRow: number): LeadStatus | undefined {
  return getArchivedFromMap()[sheetRow]
}

export function isLeadArchived(sheetRow: number): boolean {
  return sheetRow in getArchivedFromMap()
}

export function setLeadArchived(
  sheetRow: number,
  archived: boolean,
  fromStatus?: LeadStatus,
): void {
  const map = getArchivedFromMap()
  if (archived) {
    map[sheetRow] = fromStatus ?? map[sheetRow] ?? 'Completed'
  } else {
    delete map[sheetRow]
  }
  persistArchivedFromMap(map)
  window.dispatchEvent(new CustomEvent(ARCHIVE_CHANGED_EVENT))
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
