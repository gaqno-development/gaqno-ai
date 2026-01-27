export interface ISetting {
  id: string
  name: string
  description: string
  timeline_summary?: string
}

export interface IWorldSettingsStepProps {
  settings: ISetting[]
  onSettingsChange: (settings: ISetting[]) => void
  bookContext?: {
    title?: string
    genre?: string
    description?: string
  }
}
