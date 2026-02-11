import React, { useEffect, useState } from 'react';

const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;


function Workouts() {
  const [workouts, setWorkouts] = useState([]);
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
        setWorkouts(items);
        setError(null);
        console.log('Fetched workouts:', items);
      })
      .catch(err => {
        setError(err.message);
        setWorkouts([]);
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={i}>
                <td>{w.name}</td>
                <td>{w.difficulty}</td>
                <td>{w.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
