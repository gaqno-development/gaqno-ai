import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const BOOK_ID_PATTERN = /^\/ai\/books\/([^/]+)/;

export function useBookIdFromPath(): string | null {
  const { pathname } = useLocation();
  return useMemo(() => BOOK_ID_PATTERN.exec(pathname)?.[1] ?? null, [pathname]);
}
