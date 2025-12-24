import { useEffect, useRef } from 'react'
import { useBookChaptersQueries } from '@/hooks/queries/useBookChaptersQueries'
import { useBookChaptersMutations } from '@/hooks/mutations/useBookChaptersMutations'
import {
  ICreateBookChapterInput,
  IUpdateBookChapterInput,
} from '../types/books'

export const useBookChapters = (bookId: string | null) => {
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const queries = useBookChaptersQueries()
  const mutations = useBookChaptersMutations()

  const { data: chapters, isLoading, refetch } = queries.getChapters(bookId || '')

  const createChapter = async (input: ICreateBookChapterInput) => {
    try {
      const result = await mutations.createChapter.mutateAsync({ bookId: input.book_id, data: {
        chapter_number: input.chapter_number,
        title: input.title,
        content: input.content,
        status: input.status,
        notes: input.notes,
        metadata: input.metadata,
      }})
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create chapter' }
    }
  }

  const updateChapter = async (chapterId: string, input: IUpdateBookChapterInput) => {
    try {
      const result = await mutations.updateChapter.mutateAsync({ chapterId, data: input })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update chapter' }
    }
  }

  const updateChapterAutoSave = (chapterId: string, input: IUpdateBookChapterInput) => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      updateChapter(chapterId, input)
    }, 3000)
  }

  const deleteChapter = async (chapterId: string) => {
    try {
      await mutations.deleteChapter.mutateAsync(chapterId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete chapter' }
    }
  }

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [])

  return {
    chapters: chapters || [],
    isLoading,
    refetch,
    createChapter,
    updateChapter,
    updateChapterAutoSave,
    deleteChapter,
    isCreating: mutations.createChapter.isPending,
    isUpdating: mutations.updateChapter.isPending,
    isDeleting: mutations.deleteChapter.isPending,
  }
}

export const useBookChapter = (chapterId: string | null) => {
  const queries = useBookChaptersQueries()
  const { data: chapter, isLoading, refetch } = queries.getChapterById(chapterId || '')

  return {
    chapter: chapter || null,
    isLoading,
    refetch,
  }
}
