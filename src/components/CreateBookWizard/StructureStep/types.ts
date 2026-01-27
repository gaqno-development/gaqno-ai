export interface IStructureStepStructure {
  plotSummary?: string
  initialChapters?: string
  mainConflict?: string
}

export interface IStructureStepProps {
  bookContext?: {
    title?: string
    genre?: string
    description?: string
  }
  onStructureChange?: (structure: IStructureStepStructure) => void
  structure?: IStructureStepStructure
}
