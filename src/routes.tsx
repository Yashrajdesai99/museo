import { Route, Routes } from 'react-router-dom';
import EarthEvolutionPage from './pages/EarthEvolution';
import EntityDetailPage from './pages/EntityDetail';
import GalleryPage from './pages/Gallery';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/earth" element={<EarthEvolutionPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/:id" element={<EntityDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
