import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';
import MatchForm from './MatchForm.jsx';

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('matches/all');
      setMatches(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    await api.delete(`matches/${id}`);
    load();
  };

  return (
    <div className="space-y-4">
      {editing ? (
        <MatchForm existing={editing} onCreated={() => { setEditing(null); load(); }} />
      ) : null}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="space-y-3">
          {matches.map((m) => (
            <div key={m._id} className="bg-white shadow rounded-lg p-4">
              <div className="font-semibold">{m.opponentName}</div>
              <div className="text-sm text-gray-600">{m.venue} • {new Date(m.matchDate).toLocaleDateString()}</div>
              
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={() => setEditing(m)}>Edit</button>
                <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => onDelete(m._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
