import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) return;
    try {
      await axios.post(
        'http://localhost:3001/login', 
        { username },
        { withCredentials: true }
      );
      onLogin(username);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        placeholder='Enter username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;