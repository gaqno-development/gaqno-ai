export interface IToneStyleStepProps {
  bookContext?: {
    title?: string
    genre?: string
    description?: string
  }
}

export const TONE_OPTIONS = [
  'leve',
  'sombrio',
  'épico',
  'intimista',
  'humorístico',
  'dramático',
  'misterioso',
  'romântico',
]

export const PACING_OPTIONS = [
  'rápido',
  'contemplativo',
  'equilibrado',
  'lento',
  'intenso',
  'meditativo',
]
