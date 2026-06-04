/**
 * Service section 3D models.
 * Drop final GLB assets into public/models/ with these exact filenames.
 * Until then, FloatingObject falls back to FALLBACK_MODEL with per-section offsets.
 */
export const FALLBACK_MODEL = '/models/bottle.glb'

export type ServiceSectionId =
  | 'hair'
  | 'barber'
  | 'nail'
  | 'lash'
  | 'face'
  | 'spa'

export type ServiceModelSide = 'left' | 'right'

export type ServiceModelConfig = {
  sectionId: ServiceSectionId
  modelPath: string
  side: ServiceModelSide
  /** Distinct fallback pose when using bottle.glb */
  fallbackScale: number
  fallbackRotation: [number, number, number]
}

export const SERVICE_MODELS: ServiceModelConfig[] = [
  {
    sectionId: 'hair',
    modelPath: '/models/hair-shears.glb',
    side: 'left',
    fallbackScale: 2,
    fallbackRotation: [0, 0.4, 0],
  },
  {
    sectionId: 'barber',
    modelPath: '/models/straight-razor.glb',
    side: 'right',
    fallbackScale: 2.1,
    fallbackRotation: [0.2, -0.3, 0.1],
  },
  {
    sectionId: 'nail',
    modelPath: '/models/almond-nail.glb',
    side: 'left',
    fallbackScale: 1.9,
    fallbackRotation: [0.1, 0.5, 0],
  },
  {
    sectionId: 'lash',
    modelPath: '/models/lash-curve.glb',
    side: 'right',
    fallbackScale: 2,
    fallbackRotation: [0, -0.5, 0.15],
  },
  {
    sectionId: 'face',
    modelPath: '/models/serum-droplet.glb',
    side: 'left',
    fallbackScale: 2.2,
    fallbackRotation: [-0.1, 0.3, 0],
  },
  {
    sectionId: 'spa',
    modelPath: '/models/massage-stone.glb',
    side: 'right',
    fallbackScale: 1.8,
    fallbackRotation: [0.15, -0.4, -0.1],
  },
]

export function getServiceModelConfig(
  sectionId: ServiceSectionId
): ServiceModelConfig | undefined {
  return SERVICE_MODELS.find((m) => m.sectionId === sectionId)
}
