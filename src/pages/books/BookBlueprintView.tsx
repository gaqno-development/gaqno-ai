import { BookDetailPage } from './BookDetailPage';
import { useBookIdFromPath } from '@/hooks/books/useBookIdFromPath';

export function BookBlueprintView() {
  const id = useBookIdFromPath();
  if (!id) return null;
  return <BookDetailPage id={id} />;
}
