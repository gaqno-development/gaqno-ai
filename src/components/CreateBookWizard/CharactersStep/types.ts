export interface ICharacter {
  id: string
  name: string
  description?: string
  role?: string
}

export interface ICharactersStepProps {
  characters: ICharacter[]
  onCharactersChange: (characters: ICharacter[]) => void
  bookContext?: {
    title?: string
    genre?: string
    description?: string
  }
}

export const CHARACTER_ROLES = [
  { value: 'protagonist', label: 'Protagonista' },
  { value: 'antagonist', label: 'Antagonista' },
  { value: 'supporting', label: 'Coadjuvante' },
  { value: 'minor', label: 'Secundário' },
]
