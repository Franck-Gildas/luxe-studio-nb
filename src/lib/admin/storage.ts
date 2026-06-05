import type { FollowUpNote, Lead, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'

const STATUS_OVERRIDES_KEY = 'luxe-admin-status-overrides'
const ARCHIVED_ROWS_KEY = 'luxe-admin-archived-rows'
const NOTES_KEY_PREFIX = 'luxe-admin-notes-'

export const NOTES_CHANGED_EVENT = 'luxe-admin-notes-changed'

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

export function notesKey(sheetRow: number): string {
  return `${NOTES_KEY_PREFIX}${sheetRow}`
}

function isSheetRowNotesKey(key: string): boolean {
  if (!key.startsWith(NOTES_KEY_PREFIX)) return false
  const suffix = key.slice(NOTES_KEY_PREFIX.length)
  return /^\d+$/.test(suffix)
}

function parseNotes(raw: string | null): FollowUpNote[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as FollowUpNote[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function notifyNotesChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NOTES_CHANGED_EVENT))
  }
}

/** One-time migration from email-keyed notes to sheetRow keys. */
export function migrateNotesToSheetRows(leads: Lead[]): void {
  if (typeof window === 'undefined') return

  const legacyKeys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(NOTES_KEY_PREFIX) && !isSheetRowNotesKey(key)) {
      legacyKeys.push(key)
    }
  }
  if (legacyKeys.length === 0) return

  const emailToRows = new Map<string, number[]>()
  for (const lead of leads) {
    const email = lead.email.toLowerCase().trim()
    const rows = emailToRows.get(email) ?? []
    rows.push(lead.sheetRow)
    emailToRows.set(email, rows)
  }
  for (const [email, rows] of emailToRows) {
    emailToRows.set(
      email,
      rows.sort((a, b) => a - b),
    )
  }

  for (const legacyKey of legacyKeys) {
    const email = legacyKey.slice(NOTES_KEY_PREFIX.length).toLowerCase().trim()
    const notes = parseNotes(localStorage.getItem(legacyKey))
    if (notes.length === 0) {
      localStorage.removeItem(legacyKey)
      continue
    }

    const rows = emailToRows.get(email) ?? []
    if (rows.length === 0) continue

    const targetRow = rows[0]
    const newKey = notesKey(targetRow)
    const existing = parseNotes(localStorage.getItem(newKey))
    const merged = existing.length > 0 ? [...notes, ...existing] : notes
    localStorage.setItem(newKey, JSON.stringify(merged))
    localStorage.removeItem(legacyKey)
  }

  notifyNotesChanged()
}

export function getFollowUpNotes(sheetRow: number): FollowUpNote[] {
  if (typeof window === 'undefined') return []
  return parseNotes(localStorage.getItem(notesKey(sheetRow)))
}

export function addFollowUpNote(sheetRow: number, text: string): FollowUpNote[] {
  const trimmed = text.trim()
  if (!trimmed) return getFollowUpNotes(sheetRow)
  const notes = getFollowUpNotes(sheetRow)
  const note: FollowUpNote = {
    text: trimmed,
    timestamp: new Date().toISOString(),
  }
  const updated = [note, ...notes]
  localStorage.setItem(notesKey(sheetRow), JSON.stringify(updated))
  notifyNotesChanged()
  return updated
}
