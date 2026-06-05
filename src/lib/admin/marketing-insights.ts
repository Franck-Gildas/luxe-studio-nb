import { parseSheetTimestamp, type AdminBooking } from '@/lib/google-sheets'
import type { LeadStatus } from '@/lib/admin/types'
import { HEARD_OPTIONS } from '@/data/booking'
import { parseTotal } from '@/lib/admin/parse-total'

export type MarketingBooking = AdminBooking & { effectiveStatus?: LeadStatus }

export type InsightsRange = '7d' | '30d' | '90d' | '6m' | '12m' | 'ytd' | 'custom'

export type CustomRange = {
  from: string | null
  to: string | null
}

export type SourceStats = {
  source: string
  count: number
  percentage: number
  conversionRate: number
  revenue: number
  trendDiff: number
}

export type RangeBounds = {
  currentStart: Date
  currentEnd: Date
  previousStart: Date
  previousEnd: Date
}

export const INSIGHTS_RANGE_OPTIONS: { value: InsightsRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '6m', label: 'Last 6 months' },
  { value: '12m', label: 'Last 12 months' },
  { value: 'ytd', label: 'Year to date' },
  { value: 'custom', label: 'Custom range…' },
]

export function getRangeTitleLabel(
  range: InsightsRange,
  customRange: CustomRange = { from: null, to: null },
): string {
  switch (range) {
    case '7d':
      return 'Last 7 Days'
    case '30d':
      return 'Last 30 Days'
    case '90d':
      return 'Last 90 Days'
    case '6m':
      return 'Last 6 Months'
    case '12m':
      return 'Last 12 Months'
    case 'ytd':
      return 'Year to Date'
    case 'custom':
      return 'Custom Range'
    default:
      return customRange.from && customRange.to ? 'Custom Range' : 'Custom Range'
  }
}

function endOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function subtractMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() - months)
  return d
}

function getPreviousBounds(currentStart: Date, currentEnd: Date): Pick<RangeBounds, 'previousStart' | 'previousEnd'> {
  const durationMs = currentEnd.getTime() - currentStart.getTime()
  const previousEnd = new Date(currentStart.getTime() - 1)
  const previousStart = new Date(previousEnd.getTime() - durationMs)
  return {
    previousStart: startOfDay(previousStart),
    previousEnd,
  }
}

export function getRangeBounds(
  range: InsightsRange,
  customRange: CustomRange = { from: null, to: null },
  reference: Date = new Date(),
): RangeBounds | null {
  const currentEnd = endOfDay(reference)
  let currentStart: Date

  switch (range) {
    case '7d':
      currentStart = startOfDay(new Date(currentEnd))
      currentStart.setDate(currentStart.getDate() - 7)
      break
    case '30d':
      currentStart = startOfDay(new Date(currentEnd))
      currentStart.setDate(currentStart.getDate() - 30)
      break
    case '90d':
      currentStart = startOfDay(new Date(currentEnd))
      currentStart.setDate(currentStart.getDate() - 90)
      break
    case '6m':
      currentStart = startOfDay(subtractMonths(currentEnd, 6))
      break
    case '12m':
      currentStart = startOfDay(subtractMonths(currentEnd, 12))
      break
    case 'ytd':
      currentStart = startOfDay(new Date(currentEnd.getFullYear(), 0, 1))
      break
    case 'custom': {
      if (!customRange.from || !customRange.to) return null
      currentStart = startOfDay(new Date(customRange.from))
      const customEnd = endOfDay(new Date(customRange.to))
      if (
        Number.isNaN(currentStart.getTime()) ||
        Number.isNaN(customEnd.getTime()) ||
        currentStart > customEnd
      ) {
        return null
      }
      const { previousStart, previousEnd } = getPreviousBounds(currentStart, customEnd)
      return { currentStart, currentEnd: customEnd, previousStart, previousEnd }
    }
    default:
      currentStart = startOfDay(new Date(currentEnd))
      currentStart.setDate(currentStart.getDate() - 30)
  }

  const { previousStart, previousEnd } = getPreviousBounds(currentStart, currentEnd)
  return { currentStart, currentEnd, previousStart, previousEnd }
}

export function filterBookingsByRange(
  bookings: MarketingBooking[],
  range: InsightsRange,
  customRange: CustomRange = { from: null, to: null },
  reference: Date = new Date(),
): MarketingBooking[] {
  const bounds = getRangeBounds(range, customRange, reference)
  if (!bounds) return []
  return filterByPeriod(bookings, bounds.currentStart, bounds.currentEnd)
}

function normalizeSource(howHeard: string): string {
  const trimmed = howHeard.trim()
  return trimmed || 'Unknown'
}

function getEffectiveStatus(booking: MarketingBooking): string {
  return (booking.effectiveStatus ?? booking.status).trim()
}

function isBooked(booking: MarketingBooking): boolean {
  return getEffectiveStatus(booking).toLowerCase() === 'booked'
}

function filterByPeriod(
  bookings: MarketingBooking[],
  start: Date,
  end: Date,
): MarketingBooking[] {
  return bookings.filter((booking) => {
    const created = parseSheetTimestamp(booking.date)
    if (!created) return false
    return created >= start && created <= end
  })
}

function countBySource(bookings: MarketingBooking[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const booking of bookings) {
    const source = normalizeSource(booking.how_heard)
    counts.set(source, (counts.get(source) ?? 0) + 1)
  }
  return counts
}

export function computeMarketingInsights(
  bookings: MarketingBooking[],
  range: InsightsRange = '30d',
  customRange: CustomRange = { from: null, to: null },
  reference: Date = new Date(),
): {
  sources: SourceStats[]
  totalLeads: number
  topSource: SourceStats | null
  rangeReady: boolean
} {
  const bounds = getRangeBounds(range, customRange, reference)
  if (!bounds) {
    return { sources: [], totalLeads: 0, topSource: null, rangeReady: false }
  }

  const { currentStart, currentEnd, previousStart, previousEnd } = bounds

  const currentBookings = filterByPeriod(bookings, currentStart, currentEnd)
  const previousBookings = filterByPeriod(bookings, previousStart, previousEnd)

  const currentCounts = countBySource(currentBookings)
  const previousCounts = countBySource(previousBookings)
  const totalLeads = currentBookings.length

  const knownSources = HEARD_OPTIONS as readonly string[]
  const allSources = new Set<string>([
    ...knownSources,
    ...currentCounts.keys(),
    ...previousCounts.keys(),
  ])

  const sources: SourceStats[] = []

  for (const source of allSources) {
    const currentForSource = currentBookings.filter(
      (b) => normalizeSource(b.how_heard) === source,
    )
    const count = currentForSource.length
    const previousCount = previousCounts.get(source) ?? 0
    const isKnownSource = knownSources.includes(source)
    if (count === 0 && previousCount === 0 && !isKnownSource) continue

    const bookedCount = currentForSource.filter(isBooked).length
    const revenue = currentForSource.reduce(
      (sum, b) => sum + parseTotal(b.total),
      0,
    )

    sources.push({
      source,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
      conversionRate:
        count > 0 ? Math.round((bookedCount / count) * 100) : 0,
      revenue,
      trendDiff: count - previousCount,
    })
  }

  sources.sort((a, b) => b.count - a.count || a.source.localeCompare(b.source))

  const topSource = sources.find((s) => s.count > 0) ?? null

  return {
    sources,
    totalLeads,
    topSource,
    rangeReady: true,
  }
}
