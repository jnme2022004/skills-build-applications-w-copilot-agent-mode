import React, { useEffect, useState } from 'react';

const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const items = data.results || data;
        setLeaderboard(items);
        setError(null);
        console.log('Fetched leaderboard:', items);
      })
      .catch(err => {
        setError(err.message);
        setLeaderboard([]);
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Leaderboard</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((l, i) => (
              <tr key={i}>
                <td>{l.rank}</td>
                <td>{l.user}</td>
                <td>{l.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
