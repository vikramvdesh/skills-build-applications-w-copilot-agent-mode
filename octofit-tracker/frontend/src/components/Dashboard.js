import React from 'react';
import logo from '../logo.png';

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center mb-4">
        <div className="col-md-2">
          <img src={logo} alt="OctoFit Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
        </div>
        <div className="col-md-10">
          <h1 className="h1">Welcome to OctoFit Tracker</h1>
          <p>Your ultimate fitness companion app.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Activities</h5>
              <p className="card-text">Log your fitness activities.</p>
              <a href="/activities" className="btn btn-primary">View Activities</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Teams</h5>
              <p className="card-text">Manage your teams.</p>
              <a href="/teams" className="btn btn-primary">View Teams</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text">See the top performers.</p>
              <a href="/leaderboard" className="btn btn-primary">View Leaderboard</a>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Workouts</h5>
              <p className="card-text">Get personalized workout suggestions.</p>
              <a href="/workouts" className="btn btn-primary">View Workouts</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;