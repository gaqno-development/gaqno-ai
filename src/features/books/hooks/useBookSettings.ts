import { useBookSettingsQueries } from '@/hooks/queries/useBookSettingsQueries'
import { useBookSettingsMutations } from '@/hooks/mutations/useBookSettingsMutations'
import {
  ICreateBookSettingInput,
  IUpdateBookSettingInput,
} from '../types/books'

export const useBookSettings = (bookId: string | null) => {
  const queries = useBookSettingsQueries()
  const mutations = useBookSettingsMutations()

  const { data: settings, isLoading, refetch } = queries.getByBookId(bookId || '')

  const createSetting = async (input: ICreateBookSettingInput) => {
    try {
      const result = await mutations.create.mutateAsync(input)
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create setting' }
    }
  }

  const updateSetting = async (settingId: string, input: IUpdateBookSettingInput) => {
    try {
      const result = await mutations.update.mutateAsync({ id: settingId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update setting' }
    }
  }

  const deleteSetting = async (settingId: string) => {
    try {
      await mutations.delete.mutateAsync(settingId)
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
    isCreating: mutations.create.isPending,
    isUpdating: mutations.update.isPending,
    isDeleting: mutations.delete.isPending,
  }
}
