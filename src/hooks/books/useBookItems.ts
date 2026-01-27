import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookItemInput,
  IUpdateBookItemInput,
} from '@/types/books/books'

export const useBookItems = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: items, isLoading, refetch } = queries.getItemsByBookId(bookId || '')

  const createItem = async (input: ICreateBookItemInput) => {
    try {
      const result = await mutations.createItem.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create item' }
    }
  }

  const updateItem = async (itemId: string, input: IUpdateBookItemInput) => {
    try {
      const result = await mutations.updateItem.mutateAsync({ id: itemId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update item' }
    }
  }

  const deleteItem = async (itemId: string) => {
    try {
      await mutations.deleteItem.mutateAsync(itemId)
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
    isCreating: mutations.createItem.isPending,
    isUpdating: mutations.updateItem.isPending,
    isDeleting: mutations.deleteItem.isPending,
  }
}
