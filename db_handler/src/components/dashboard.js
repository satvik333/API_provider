import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        Dashboard
      </header>
      <div className="container">
        <div className="buttons">
          <button className="button" onClick={() => navigate('/table-analyser')}>Table Analyser</button>
          <button className="button" onClick={() => navigate('/query-master')}>Query Master</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
