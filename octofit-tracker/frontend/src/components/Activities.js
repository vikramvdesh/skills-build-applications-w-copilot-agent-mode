import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('https://8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://8000.app.github.dev/api/activities/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, duration: parseInt(duration), date }),
    })
      .then(response => response.json())
      .then(data => {
        setActivities([...activities, data]);
        setType('');
        setDuration('');
        setDate('');
      })
      .catch(error => console.error('Error adding activity:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="h1">Activities</h1>
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h2">Log New Activity</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Activity Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Activity</button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="h2">Your Activities</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;