import React, { useEffect, useState } from 'react';

const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


function Activities() {
  const [activities, setActivities] = useState([]);
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
        setActivities(items);
        setError(null);
        console.log('Fetched activities:', items);
      })
      .catch(err => {
        setError(err.message);
        setActivities([]);
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Activities</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Workout</th>
              <th>Date</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={i}>
                <td>{a.user}</td>
                <td>{a.workout}</td>
                <td>{a.date}</td>
                <td>{a.duration_minutes}</td>
                <td>{a.calories_burned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
