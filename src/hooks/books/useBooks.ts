import { useTenant, useAuth } from '@gaqno-development/frontcore/contexts'
import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookInput,
  IUpdateBookInput,
} from '@/types/books/books'

export const useBooks = () => {
  const { tenantId } = useTenant()
  const { user } = useAuth()
  const { queries, mutations } = useBookMutations()

  const { data: books, isLoading, refetch } = queries.getAll

  const createBook = async (input: ICreateBookInput) => {
    try {
      if (!user) throw new Error('User not authenticated')
      const result = await mutations.create.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create book' }
    }
  }

  const updateBook = async (id: string, input: IUpdateBookInput) => {
    try {
      if (!user) throw new Error('User not authenticated')
      const result = await mutations.update.mutateAsync({ id, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update book' }
    }
  }

  const deleteBook = async (bookId: string) => {
    try {
      if (!user) throw new Error('User not authenticated')
      await mutations.delete.mutateAsync(bookId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete book' }
    }
  }

  return {
    books: books || [],
    isLoading,
    refetch,
    createBook,
    updateBook,
    deleteBook,
    isCreating: mutations.create.isPending,
    isUpdating: mutations.update.isPending,
    isDeleting: mutations.delete.isPending,
  }
}

export const useBook = (bookId: string | null) => {
  const { user } = useAuth()
  const { queries } = useBookMutations()

  const { data: book, isLoading, refetch } = queries.getById(bookId || '')

  return {
    book: book || null,
    isLoading,
    refetch,
  }
}

