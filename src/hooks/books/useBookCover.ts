import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookCoverInput,
  IUpdateBookCoverInput,
} from '@/types/books/books'

export const useBookCovers = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: covers, isLoading, refetch } = queries.getCovers(bookId || '')

  const createCover = async (input: ICreateBookCoverInput) => {
    try {
      const result = await mutations.createCover.mutateAsync({
        bookId: input.book_id,
        data: {
          template_id: input.template_id,
          design_data: input.design_data,
          image_url: input.image_url,
          preview_3d_url: input.preview_3d_url,
          is_active: input.is_active,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create cover' }
    }
  }

  const updateCover = async (coverId: string, input: IUpdateBookCoverInput) => {
    try {
      const result = await mutations.updateCover.mutateAsync({
        coverId,
        data: {
          template_id: input.template_id,
          design_data: input.design_data,
          image_url: input.image_url,
          preview_3d_url: input.preview_3d_url,
          is_active: input.is_active,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update cover' }
    }
  }

  return {
    covers: covers || [],
    isLoading,
    refetch,
    createCover,
    updateCover,
    isCreating: mutations.createCover.isPending,
    isUpdating: mutations.updateCover.isPending,
  }
}

export const useBookActiveCover = (bookId: string | null) => {
  const { queries } = useBookMutations()
  const { data: cover, isLoading, refetch } = queries.getActiveCover(bookId || '')

  return {
    cover: cover || null,
    isLoading,
    refetch,
  }
}
