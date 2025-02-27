import React, { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (username) => {
    setUser(username);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h3>Welcome, {user}</h3>
          <button onClick={handleLogout}>Logout</button>
          <TodoList />
        </>
      ) : (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;