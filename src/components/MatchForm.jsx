import React, { useState } from 'react';
import api from '../api/axios.js';

export default function MatchForm({ onCreated, existing }) {
  const [opponentName, setOpponentName] = useState(existing?.opponentName || '');
  const [venue, setVenue] = useState(existing?.venue || '');
  const [matchDate, setMatchDate] = useState(existing?.matchDate ? existing.matchDate.slice(0, 10) : '');
  const [notes, setNotes] = useState(existing?.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (existing) {
        const res = await api.put(`/matches/${existing._id}`, { opponentName, venue, matchDate, notes });
        onCreated && onCreated(res.data);
      } else {
        const res = await api.post('/matches', { opponentName, venue, matchDate, notes });
        onCreated && onCreated(res.data);
        setOpponentName('');
        setVenue('');
        setMatchDate('');
        setNotes('');
      }
    } catch (err) {
      setError('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-4 space-y-3">
      <div className="font-semibold">{existing ? 'Edit Match' : 'Create Match'}</div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border rounded p-2" placeholder="Opponent Name" value={opponentName} onChange={(e) => setOpponentName(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
      <input className="w-full border rounded p-2" type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} />
      <textarea className="w-full border rounded p-2" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">{existing ? 'Update' : 'Create'}</button>
    </form>
  );
}