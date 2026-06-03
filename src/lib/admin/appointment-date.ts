/** Parse appointment_date from sheet (ISO or locale long format). */
export function parseAppointmentDate(value: string): Date | null {
  if (!value?.trim() || value === '—') return null
  const d = new Date(value.trim())
  if (Number.isNaN(d.getTime())) return null
  return d
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

export type CalendarCell = {
  date: Date
  inCurrentMonth: boolean
  isToday: boolean
  key: string
}

/** Build a 6-row Sunday-start calendar grid for the given month. */
export function buildMonthGrid(viewMonth: Date, today = new Date()): CalendarCell[] {
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const first = new Date(year, month, 1)
  const startOffset = first.getDay()
  const gridStart = new Date(year, month, 1 - startOffset)

  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    cells.push({
      date,
      inCurrentMonth: date.getMonth() === month,
      isToday: isSameCalendarDay(date, today),
      key: toDateKey(date),
    })
  }
  return cells
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function formatAppointmentTime(time: string): string {
  const t = time?.trim()
  if (!t) return ''
  return t
}
