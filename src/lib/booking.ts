import {
  AFTERNOON_SLOTS,
  BOOKING_ADDONS,
  BOOKING_SERVICES,
  EVENING_SLOTS,
  MORNING_SLOTS,
  type BookingService,
} from '@/data/booking'

export type BookingDay = {
  date: Date
  key: string
  label: string
  closed: boolean
}

export type TimeSlotGroup = {
  id: 'morning' | 'afternoon' | 'evening'
  labelEn: string
  labelFr: string
  slots: readonly string[]
}

export function getFormspreeEndpoint(): string {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID
  if (!id) return ''
  return `https://formspree.io/f/${id}`
}

export function formatPrice(amount: number): string {
  return `$${amount}`
}

export function generateBookingDays(count = 14): BookingDay[] {
  const days: BookingDay[] = []
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  for (let i = 0; i < count; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const dayOfWeek = date.getDay()
    const closed = dayOfWeek === 0 || dayOfWeek === 1
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
    const dayNum = date.getDate()

    days.push({
      date,
      key: date.toISOString().slice(0, 10),
      label: `${weekday} ${dayNum}`,
      closed,
    })
  }

  return days
}

export function findFirstOpenDay(days: BookingDay[]): BookingDay | undefined {
  return days.find((d) => !d.closed)
}

export function isFriday(date: Date): boolean {
  return date.getDay() === 5
}

export function getAvailableTimeSlots(date: Date | null): TimeSlotGroup[] {
  const groups: TimeSlotGroup[] = [
    {
      id: 'morning',
      labelEn: 'Morning',
      labelFr: 'Matin',
      slots: MORNING_SLOTS,
    },
    {
      id: 'afternoon',
      labelEn: 'Afternoon',
      labelFr: 'Après-midi',
      slots: AFTERNOON_SLOTS,
    },
  ]

  if (date && isFriday(date)) {
    groups.push({
      id: 'evening',
      labelEn: 'Evening',
      labelFr: 'Soir',
      slots: EVENING_SLOTS,
    })
  }

  return groups
}

export function isEveningSlot(time: string): boolean {
  return EVENING_SLOTS.includes(time as (typeof EVENING_SLOTS)[number])
}

export function getAllSlotsForDate(date: Date | null): string[] {
  return getAvailableTimeSlots(date).flatMap((g) => [...g.slots])
}

export function computeBookingTotal(
  service: BookingService | undefined,
  addonIds: string[],
): number {
  if (!service) return 0
  const addonTotal = BOOKING_ADDONS.filter((a) => addonIds.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  )
  return service.price + addonTotal
}

export function getServiceById(id: string | null): BookingService | undefined {
  if (!id) return undefined
  return BOOKING_SERVICES.find((s) => s.id === id)
}

export function formatAppointmentDate(date: Date | null): string {
  if (!date) return '—'
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
