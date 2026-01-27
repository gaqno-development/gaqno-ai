import { BookExportPage } from './BookExportPage';
import { useBookIdFromPath } from '@/hooks/books/useBookIdFromPath';

export function BookExportView() {
  const id = useBookIdFromPath();
  if (!id) return null;
  return <BookExportPage id={id} />;
}
