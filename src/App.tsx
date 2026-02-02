import { AppRouter } from "./app/config/routes/AppRouter";
import { QueryProvider } from "./app/providers/QueryProvider";

export default function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}
