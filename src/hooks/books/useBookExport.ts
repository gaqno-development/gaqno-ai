import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookExportInput,
  IUpdateBookExportInput,
} from '@/types/books/books'

export const useBookExports = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: exports, isLoading, refetch } = queries.getExports(bookId || '')

  const createExport = async (input: ICreateBookExportInput) => {
    try {
      const result = await mutations.createExport.mutateAsync({
        bookId: input.book_id,
        data: {
          format: input.format,
          file_url: input.file_url,
          metadata: input.metadata,
          status: input.status,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create export' }
    }
  }

  const updateExport = async (exportId: string, input: IUpdateBookExportInput) => {
    try {
      const result = await mutations.updateExport.mutateAsync({
        exportId,
        data: {
          file_url: input.file_url,
          metadata: input.metadata,
          status: input.status,
          completed_at: input.completed_at,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update export' }
    }
  }

  return {
    exports: exports || [],
    isLoading,
    refetch,
    createExport,
    updateExport,
    isCreating: mutations.createExport.isPending,
    isUpdating: mutations.updateExport.isPending,
  }
}
