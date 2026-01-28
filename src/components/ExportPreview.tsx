

import { Card, CardContent, CardHeader, CardTitle } from '@gaqno-development/frontcore/components/ui'
import { useBook } from '@/hooks/books/useBooks'
import { useBookActiveCover } from '@/hooks/books/useBookCover'
import { BookIcon } from '@gaqno-development/frontcore/components/icons';

interface IExportPreviewProps {
  bookId: string
}

export function ExportPreview({ bookId }: IExportPreviewProps) {
  const { book } = useBook(bookId)
  const { cover } = useBookActiveCover(bookId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview do Livro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
            {cover?.image_url ? (
              <img
                src={cover.image_url}
                alt={book?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <BookIcon className="h-16 w-16 text-muted-foreground" size={64} />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{book?.title}</h3>
            {book?.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {book.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

