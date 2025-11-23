import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { getUser } from '../hooks/useAuth.js';

export default function TeamPlayingXI({ editable = false }) {
  const MAX = 11;
  const user = getUser();
  const [members, setMembers] = useState([]);
  const [playingXI, setPlayingXI] = useState([]);
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    const xiRes = await api.get('team/playingxi');
    setPlayingXI(xiRes.data || []);
    setSelected((xiRes.data || []).map((p) => p._id));
    if (editable) {
      const memRes = await api.get('team/members');
      setMembers(memRes.data || []);
    }
  };

  useEffect(() => { load(); }, []);

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
    await api.put('team/playingxi', { playingXI: selected });
    setSaving(false);
    load();
  };

  const inXI = playingXI?.some((p) => p._id === user?._id);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Team Playing XI</div>
        {editable && <div className="text-sm text-gray-600">Selected: {selected.length}/{MAX}</div>}
      </div>
      {!editable && inXI && (
        <div className="mt-2 inline-block px-3 py-1 rounded bg-green-100 text-green-700 text-sm">You are in Playing XI</div>
      )}
      {editable ? (
        <div className="mt-3">
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
            <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={save} disabled={saving || selected.length !== MAX}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      ) : (
        <ul className="mt-3 list-disc ml-5">
          {playingXI?.map((p) => (
            <li key={p._id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
