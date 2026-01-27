import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant, useAuth } from '@gaqno-development/frontcore/contexts';
import { coreAxiosClient } from '@gaqno-development/frontcore/utils/api';
import { transformers } from '@/lib/api-transformers';
import type {
  IBook,
  IBookBlueprint,
  IBookCover,
  IBookHistory,
  IBookCharacter,
  IBookGlossary,
  IBookExport,
  IBookChapter,
  IBookItem,
  IBookSetting,
  IBookToneStyle,
  ICreateBookInput,
  IUpdateBookInput,
  ICreateBookBlueprintInput,
  IUpdateBookBlueprintInput,
  ICreateBookCoverInput,
  IUpdateBookCoverInput,
  ICreateBookHistoryInput,
  ICreateBookCharacterInput,
  IUpdateBookCharacterInput,
  ICreateBookGlossaryInput,
  IUpdateBookGlossaryInput,
  ICreateBookExportInput,
  IUpdateBookExportInput,
  ICreateBookChapterInput,
  IUpdateBookChapterInput,
  ICreateBookItemInput,
  IUpdateBookItemInput,
  ICreateBookSettingInput,
  IUpdateBookSettingInput,
  ICreateBookToneStyleInput,
  IUpdateBookToneStyleInput,
} from '@/types/books/books';

const aiClient = coreAxiosClient.ai;

const transformBookItem = (item: any): IBookItem => ({
  id: item.id,
  book_id: item.bookId,
  name: item.name,
  function: item.function,
  origin: item.origin,
  relevance: item.relevance,
  metadata: item.metadata,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
});

const transformBookSetting = (item: any): IBookSetting => ({
  id: item.id,
  book_id: item.bookId,
  name: item.name,
  description: item.description,
  timeline_summary: item.timelineSummary,
  metadata: item.metadata,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
});

const transformBookToneStyle = (item: any): IBookToneStyle => ({
  id: item.id,
  book_id: item.bookId,
  narrative_tone: item.narrativeTone,
  pacing: item.pacing,
  target_audience: item.targetAudience,
  central_themes: item.centralThemes,
  metadata: item.metadata,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
});

export const useBookMutations = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const { user } = useAuth();

  const queries = {
    getAll: useQuery<IBook[]>({
      queryKey: ['books', tenantId ?? 'no-tenant', user?.id ?? 'no-user'],
      queryFn: async () => {
        if (!user) throw new Error('User not authenticated');
        const response = await aiClient.get<any[]>('/books', { params: tenantId ? { tenantId } : undefined });
        return transformers.books(response.data);
      },
      enabled: !!user,
    }),

    getById: (id: string) => useQuery<IBook>({
      queryKey: ['book', id],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/books/${id}`);
        return transformers.book(response.data);
      },
      enabled: !!id,
    }),

    getBlueprint: (bookId: string) => useQuery<IBookBlueprint | null>({
      queryKey: ['book-blueprint', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/books/${bookId}/blueprint`);
        return response.data ? transformers.blueprint(response.data) : null;
      },
      enabled: !!bookId,
    }),

    getCovers: (bookId: string) => useQuery<IBookCover[]>({
      queryKey: ['book-covers', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/covers`);
        return transformers.covers(response.data);
      },
      enabled: !!bookId,
    }),

    getActiveCover: (bookId: string) => useQuery<IBookCover | null>({
      queryKey: ['book-cover-active', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/books/${bookId}/covers/active`);
        return response.data ? transformers.cover(response.data) : null;
      },
      enabled: !!bookId,
    }),

    getHistory: (bookId: string) => useQuery<IBookHistory[]>({
      queryKey: ['book-history', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/history`);
        return transformers.historyList(response.data);
      },
      enabled: !!bookId,
    }),

    getCharacters: (bookId: string) => useQuery<IBookCharacter[]>({
      queryKey: ['book-characters', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/characters`);
        return transformers.characters(response.data);
      },
      enabled: !!bookId,
    }),

    getGlossary: (bookId: string) => useQuery<IBookGlossary[]>({
      queryKey: ['book-glossary', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/glossary`);
        return transformers.glossaryList(response.data);
      },
      enabled: !!bookId,
    }),

    getExports: (bookId: string) => useQuery<IBookExport[]>({
      queryKey: ['book-exports', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/exports`);
        return transformers.exports(response.data);
      },
      enabled: !!bookId,
    }),

    getChapters: (bookId: string) => useQuery<IBookChapter[]>({
      queryKey: ['book-chapters', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/books/${bookId}/chapters`);
        return transformers.chapters(response.data);
      },
      enabled: !!bookId,
    }),

    getChapterById: (chapterId: string) => useQuery<IBookChapter>({
      queryKey: ['book-chapter', chapterId],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/books/chapters/${chapterId}`);
        return transformers.chapter(response.data);
      },
      enabled: !!chapterId,
    }),

    getItemsByBookId: (bookId: string) => useQuery<IBookItem[]>({
      queryKey: ['book-items', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/book-items/book/${bookId}`);
        return response.data.map(transformBookItem);
      },
      enabled: !!bookId,
    }),

    getItemById: (id: string) => useQuery<IBookItem>({
      queryKey: ['book-item', id],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/book-items/${id}`);
        return transformBookItem(response.data);
      },
      enabled: !!id,
    }),

    getSettingsByBookId: (bookId: string) => useQuery<IBookSetting[]>({
      queryKey: ['book-settings', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any[]>(`/book-settings/book/${bookId}`);
        return response.data.map(transformBookSetting);
      },
      enabled: !!bookId,
    }),

    getSettingById: (id: string) => useQuery<IBookSetting>({
      queryKey: ['book-setting', id],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/book-settings/${id}`);
        return transformBookSetting(response.data);
      },
      enabled: !!id,
    }),

    getToneStyleByBookId: (bookId: string) => useQuery<IBookToneStyle | null>({
      queryKey: ['book-tone-style', bookId],
      queryFn: async () => {
        const response = await aiClient.get<any>(`/book-tone-style/book/${bookId}`);
        return response.data ? transformBookToneStyle(response.data) : null;
      },
      enabled: !!bookId,
    }),
  };

  const mutations = {
    create: useMutation<IBook, Error, ICreateBookInput>({
      mutationFn: async (data) => {
        const response = await aiClient.post<any>('/books', data);
        return transformers.book(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] });
      },
    }),

    update: useMutation<IBook, Error, { id: string; data: IUpdateBookInput }>({
      mutationFn: async ({ id, data }) => {
        const response = await aiClient.patch<any>(`/books/${id}`, data);
        return transformers.book(response.data);
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['books'] });
        queryClient.invalidateQueries({ queryKey: ['book', variables.id] });
      },
    }),

    delete: useMutation<void, Error, string>({
      mutationFn: async (id) => {
        await aiClient.delete(`/books/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] });
      },
    }),

    createBlueprint: useMutation<IBookBlueprint, Error, { bookId: string; data: ICreateBookBlueprintInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/blueprint`, data);
        return transformers.blueprint(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-blueprint', variables.bookId] });
      },
    }),

    updateBlueprint: useMutation<IBookBlueprint, Error, { bookId: string; data: IUpdateBookBlueprintInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.patch<any>(`/books/${bookId}/blueprint`, data);
        return transformers.blueprint(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-blueprint', variables.bookId] });
      },
    }),

    createCover: useMutation<IBookCover, Error, { bookId: string; data: ICreateBookCoverInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/covers`, data);
        return transformers.cover(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-covers', variables.bookId] });
        queryClient.invalidateQueries({ queryKey: ['book-cover-active', variables.bookId] });
      },
    }),

    updateCover: useMutation<IBookCover, Error, { coverId: string; data: IUpdateBookCoverInput }>({
      mutationFn: async ({ coverId, data }) => {
        const response = await aiClient.patch<any>(`/books/covers/${coverId}`, data);
        return transformers.cover(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-covers'] });
        queryClient.invalidateQueries({ queryKey: ['book-cover-active'] });
      },
    }),

    createHistory: useMutation<IBookHistory, Error, { bookId: string; data: ICreateBookHistoryInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/history`, data);
        return transformers.history(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-history', variables.bookId] });
      },
    }),

    createCharacter: useMutation<IBookCharacter, Error, { bookId: string; data: ICreateBookCharacterInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/characters`, data);
        return transformers.character(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-characters', variables.bookId] });
      },
    }),

    updateCharacter: useMutation<IBookCharacter, Error, { characterId: string; data: IUpdateBookCharacterInput }>({
      mutationFn: async ({ characterId, data }) => {
        const response = await aiClient.patch<any>(`/books/characters/${characterId}`, data);
        return transformers.character(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-characters'] });
      },
    }),

    deleteCharacter: useMutation<void, Error, string>({
      mutationFn: async (characterId) => {
        await aiClient.delete(`/books/characters/${characterId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-characters'] });
      },
    }),

    createGlossaryTerm: useMutation<IBookGlossary, Error, { bookId: string; data: ICreateBookGlossaryInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/glossary`, data);
        return transformers.glossary(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-glossary', variables.bookId] });
      },
    }),

    updateGlossaryTerm: useMutation<IBookGlossary, Error, { glossaryId: string; data: IUpdateBookGlossaryInput }>({
      mutationFn: async ({ glossaryId, data }) => {
        const response = await aiClient.patch<any>(`/books/glossary/${glossaryId}`, data);
        return transformers.glossary(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-glossary'] });
      },
    }),

    deleteGlossaryTerm: useMutation<void, Error, string>({
      mutationFn: async (glossaryId) => {
        await aiClient.delete(`/books/glossary/${glossaryId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-glossary'] });
      },
    }),

    createExport: useMutation<IBookExport, Error, { bookId: string; data: ICreateBookExportInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/exports`, data);
        return transformers.export(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-exports', variables.bookId] });
      },
    }),

    updateExport: useMutation<IBookExport, Error, { exportId: string; data: IUpdateBookExportInput }>({
      mutationFn: async ({ exportId, data }) => {
        const response = await aiClient.patch<any>(`/books/exports/${exportId}`, data);
        return transformers.export(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-exports'] });
      },
    }),

    createChapter: useMutation<IBookChapter, Error, { bookId: string; data: ICreateBookChapterInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.post<any>(`/books/${bookId}/chapters`, data);
        return transformers.chapter(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-chapters', variables.bookId] });
      },
    }),

    updateChapter: useMutation<IBookChapter, Error, { chapterId: string; data: IUpdateBookChapterInput }>({
      mutationFn: async ({ chapterId, data }) => {
        const response = await aiClient.patch<any>(`/books/chapters/${chapterId}`, data);
        return transformers.chapter(response.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-chapters'] });
        queryClient.invalidateQueries({ queryKey: ['book-chapter'] });
      },
    }),

    deleteChapter: useMutation<void, Error, string>({
      mutationFn: async (chapterId) => {
        await aiClient.delete(`/books/chapters/${chapterId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-chapters'] });
        queryClient.invalidateQueries({ queryKey: ['book-chapter'] });
      },
    }),

    createItem: useMutation<IBookItem, Error, ICreateBookItemInput>({
      mutationFn: async (data) => {
        const response = await aiClient.post<any>('/book-items', data);
        return transformBookItem(response.data);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['book-items', data.book_id] });
      },
    }),

    updateItem: useMutation<IBookItem, Error, { id: string; data: IUpdateBookItemInput }>({
      mutationFn: async ({ id, data }) => {
        const response = await aiClient.patch<any>(`/book-items/${id}`, data);
        return transformBookItem(response.data);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['book-items', data.book_id] });
        queryClient.invalidateQueries({ queryKey: ['book-item', data.id] });
      },
    }),

    deleteItem: useMutation<void, Error, string>({
      mutationFn: async (id) => {
        await aiClient.delete(`/book-items/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-items'] });
        queryClient.invalidateQueries({ queryKey: ['book-item'] });
      },
    }),

    createSetting: useMutation<IBookSetting, Error, ICreateBookSettingInput>({
      mutationFn: async (data) => {
        const response = await aiClient.post<any>('/book-settings', data);
        return transformBookSetting(response.data);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['book-settings', data.book_id] });
      },
    }),

    updateSetting: useMutation<IBookSetting, Error, { id: string; data: IUpdateBookSettingInput }>({
      mutationFn: async ({ id, data }) => {
        const response = await aiClient.patch<any>(`/book-settings/${id}`, data);
        return transformBookSetting(response.data);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['book-settings', data.book_id] });
        queryClient.invalidateQueries({ queryKey: ['book-setting', data.id] });
      },
    }),

    deleteSetting: useMutation<void, Error, string>({
      mutationFn: async (id) => {
        await aiClient.delete(`/book-settings/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['book-settings'] });
        queryClient.invalidateQueries({ queryKey: ['book-setting'] });
      },
    }),

    createToneStyle: useMutation<IBookToneStyle, Error, ICreateBookToneStyleInput>({
      mutationFn: async (data) => {
        const response = await aiClient.post<any>('/book-tone-style', data);
        return transformBookToneStyle(response.data);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['book-tone-style', data.book_id] });
      },
    }),

    updateToneStyle: useMutation<IBookToneStyle, Error, { bookId: string; data: IUpdateBookToneStyleInput }>({
      mutationFn: async ({ bookId, data }) => {
        const response = await aiClient.patch<any>(`/book-tone-style/book/${bookId}`, data);
        return transformBookToneStyle(response.data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['book-tone-style', variables.bookId] });
      },
    }),
  };

  return {
    queries,
    mutations,
  };
};
