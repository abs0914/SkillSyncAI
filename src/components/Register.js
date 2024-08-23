import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', { username, password })
      .then(() => {
        alert('User registered successfully');
      })
      .catch((error) => {
        console.error('Registration failed', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;