import { CoverDesigner } from '@/components/CoverDesigner'
import { useBook } from '@/hooks/books/useBooks'
import { LoadingSkeleton } from '@gaqno-development/frontcore/components/ui'
import { EmptyState } from '@gaqno-development/frontcore/components/ui'
import { BookX } from 'lucide-react'

interface IBookCoverPageProps {
  id: string
}

export function BookCoverPage({ id }: IBookCoverPageProps) {
  const { book, isLoading } = useBook(id)

  if (isLoading) {
    return <LoadingSkeleton variant="card" count={1} />
  }

  if (!book) {
    return (
      <EmptyState
        icon={BookX}
        title="Livro não encontrado"
        description="O livro que você está procurando não existe ou foi removido."
      />
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-auto p-4">
        <CoverDesigner bookId={id} />
      </div>
    </div>
  )
}
