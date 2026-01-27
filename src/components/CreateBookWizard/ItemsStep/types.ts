export interface IItem {
  id: string
  name: string
  function?: string
  origin?: string
  relevance?: string
}

export interface IItemsStepProps {
  items: IItem[]
  onItemsChange: (items: IItem[]) => void
  bookContext?: {
    title?: string
    genre?: string
    description?: string
  }
}
