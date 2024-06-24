import React, { useState } from 'react';
import './loginpage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    let enteredPassword = event.target.value;
    enteredPassword = enteredPassword.trim();
    setPassword(enteredPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ backgroundColor: 'e03038', color: 'darkblue' }}>DB Manager</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="text" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Login</button>
      <br />
    </form>
  );
}

export default LoginPage;
