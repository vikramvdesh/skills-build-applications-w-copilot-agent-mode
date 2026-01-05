import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}users/`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, team }),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setName('');
        setEmail('');
        setTeam('');
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="h1">Users</h1>
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h2">Add New User</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="team" className="form-label">Team</label>
              <input
                type="text"
                className="form-control"
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="h2">All Users</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;