import { BookCoverPage } from './BookCoverPage';
import { useBookIdFromPath } from '@/hooks/books/useBookIdFromPath';

export function BookCoverView() {
  const id = useBookIdFromPath();
  if (!id) return null;
  return <BookCoverPage id={id} />;
}
