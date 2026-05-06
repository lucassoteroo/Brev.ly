import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmptyState } from './components/empty-state';
import { RedirectPage } from './components/redirect-page';
import { Error404 } from './components/error-404';

export function App() {
  return (
    <main className="lg:max-w-342 lg:place-self-center h-dvh flex flex-col justify-center p-10">
      <BrowserRouter>
        <Routes>
          {/* Rotas normais */}
          <Route path="/" element={<EmptyState />} />
          <Route path="/redirect" element={<RedirectPage />} />

          {/* O equivalente ao seu "if url == 'not-found'" */}
          <Route path="/not-found" element={<Error404 />} />

          {/* Captura QUALQUER coisa digitada que não exista acima */}
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </BrowserRouter>
    </main>

  )
}