import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmptyState } from './components/empty-state';
import { RedirectPage } from './components/redirect-page';
import { Error404 } from './components/error-404';

export function App() {
  return (
    <main className="lg:max-w-342 lg:place-self-center h-dvh flex flex-col justify-center p-10">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmptyState />} />
          <Route path="/r/:short" element={<RedirectPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}