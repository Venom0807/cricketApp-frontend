import React from 'react';
import { getUser } from '../hooks/useAuth.js';

export default function UpcomingMatchCard({ match }) {
  const user = getUser();
  const inXI = match.playingXI?.some((p) => p._id === user?._id);
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="font-semibold">Upcoming Match</div>
      <div className="mt-2">Opponent: {match.opponentName}</div>
      <div>Venue: {match.venue}</div>
      <div>Date: {new Date(match.matchDate).toLocaleDateString()}</div>
      {/* <div className="mt-2">
        <div className="font-medium">Playing XI</div>
        {match.playingXI && match.playingXI.length > 0 ? (
          <ul className="list-disc ml-5">
            {match.playingXI.map((p) => (
              <li key={p._id || p}>{p.name || p}</li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-600">No squad selected yet</div>
        )}
      </div> */}
      {inXI && <div className="mt-3 inline-block px-3 py-1 rounded bg-green-100 text-green-700 text-sm">You are in Playing XI</div>}
    </div>
  );
}