import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import CaptainDashboard from './pages/CaptainDashboard.jsx';
import PlayerDashboard from './pages/PlayerDashboard.jsx';
import RegisterCaptain from './pages/RegisterCaptain.jsx';
import { getUser } from './hooks/useAuth.js';

function RequireAuth({ children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterCaptain />} />
      <Route path="/captain" element={<RequireAuth><CaptainDashboard /></RequireAuth>} />
      <Route path="/player" element={<RequireAuth><PlayerDashboard /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}