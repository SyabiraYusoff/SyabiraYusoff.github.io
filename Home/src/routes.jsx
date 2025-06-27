// src/routes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import FormPage from './pages/FormPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tool/:toolId" element={<ToolPage />} />
      <Route path="/form/:formId" element={<FormPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
