import type { Lead, LeadFilters, SummaryStats } from '@/lib/admin/types'
import { parseTotal } from '@/lib/admin/parse-total'

function parseDate(value: string): Date | null {
  if (!value?.trim()) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfWeek(date: Date): Date {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export function filterLeads(leads: Lead[], filters: LeadFilters): Lead[] {
  const search = filters.search.trim().toLowerCase()
  const from = filters.dateFrom ? new Date(filters.dateFrom) : null
  const to = filters.dateTo ? new Date(filters.dateTo) : null
  if (to) to.setHours(23, 59, 59, 999)

  return leads.filter((lead) => {
    if (search) {
      const haystack = `${lead.name} ${lead.email}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }

    if (filters.status && lead.effectiveStatus !== filters.status) return false

    if (filters.service && !lead.service.toLowerCase().includes(filters.service.toLowerCase())) {
      return false
    }

    if (filters.artist && !lead.artist.toLowerCase().includes(filters.artist.toLowerCase())) {
      return false
    }

    if (from || to) {
      const created = parseDate(lead.date)
      if (!created) return false
      if (from && created < from) return false
      if (to && created > to) return false
    }

    return true
  })
}

export function computeSummaryStats(leads: Lead[]): SummaryStats {
  const today = new Date()
  const weekStart = startOfWeek(today)
  const weekEnd = endOfWeek(today)

  let newLeadsToday = 0
  let totalNewBookings = 0
  let leadsNeedingFollowUp = 0
  let bookedThisWeek = 0
  let revenuePotential = 0

  for (const lead of leads) {
    const created = parseDate(lead.date)
    if (created && isSameDay(created, today)) {
      newLeadsToday++
    }

    if (lead.effectiveStatus === 'New') {
      totalNewBookings++
    }

    if (
      lead.effectiveStatus === 'Contacted' ||
      lead.effectiveStatus === 'Waiting on Reply'
    ) {
      leadsNeedingFollowUp++
    }

    if (lead.effectiveStatus === 'Booked') {
      const appt = parseDate(lead.appointment_date)
      if (appt && appt >= weekStart && appt <= weekEnd) {
        bookedThisWeek++
      }
    }

    revenuePotential += parseTotal(lead.total)
  }

  return {
    newLeadsToday,
    totalNewBookings,
    leadsNeedingFollowUp,
    bookedThisWeek,
    revenuePotential,
  }
}

export function getUniqueServices(leads: Lead[]): string[] {
  const set = new Set<string>()
  for (const lead of leads) {
    if (lead.service) {
      const name = lead.service.split('—')[0]?.split(' - ')[0]?.trim() ?? lead.service
      set.add(name)
    }
  }
  return Array.from(set).sort()
}

export function getUniqueArtists(leads: Lead[]): string[] {
  const set = new Set<string>()
  for (const lead of leads) {
    if (lead.artist) {
      const name = lead.artist.split('—')[0]?.split(' - ')[0]?.trim() ?? lead.artist
      set.add(name)
    }
  }
  return Array.from(set).sort()
}
