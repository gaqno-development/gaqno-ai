import { IBook, IBookChapter, IBookCharacter, IBookCover, IBookExport, IBookGlossary, IBookBlueprint, IBookHistory } from '@/features/books/types/books'

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function transformKeys<T extends Record<string, any>>(obj: T, keyMap: Record<string, string>): any {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(item => transformKeys(item, keyMap))
  
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = keyMap[key] || key
    result[newKey] = typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)
      ? transformKeys(value, keyMap)
      : value
  }
  return result
}

const bookKeyMap: Record<string, string> = {
  id: 'id',
  tenantId: 'tenant_id',
  userId: 'user_id',
  title: 'title',
  genre: 'genre',
  description: 'description',
  style: 'style',
  status: 'status',
  coverImageUrl: 'cover_image_url',
  metadata: 'metadata',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const chapterKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  chapterNumber: 'chapter_number',
  title: 'title',
  content: 'content',
  status: 'status',
  notes: 'notes',
  metadata: 'metadata',
  wordCount: 'word_count',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const characterKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  name: 'name',
  description: 'description',
  avatarUrl: 'avatar_url',
  metadata: 'metadata',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const coverKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  templateId: 'template_id',
  designData: 'design_data',
  imageUrl: 'image_url',
  preview3dUrl: 'preview_3d_url',
  isActive: 'is_active',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const exportKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  format: 'format',
  fileUrl: 'file_url',
  metadata: 'metadata',
  status: 'status',
  createdAt: 'created_at',
  completedAt: 'completed_at',
}

const glossaryKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  term: 'term',
  definition: 'definition',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const blueprintKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  summary: 'summary',
  structure: 'structure',
  characters: 'characters',
  context: 'context',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

const historyKeyMap: Record<string, string> = {
  id: 'id',
  bookId: 'book_id',
  userId: 'user_id',
  action: 'action',
  changeSummary: 'change_summary',
  metadata: 'metadata',
  createdAt: 'created_at',
}

export const transformers = {
  book: (data: any): IBook => transformKeys(data, bookKeyMap) as IBook,
  books: (data: any[]): IBook[] => data.map(item => transformers.book(item)),
  chapter: (data: any): IBookChapter => transformKeys(data, chapterKeyMap) as IBookChapter,
  chapters: (data: any[]): IBookChapter[] => data.map(item => transformers.chapter(item)),
  character: (data: any): IBookCharacter => transformKeys(data, characterKeyMap) as IBookCharacter,
  characters: (data: any[]): IBookCharacter[] => data.map(item => transformers.character(item)),
  cover: (data: any): IBookCover => transformKeys(data, coverKeyMap) as IBookCover,
  covers: (data: any[]): IBookCover[] => data.map(item => transformers.cover(item)),
  export: (data: any): IBookExport => transformKeys(data, exportKeyMap) as IBookExport,
  exports: (data: any[]): IBookExport[] => data.map(item => transformers.export(item)),
  glossary: (data: any): IBookGlossary => transformKeys(data, glossaryKeyMap) as IBookGlossary,
  glossaryList: (data: any[]): IBookGlossary[] => data.map(item => transformers.glossary(item)),
  blueprint: (data: any): IBookBlueprint => transformKeys(data, blueprintKeyMap) as IBookBlueprint,
  history: (data: any): IBookHistory => transformKeys(data, historyKeyMap) as IBookHistory,
  historyList: (data: any[]): IBookHistory[] => data.map(item => transformers.history(item)),
}

