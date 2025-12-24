import { useBookToneStyleQueries } from '@/hooks/queries/useBookToneStyleQueries'
import { useBookToneStyleMutations } from '@/hooks/mutations/useBookToneStyleMutations'
import {
  ICreateBookToneStyleInput,
  IUpdateBookToneStyleInput,
} from '../types/books'

export const useBookToneStyle = (bookId: string | null) => {
  const queries = useBookToneStyleQueries()
  const mutations = useBookToneStyleMutations()

  const { data: toneStyle, isLoading, refetch } = queries.getByBookId(bookId || '')

  const createToneStyle = async (input: ICreateBookToneStyleInput) => {
    try {
      const result = await mutations.create.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create tone style' }
    }
  }

  const updateToneStyle = async (bookId: string, input: IUpdateBookToneStyleInput) => {
    try {
      const result = await mutations.update.mutateAsync({ bookId, data: input })
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
    isCreating: mutations.create.isPending,
    isUpdating: mutations.update.isPending,
  }
}
