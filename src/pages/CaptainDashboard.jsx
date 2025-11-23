import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getUser } from '../hooks/useAuth.js';
import MatchForm from '../components/MatchForm.jsx';
import MatchList from '../components/MatchList.jsx';
import api from '../api/axios.js';
import TeamPlayingXI from '../components/TeamPlayingXI.jsx';

export default function CaptainDashboard() {
  const user = getUser();
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadMembers = async () => {
    const res = await api.get('team/members');
    setMembers(res.data || []);
  };

  useEffect(() => { loadMembers(); }, []);

  const addMember = async (e) => {
    e.preventDefault();
    await api.post('team/members', { name, email, password });
    setName('');
    setEmail('');
    setPassword('');
    loadMembers();
  };

  const deleteMember = async (id) => {
    await api.delete(`team/members/${id}`);
    loadMembers();
  };

  return (
    <div>
      <Navbar />
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-xl font-semibold">Captain: {user?.name}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <MatchForm onCreated={() => {}} />
            <MatchList />
          </div>

          <div className="space-y-4">
            <TeamPlayingXI editable />
            <div className="bg-white shadow rounded-lg p-4">
              <div className="font-semibold mb-2">Team Members</div>
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m._id} className="flex justify-between items-center">
                    <div>
                      <div>{m.name}</div>
                      <div className="text-sm text-gray-600">{m.email}</div>
                    </div>
                    <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => deleteMember(m._id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={addMember} className="bg-white shadow rounded-lg p-4 space-y-3">
              <div className="font-semibold">Add Member</div>
              <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
