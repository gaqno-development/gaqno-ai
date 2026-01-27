import type { IBookBlueprint } from '@/types/books/books';

export interface BlueprintContentProps {
  bookId: string;
  blueprint: IBookBlueprint | null;
}
