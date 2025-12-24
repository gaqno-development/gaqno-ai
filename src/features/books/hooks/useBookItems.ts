import { useBookItemsQueries } from '@/hooks/queries/useBookItemsQueries'
import { useBookItemsMutations } from '@/hooks/mutations/useBookItemsMutations'
import {
  ICreateBookItemInput,
  IUpdateBookItemInput,
} from '../types/books'

export const useBookItems = (bookId: string | null) => {
  const queries = useBookItemsQueries()
  const mutations = useBookItemsMutations()

  const { data: items, isLoading, refetch } = queries.getByBookId(bookId || '')

  const createItem = async (input: ICreateBookItemInput) => {
    try {
      const result = await mutations.create.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create item' }
    }
  }

  const updateItem = async (itemId: string, input: IUpdateBookItemInput) => {
    try {
      const result = await mutations.update.mutateAsync({ id: itemId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update item' }
    }
  }

  const deleteItem = async (itemId: string) => {
    try {
      await mutations.delete.mutateAsync(itemId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete item' }
    }
  }

  return {
    items: items || [],
    isLoading,
    refetch,
    createItem,
    updateItem,
    deleteItem,
    isCreating: mutations.create.isPending,
    isUpdating: mutations.update.isPending,
    isDeleting: mutations.delete.isPending,
  }
}
