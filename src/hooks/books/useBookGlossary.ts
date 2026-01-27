import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookGlossaryInput,
  IUpdateBookGlossaryInput,
} from '@/types/books/books'

export const useBookGlossary = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: glossary, isLoading, refetch } = queries.getGlossary(bookId || '')

  const createGlossaryTerm = async (input: ICreateBookGlossaryInput) => {
    try {
      const result = await mutations.createGlossaryTerm.mutateAsync({
        bookId: input.book_id,
        data: {
          term: input.term,
          definition: input.definition,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create glossary term' }
    }
  }

  const updateGlossaryTerm = async (glossaryId: string, input: IUpdateBookGlossaryInput) => {
    try {
      const result = await mutations.updateGlossaryTerm.mutateAsync({
        glossaryId,
        data: input
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update glossary term' }
    }
  }

  const deleteGlossaryTerm = async (glossaryId: string) => {
    try {
      await mutations.deleteGlossaryTerm.mutateAsync(glossaryId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete glossary term' }
    }
  }

  return {
    glossary: glossary || [],
    isLoading,
    refetch,
    createGlossaryTerm,
    updateGlossaryTerm,
    deleteGlossaryTerm,
    isCreating: mutations.createGlossaryTerm.isPending,
    isUpdating: mutations.updateGlossaryTerm.isPending,
    isDeleting: mutations.deleteGlossaryTerm.isPending,
  }
}
