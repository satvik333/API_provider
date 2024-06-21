import LoginPage from "./components/loginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import React, { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginPage />}
        />
        <Route
          exact
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
