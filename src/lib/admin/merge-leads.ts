import type { AdminBooking } from '@/lib/google-sheets'
import type { Lead, LeadStatus } from '@/lib/admin/types'
import { LEAD_STATUSES } from '@/lib/admin/types'

function normalizeStatus(status: string): LeadStatus {
  const match = LEAD_STATUSES.find(
    (s) => s.toLowerCase() === status.trim().toLowerCase(),
  )
  return match ?? 'New'
}

function bookingToLead(
  booking: AdminBooking,
  statusOverrides: Record<number, LeadStatus>,
): Lead {
  return {
    ...booking,
    effectiveStatus:
      statusOverrides[booking.sheetRow] ?? normalizeStatus(booking.status),
  }
}

export function mergeBookingsToLeads(
  bookings: AdminBooking[],
  statusOverrides: Record<number, LeadStatus>,
): Lead[] {
  return bookings.map((booking) => bookingToLead(booking, statusOverrides))
}

export function mergeAllLeads(
  bookings: AdminBooking[],
  manualLeads: AdminBooking[],
  statusOverrides: Record<number, LeadStatus>,
): Lead[] {
  const allBookings = [...bookings, ...manualLeads]
  return allBookings.map((booking) => bookingToLead(booking, statusOverrides))
}

export function updateLeadStatus(
  leads: Lead[],
  sheetRow: number,
  status: LeadStatus,
): Lead[] {
  return leads.map((lead) =>
    lead.sheetRow === sheetRow ? { ...lead, effectiveStatus: status } : lead,
  )
}
