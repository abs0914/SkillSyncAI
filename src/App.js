import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import VIPPage from './pages/VIPPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/');
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <Header token={token} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/vip"
            element={
              <ProtectedRoute token={token}>
                <VIPPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
}

export default App;
