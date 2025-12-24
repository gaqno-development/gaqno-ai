import { AuthProvider, QueryProvider, TenantProvider, ThemeProvider } from "@gaqno-dev/frontcore";
import BooksPage from "./pages/BooksPage";

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <BooksPage />
      </TenantProvider>
    </AuthProvider>
  );
}
