import { useBooksQueries } from '@/hooks/queries/useBooksQueries'
import { useBooksMutations } from '@/hooks/mutations/useBooksMutations'
import {
  ICreateBookCharacterInput,
  IUpdateBookCharacterInput,
} from '../types/books'

export const useBookCharacters = (bookId: string | null) => {
  const queries = useBooksQueries()
  const mutations = useBooksMutations()

  const { data: characters, isLoading, refetch } = queries.getCharacters(bookId || '')

  const createCharacter = async (input: ICreateBookCharacterInput) => {
    try {
      const result = await mutations.createCharacter.mutateAsync({
        bookId: input.book_id,
        data: {
          name: input.name,
          description: input.description,
          avatar_url: input.avatar_url,
          metadata: input.metadata,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create character' }
    }
  }

  const updateCharacter = async (characterId: string, input: IUpdateBookCharacterInput) => {
    try {
      const result = await mutations.updateCharacter.mutateAsync({
        characterId,
        data: {
          name: input.name,
          description: input.description,
          avatar_url: input.avatar_url,
          metadata: input.metadata,
        }
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update character' }
    }
  }

  const deleteCharacter = async (characterId: string) => {
    try {
      await mutations.deleteCharacter.mutateAsync(characterId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete character' }
    }
  }

  return {
    characters: characters || [],
    isLoading,
    refetch,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    isCreating: mutations.createCharacter.isPending,
    isUpdating: mutations.updateCharacter.isPending,
    isDeleting: mutations.deleteCharacter.isPending,
  }
}
