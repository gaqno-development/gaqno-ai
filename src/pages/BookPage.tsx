import { useLocation } from 'react-router-dom'
import { BooksListPage } from '@/pages/books/BooksListPage'
import { BookDetailPage } from '@/pages/books/BookDetailPage'
import { BookChaptersPage } from '@/pages/books/BookChaptersPage'
import { BookCoverPage } from '@/pages/books/BookCoverPage'
import { BookExportPage } from '@/pages/books/BookExportPage'

function match(pathname: string, pattern: RegExp): boolean {
  return pattern.test(pathname)
}

function parseBookId(pathname: string): string | null {
  const m = /^\/ai\/books\/([^/]+)/.exec(pathname)
  return m?.[1] ?? null
}

export default function BookPage() {
  const { pathname } = useLocation()

  const isList = match(pathname, /^\/ai\/books\/?$/)
  const isChapters = match(pathname, /^\/ai\/books\/[^/]+\/chapters\/?$/)
  const isCover = match(pathname, /^\/ai\/books\/[^/]+\/cover\/?$/)
  const isExport = match(pathname, /^\/ai\/books\/[^/]+\/export\/?$/)
  const isDetail = pathname.startsWith('/ai/books/') && !isChapters && !isCover && !isExport

  const id = parseBookId(pathname)

  if (isList) return <BooksListPage />
  if (isChapters && id) return <BookChaptersPage id={id} />
  if (isCover && id) return <BookCoverPage id={id} />
  if (isExport && id) return <BookExportPage id={id} />
  if (isDetail && id) return <BookDetailPage id={id} />

  return <BooksListPage />
}
