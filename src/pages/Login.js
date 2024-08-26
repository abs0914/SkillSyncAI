import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // State for loading indicator
  const [message, setMessage] = useState('');  // State for success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setMessage('');  // Clear previous messages

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      onLogin(response.data.token);  // Call parent handler with the token
      setMessage('Login successful!');  // Set success message
    } catch (error) {
      setMessage('Failed to log in, please try again.');  // Set error message
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}  {/* Display success/error message */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}  {/* Show loading text or button text */}
        </button>
      </form>
    </div>
  );
}

export default Login;