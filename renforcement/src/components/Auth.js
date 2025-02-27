import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); 
  // 'login' or 'register'

  const handleSubmit = async () => {
    try {
      let url;
      if (mode === 'login') {
        url = 'http://localhost:3001/login';
      } else {
        url = 'http://localhost:3001/register';
      }

      await axios.post(url, { username, password }, { withCredentials: true });
      onAuthSuccess(username);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input 
        type="text" 
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br/>
      <input 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleSubmit}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
      <p style={{ marginTop: '10px' }}>
        {mode === 'login' 
          ? 'No account yet?' 
          : 'Already have an account?'
        }
        {' '}
        <span 
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default Auth;