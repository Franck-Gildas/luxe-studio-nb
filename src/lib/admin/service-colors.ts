import { BOOKING_SERVICES } from '@/data/booking'

export type ServiceColor = {
  id: string
  label: string
  bg: string
  border: string
  text: string
}

export const SERVICE_COLORS: ServiceColor[] = [
  {
    id: 'signature-hair',
    label: 'Signature Hair Rituals',
    bg: 'rgba(232, 201, 160, 0.22)',
    border: 'rgba(232, 201, 160, 0.55)',
    text: '#E8C9A0',
  },
  {
    id: 'barbering',
    label: 'Barbering Atelier',
    bg: 'rgba(184, 153, 104, 0.22)',
    border: 'rgba(184, 153, 104, 0.55)',
    text: '#B89968',
  },
  {
    id: 'nail-couture',
    label: 'Nail Couture',
    bg: 'rgba(212, 165, 160, 0.22)',
    border: 'rgba(212, 165, 160, 0.55)',
    text: '#D4A5A0',
  },
  {
    id: 'lash-brow',
    label: 'Lash & Brow Studio',
    bg: 'rgba(107, 140, 174, 0.22)',
    border: 'rgba(107, 140, 174, 0.55)',
    text: '#8BA4C4',
  },
  {
    id: 'esthetics',
    label: 'Esthetics & Skin',
    bg: 'rgba(122, 158, 126, 0.22)',
    border: 'rgba(122, 158, 126, 0.55)',
    text: '#7A9E7E',
  },
  {
    id: 'wellness',
    label: 'Wellness & Body',
    bg: 'rgba(154, 120, 180, 0.22)',
    border: 'rgba(154, 120, 180, 0.55)',
    text: '#B894D4',
  },
]

const DEFAULT_COLOR: ServiceColor = {
  id: 'default',
  label: 'Other',
  bg: 'rgba(244, 239, 232, 0.08)',
  border: 'rgba(244, 239, 232, 0.25)',
  text: '#F4EFE8',
}

const COLOR_BY_ID = Object.fromEntries(
  SERVICE_COLORS.map((c) => [c.id, c]),
) as Record<string, ServiceColor>

export function resolveServiceColorId(service: string): string {
  const lower = service.toLowerCase()
  for (const s of BOOKING_SERVICES) {
    if (lower.includes(s.nameEn.toLowerCase())) {
      return s.id
    }
  }
  if (lower.includes('hair')) return 'signature-hair'
  if (lower.includes('barber')) return 'barbering'
  if (lower.includes('nail')) return 'nail-couture'
  if (lower.includes('lash') || lower.includes('brow')) return 'lash-brow'
  if (lower.includes('esthetic') || lower.includes('skin')) return 'esthetics'
  if (lower.includes('wellness') || lower.includes('body')) return 'wellness'
  return 'default'
}

export function getServiceColor(service: string): ServiceColor {
  const id = resolveServiceColorId(service)
  return COLOR_BY_ID[id] ?? DEFAULT_COLOR
}

export function getServiceColorClass(service: string): string {
  const id = resolveServiceColorId(service)
  return id === 'default' ? 'admin-cal-appt--default' : `admin-cal-appt--${id}`
}
