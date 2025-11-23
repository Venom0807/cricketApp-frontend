import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../hooks/useAuth.js';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const onLogout = () => {
    clearAuth();
    navigate('/login');
  };
  return (
    <div className="bg-white shadow">
      <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="font-semibold">Cricket App</div>
        <div className="flex items-center gap-3">
          {user && <div className="text-sm text-gray-600">{user.name} ({user.role})</div>}
          <button onClick={onLogout} className="px-4 py-2 rounded bg-red-600 text-white">Logout</button>
        </div>
      </div>
    </div>
  );
}