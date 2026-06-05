import type { Lead } from '@/lib/admin/types'
import { addFollowUpNote } from '@/lib/admin/storage'

export const FOLLOWUPS_STORAGE_KEY = 'luxe-followups'

export type ReminderStatus = 'pending'

export type ReminderRecord = {
  date: string
  time: string
  timestamp: number
  status: ReminderStatus
}

export type FollowUpsStore = Record<string, ReminderRecord>

export type ReminderUrgency = 'overdue' | 'today' | 'tomorrow' | 'upcoming'

export const REMINDER_CHANGED_EVENT = 'luxe-followups-changed'

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function reminderStorageKey(sheetRow: number): string {
  return String(sheetRow)
}

export function buildReminderTimestamp(date: string, time: string): number {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  return new Date(y, m - 1, d, hh ?? 0, mm ?? 0, 0, 0).getTime()
}

export function notifyFollowUpsChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(REMINDER_CHANGED_EVENT))
  }
}

export function getFollowUps(): FollowUpsStore {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(FOLLOWUPS_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as FollowUpsStore
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function saveFollowUps(store: FollowUpsStore): void {
  localStorage.setItem(FOLLOWUPS_STORAGE_KEY, JSON.stringify(store))
  notifyFollowUpsChanged()
}

/** One-time migration from email-keyed reminders to sheetRow keys. */
export function migrateFollowUpsToSheetRows(leads: Lead[]): void {
  if (typeof window === 'undefined') return
  const store = getFollowUps()
  const keys = Object.keys(store)
  if (keys.length === 0) return
  if (keys.every((k) => /^\d+$/.test(k))) return

  const emailToRow = new Map<string, number>()
  for (const lead of leads) {
    const email = normalizeEmail(lead.email)
    if (email) emailToRow.set(email, lead.sheetRow)
  }

  const next: FollowUpsStore = {}
  for (const [key, record] of Object.entries(store)) {
    if (/^\d+$/.test(key)) {
      next[key] = record
      continue
    }
    const row = emailToRow.get(normalizeEmail(key))
    if (row !== undefined) {
      next[reminderStorageKey(row)] = record
    }
  }

  localStorage.setItem(FOLLOWUPS_STORAGE_KEY, JSON.stringify(next))
  notifyFollowUpsChanged()
}

export function getReminder(sheetRow: number): ReminderRecord | null {
  const key = reminderStorageKey(sheetRow)
  const record = getFollowUps()[key]
  if (!record || record.status !== 'pending') return null
  return record
}

export function setReminder(sheetRow: number, date: string, time: string): ReminderRecord {
  const key = reminderStorageKey(sheetRow)
  const record: ReminderRecord = {
    date,
    time,
    timestamp: buildReminderTimestamp(date, time),
    status: 'pending',
  }
  const store = getFollowUps()
  store[key] = record
  saveFollowUps(store)
  return record
}

export function deleteReminder(sheetRow: number): void {
  const key = reminderStorageKey(sheetRow)
  const store = getFollowUps()
  if (store[key]) {
    delete store[key]
    saveFollowUps(store)
  }
}

export function completeReminder(sheetRow: number): void {
  const key = reminderStorageKey(sheetRow)
  const store = getFollowUps()
  if (!store[key]) return

  const completedAt = new Date()
  const noteText = `Follow-up completed on ${completedAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} at ${completedAt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })}`

  delete store[key]
  localStorage.setItem(FOLLOWUPS_STORAGE_KEY, JSON.stringify(store))
  addFollowUpNote(sheetRow, noteText)
  notifyFollowUpsChanged()
}

function startOfDay(d: Date): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function dateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getReminderUrgency(record: ReminderRecord, now = new Date()): ReminderUrgency {
  const today = startOfDay(now)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (record.timestamp < now.getTime()) {
    return 'overdue'
  }

  const reminderDay = startOfDay(new Date(record.timestamp))
  const reminderDayKey = dateKey(reminderDay)
  const todayKey = dateKey(today)
  const tomorrowKey = dateKey(tomorrow)

  if (reminderDayKey === todayKey) return 'today'
  if (reminderDayKey === tomorrowKey) return 'tomorrow'
  return 'upcoming'
}

export function formatReminderDateTime(date: string, time: string): string {
  const ts = buildReminderTimestamp(date, time)
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) {
    return `${date} at ${time}`
  }
  const dateLine = d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const [hh, mm] = time.split(':').map(Number)
  const timeDate = new Date(2000, 0, 1, hh ?? 0, mm ?? 0)
  const timeLine = timeDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateLine} at ${timeLine}`
}

export function formatReminderShort(date: string, time: string): string {
  return formatReminderDateTime(date, time)
}

export function reminderBadgeLabel(urgency: ReminderUrgency): string {
  switch (urgency) {
    case 'overdue':
      return 'Overdue'
    case 'today':
      return 'Today'
    case 'tomorrow':
      return 'Tomorrow'
    case 'upcoming':
      return 'Upcoming'
  }
}

export function reminderBadgeClass(urgency: ReminderUrgency): string {
  const base = 'reminder-badge'
  switch (urgency) {
    case 'overdue':
      return `${base} reminder-overdue`
    case 'today':
      return `${base} reminder-today`
    case 'tomorrow':
      return `${base} reminder-badge--tomorrow`
    case 'upcoming':
      return `${base} reminder-upcoming`
  }
}

export function countFollowUpsToday(store?: FollowUpsStore): number {
  const data = store ?? getFollowUps()
  const now = new Date()
  let count = 0
  for (const record of Object.values(data)) {
    if (record.status !== 'pending') continue
    if (getReminderUrgency(record, now) === 'today') count++
  }
  return count
}

export function countHeaderReminderAlerts(store?: FollowUpsStore): number {
  const data = store ?? getFollowUps()
  const now = new Date()
  let count = 0
  for (const record of Object.values(data)) {
    if (record.status !== 'pending') continue
    const urgency = getReminderUrgency(record, now)
    if (urgency === 'today' || urgency === 'overdue') count++
  }
  return count
}

export type ReminderListItem = {
  sheetRow: number
  record: ReminderRecord
  urgency: ReminderUrgency
}

export function groupReminders(store?: FollowUpsStore): Record<ReminderUrgency, ReminderListItem[]> {
  const data = store ?? getFollowUps()
  const now = new Date()
  const groups: Record<ReminderUrgency, ReminderListItem[]> = {
    overdue: [],
    today: [],
    tomorrow: [],
    upcoming: [],
  }

  for (const [key, record] of Object.entries(data)) {
    if (record.status !== 'pending') continue
    const sheetRow = Number(key)
    if (!Number.isFinite(sheetRow) || sheetRow <= 0) continue
    const urgency = getReminderUrgency(record, now)
    groups[urgency].push({ sheetRow, record, urgency })
  }

  const sortByTime = (a: ReminderListItem, b: ReminderListItem) =>
    a.record.timestamp - b.record.timestamp

  groups.overdue.sort(sortByTime)
  groups.today.sort(sortByTime)
  groups.tomorrow.sort(sortByTime)
  groups.upcoming.sort(sortByTime)

  return groups
}

export function defaultReminderDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return dateKey(d)
}

export function defaultReminderTime(): string {
  return '10:00'
}
