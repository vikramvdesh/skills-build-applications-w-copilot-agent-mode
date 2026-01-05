import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // TODO: Fetch leaderboard from API
    setLeaderboard([
      { id: 1, user: 'Alice', score: 100 },
      { id: 2, user: 'Bob', score: 90 },
      { id: 3, user: 'Charlie', score: 80 },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="h1">Leaderboard</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="h2">Top Performers</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.user}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;