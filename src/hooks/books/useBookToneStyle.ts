import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookToneStyleInput,
  IUpdateBookToneStyleInput,
} from '@/types/books/books'

export const useBookToneStyle = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: toneStyle, isLoading, refetch } = queries.getToneStyleByBookId(bookId || '')

  const createToneStyle = async (input: ICreateBookToneStyleInput) => {
    try {
      const result = await mutations.createToneStyle.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create tone style' }
    }
  }

  const updateToneStyle = async (bookId: string, input: IUpdateBookToneStyleInput) => {
    try {
      const result = await mutations.updateToneStyle.mutateAsync({ bookId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update tone style' }
    }
  }

  return {
    toneStyle: toneStyle || null,
    isLoading,
    refetch,
    createToneStyle,
    updateToneStyle,
    isCreating: mutations.createToneStyle.isPending,
    isUpdating: mutations.updateToneStyle.isPending,
  }
}
