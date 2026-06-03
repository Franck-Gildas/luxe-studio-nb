import type { AdminBooking } from '@/lib/google-sheets'

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Waiting on Reply',
  'Booked',
  'No-Show',
  'Not Interested',
  'Completed',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const STATUS_PIPELINE: LeadStatus[] = [...LEAD_STATUSES]

export type Lead = AdminBooking & {
  effectiveStatus: LeadStatus
}

export type FollowUpNote = {
  text: string
  timestamp: string
}

export type LeadFilters = {
  search: string
  status: string
  service: string
  artist: string
  dateFrom: string
  dateTo: string
}

export const EMPTY_FILTERS: LeadFilters = {
  search: '',
  status: '',
  service: '',
  artist: '',
  dateFrom: '',
  dateTo: '',
}

export type SummaryStats = {
  newLeadsToday: number
  totalNewBookings: number
  leadsNeedingFollowUp: number
  bookedThisWeek: number
  revenuePotential: number
}

export type { AdminBooking }
