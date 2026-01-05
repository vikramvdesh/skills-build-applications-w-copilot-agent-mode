import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('https://8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://8000.app.github.dev/api/teams/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        setTeams([...teams, data]);
        setName('');
      })
      .catch(error => console.error('Error creating team:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="h1">Teams</h1>
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h2">Create New Team</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Team Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Team</button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="h2">All Teams</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;