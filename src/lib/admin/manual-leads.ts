import type { AdminBooking } from '@/lib/google-sheets'
import { formatSheetPhone } from '@/lib/google-sheets'
import { BOOKING_SERVICES } from '@/data/booking'
import { formatPrice } from '@/lib/booking'

const MANUAL_LEADS_KEY = 'luxe-admin-manual-leads'

/** Sheet rows from Google Sheets are small integers; manual leads use timestamps. */
const MANUAL_LEAD_SHEET_ROW_THRESHOLD = 1_000_000_000_000

export const LEAD_SOURCES = [
  'Instagram',
  'Walk-in',
  'Referral',
  'Phone',
  'Website',
  'Other',
] as const

export type LeadSource = (typeof LEAD_SOURCES)[number]

export type ManualLeadInput = {
  name: string
  phone: string
  email: string
  serviceId: string
  source: string
  notes: string
}

export function isManualLead(sheetRow: number): boolean {
  return sheetRow >= MANUAL_LEAD_SHEET_ROW_THRESHOLD
}

export function getManualLeads(): AdminBooking[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(MANUAL_LEADS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is AdminBooking =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as AdminBooking).sheetRow === 'number' &&
        typeof (item as AdminBooking).name === 'string',
    )
  } catch {
    return []
  }
}

export function addManualLead(booking: AdminBooking): void {
  const leads = getManualLeads()
  leads.push(booking)
  localStorage.setItem(MANUAL_LEADS_KEY, JSON.stringify(leads))
}

export function createManualLead(input: ManualLeadInput): AdminBooking {
  const service = BOOKING_SERVICES.find((s) => s.id === input.serviceId)
  const serviceLabel = service
    ? `${service.nameEn} — ${formatPrice(service.price)}`
    : ''
  const total = service ? formatPrice(service.price) : ''

  return {
    sheetRow: Date.now(),
    date: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: formatSheetPhone(input.phone.trim()) || 'Not provided',
    service: serviceLabel,
    addons: 'None',
    total,
    artist: '',
    appointment_date: '',
    appointment_time: '',
    first_visit: '',
    how_heard: input.source.trim(),
    notes: input.notes.trim() || 'None',
    status: 'New',
    pronouns: '—',
  }
}
