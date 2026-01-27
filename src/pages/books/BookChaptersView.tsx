import { BookChaptersPage } from './BookChaptersPage';
import { useBookIdFromPath } from '@/hooks/books/useBookIdFromPath';

export function BookChaptersView() {
  const id = useBookIdFromPath();
  if (!id) return null;
  return <BookChaptersPage id={id} />;
}
