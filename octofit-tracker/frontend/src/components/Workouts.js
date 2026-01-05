import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('https://8000.app.github.dev/api/workouts/')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="h1">Workouts</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="h2">Suggested Workouts</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Suggested For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.suggested_for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;