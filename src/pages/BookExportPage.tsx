import { useParams } from 'react-router-dom'
import { ExportOptions } from '@/features/books/components/ExportOptions'
import { ExportPreview } from '@/features/books/components/ExportPreview'
import { useBook } from '@/features/books/hooks/useBooks'
import { Loader2 } from 'lucide-react'

export default function BookExportPage() {
  const { id } = useParams<{ id: string }>()
  const { book, isLoading } = useBook(id || '')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-8">
        <p>Livro não encontrado</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <ExportOptions bookId={id || ''} />
          </div>
          <div className="col-span-4">
            <ExportPreview bookId={id || ''} />
          </div>
        </div>
      </div>
    </div>
  )
}

