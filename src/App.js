import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h2>Welcome to SkillSync AI</h2>
        <p>Your platform for AI-powered skill matching and development.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;