import React from 'react';
import { Link } from 'react-router-dom';

function Header({ token, onLogout }) {
  return (
    <header>
      <h1>SkillSync AI</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {token ? (
            <>
              <li><Link to="/vip">VIP</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
