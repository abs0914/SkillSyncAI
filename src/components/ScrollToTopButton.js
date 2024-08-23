// src/components/ScrollToTopButton.js
import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to top
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} style={styles.button}>
          ↑
        </button>
      )}
    </div>
  );
}

const styles = {
  button: {
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
};

export default ScrollToTopButton;