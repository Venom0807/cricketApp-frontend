import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import api from '../api/axios.js';
import UpcomingMatchCard from '../components/UpcomingMatchCard.jsx';
import TeamPlayingXI from '../components/TeamPlayingXI.jsx';

export default function PlayerDashboard() {
  const [upcoming, setUpcoming] = useState(null);
  const [all, setAll] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('matches/upcoming');
      setUpcoming(res.data);
    };
    load();
  }, []);

  const viewAll = async () => {
    const res = await api.get('matches/all');
    setAll(res.data || []);
    setShowAll(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container max-w-4xl mx-auto p-4 space-y-4">
        <TeamPlayingXI />
        {upcoming ? (
          <UpcomingMatchCard match={upcoming} />
        ) : (
          <div className="bg-white shadow rounded-lg p-4">No upcoming match</div>
        )}
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={viewAll}>View all matches</button>
        {showAll && (
          <div className="bg-white shadow rounded-lg p-4">
            <div className="font-semibold mb-2">All Matches</div>
            <div className="space-y-2">
              {all.map((m) => (
                <div key={m._id} className="flex justify-between">
                  <div>{new Date(m.matchDate).toLocaleDateString()}</div>
                  <div>{m.opponentName}</div>
                  <div className="text-gray-600">{m.venue}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
