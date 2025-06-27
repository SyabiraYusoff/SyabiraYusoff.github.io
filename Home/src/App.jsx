// src/App.jsx
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes';

export default function App() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith('/tool/');

  return (
    <div className="p-4">
      {!isToolPage && (
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Internal Tool Portal</h1>
        </header>
      )}
      <AppRoutes />
    </div>
  );
}