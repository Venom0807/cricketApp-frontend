import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { setAuth } from '../hooks/useAuth.js';

export default function RegisterCaptain() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register-captain', { name, email, password, teamName });
      setAuth(res.data.token, res.data.user);
      navigate('/captain');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container max-w-md mx-auto">
        <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="text-xl font-semibold text-center">Register Captain</div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <button disabled={loading} className="w-full px-4 py-2 rounded bg-blue-600 text-white">{loading ? 'Registering...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}