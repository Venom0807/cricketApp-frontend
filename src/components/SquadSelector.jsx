import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';

export default function SquadSelector({ match, onClose }) {
  const MAX = 11;
  const initial = Array.isArray(match.playingXI)
    ? match.playingXI.map((p) => (typeof p === 'string' ? p : p._id))
    : [];
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await api.get('team/members');
      setMembers(res.data || []);
    };
    load();
  }, []);

  const toggle = (id) => {
    setError('');
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) {
        setError(`You can select only ${MAX} players`);
        return prev;
      }
      return [...prev, id];
    });
  };

  const save = async () => {
    if (selected.length !== MAX) {
      setError(`Select exactly ${MAX} players`);
      return;
    }
    setSaving(true);
    await api.put(`matches/${match._id}/squad`, { playingXI: selected });
    setSaving(false);
    onClose && onClose();
  };

  return (
    <div>
      <div className="font-semibold mb-1">Set Playing XI</div>
      <div className="text-sm text-gray-600 mb-2">Selected: {selected.length}/{MAX}</div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="space-y-2 max-h-64 overflow-auto">
        {members.map((m) => {
          const checked = selected.includes(m._id);
          const disabled = !checked && selected.length >= MAX;
          return (
            <label key={m._id} className={`flex items-center gap-2 ${disabled ? 'opacity-50' : ''}`}>
              <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(m._id)} />
              <span>{m.name} <span className="text-gray-500 text-sm">{m.email}</span></span>
            </label>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Close</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={save} disabled={saving || selected.length !== MAX}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
