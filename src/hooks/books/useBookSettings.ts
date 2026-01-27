import { useBookMutations } from '@/hooks/mutations/useBookMutations'
import {
  ICreateBookSettingInput,
  IUpdateBookSettingInput,
} from '@/types/books/books'

export const useBookSettings = (bookId: string | null) => {
  const { queries, mutations } = useBookMutations()

  const { data: settings, isLoading, refetch } = queries.getSettingsByBookId(bookId || '')

  const createSetting = async (input: ICreateBookSettingInput) => {
    try {
      const result = await mutations.createSetting.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create setting' }
    }
  }

  const updateSetting = async (settingId: string, input: IUpdateBookSettingInput) => {
    try {
      const result = await mutations.updateSetting.mutateAsync({ id: settingId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update setting' }
    }
  }

  const deleteSetting = async (settingId: string) => {
    try {
      await mutations.deleteSetting.mutateAsync(settingId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete setting' }
    }
  }

  return {
    settings: settings || [],
    isLoading,
    refetch,
    createSetting,
    updateSetting,
    deleteSetting,
    isCreating: mutations.createSetting.isPending,
    isUpdating: mutations.updateSetting.isPending,
    isDeleting: mutations.deleteSetting.isPending,
  }
}
