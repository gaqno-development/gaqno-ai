import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookBlueprintInput,
  IUpdateBookBlueprintInput,
} from '@/types/books/books'

export const useBookBlueprint = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: blueprint, isLoading, refetch } = queries.getBlueprint(bookId || '')

  const createBlueprint = async (input: ICreateBookBlueprintInput) => {
    try {
      const result = await mutations.createBlueprint.mutateAsync({
        bookId: input.book_id,
        data: {
          summary: input.summary,
          structure: input.structure,
          characters: input.characters,
          context: input.context,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create blueprint' }
    }
  }

  const updateBlueprint = async (bookId: string, input: IUpdateBookBlueprintInput) => {
    try {
      const result = await mutations.updateBlueprint.mutateAsync({ bookId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update blueprint' }
    }
  }

  return {
    blueprint: blueprint || null,
    isLoading,
    refetch,
    createBlueprint,
    updateBlueprint,
    isCreating: mutations.createBlueprint.isPending,
    isUpdating: mutations.updateBlueprint.isPending,
  }
}
