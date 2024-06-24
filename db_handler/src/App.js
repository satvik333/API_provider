import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/loginPage';
import Dashboard from './components/dashboard';
import TableAnalyser from './components/tableAnalyser';
import QueryMaster from './components/queryMaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table-analyser" element={<TableAnalyser />} />
        <Route path="/query-master" element={<QueryMaster />} />
      </Routes>
    </Router>
  );
}

export default App;
