export type BookingService = {
  id: string
  nameEn: string
  nameFr: string
  price: number
  duration: string
}

export type BookingAddon = {
  id: string
  nameEn: string
  nameFr: string
  price: number
}

export type BookingArtist = {
  id: string
  name: string
  specialty: string
}

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'signature-hair',
    nameEn: 'Signature Hair Rituals',
    nameFr: 'Rituels de cheveux',
    price: 185,
    duration: '2H30',
  },
  {
    id: 'barbering',
    nameEn: 'Barbering Atelier',
    nameFr: "L'atelier du barbier",
    price: 95,
    duration: '1H15',
  },
  {
    id: 'nail-couture',
    nameEn: 'Nail Couture',
    nameFr: 'Couture des ongles',
    price: 110,
    duration: '1H30',
  },
  {
    id: 'lash-brow',
    nameEn: 'Lash & Brow Studio',
    nameFr: 'Cils & sourcils',
    price: 140,
    duration: '2H',
  },
  {
    id: 'esthetics',
    nameEn: 'Esthetics & Skin',
    nameFr: 'Esthétique & soins',
    price: 215,
    duration: '1H45',
  },
  {
    id: 'wellness',
    nameEn: 'Wellness & Body',
    nameFr: 'Bien-être & corps',
    price: 245,
    duration: '2H',
  },
]

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'scalp',
    nameEn: 'Scalp treatment',
    nameFr: 'Soin du cuir chevelu',
    price: 30,
  },
  {
    id: 'brow-tint',
    nameEn: 'Brow tint',
    nameFr: 'Teinture des sourcils',
    price: 20,
  },
  {
    id: 'aromatherapy',
    nameEn: 'Aromatherapy',
    nameFr: 'Aromathérapie',
    price: 15,
  },
  {
    id: 'elixir',
    nameEn: 'House Élixir treatment',
    nameFr: 'Soin Élixir maison',
    price: 45,
  },
  {
    id: 'consultation',
    nameEn: 'Extended consultation',
    nameFr: 'Consultation étendue',
    price: 25,
  },
]

export const BOOKING_ARTISTS: BookingArtist[] = [
  {
    id: 'emilie',
    name: 'Émilie D.',
    specialty: 'Hair & Colour Specialist',
  },
  {
    id: 'jean-luc',
    name: 'Jean-Luc A.',
    specialty: 'Master Barber',
  },
  {
    id: 'sophie',
    name: 'Sophie L.',
    specialty: 'Lash & Brow Artist',
  },
  {
    id: 'renee',
    name: 'Renée M.',
    specialty: 'Skin & Wellness Therapist',
  },
]

export const NO_PREFERENCE_ARTIST: BookingArtist = {
  id: 'none',
  name: 'No preference',
  specialty: 'Aucune préférence',
}

export const MORNING_SLOTS = ['10:00', '10:30', '11:00', '11:30'] as const

export const AFTERNOON_SLOTS = [
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
] as const

export const EVENING_SLOTS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
] as const

export const PRONOUN_OPTIONS = [
  'She/her',
  'He/him',
  'They/them',
  'Prefer not to say',
] as const

export const HEARD_OPTIONS = [
  'Instagram',
  'Facebook',
  'Google',
  'Friend referral',
  'Walk by',
  'Other',
] as const
