import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <h1>E!i8Events</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="hero-section">
        <h1>Welcome to E!i8Events</h1>
        <p>Making Your Special Moments Unforgettable</p>
      </div>
    </header>
  );
}

export default Header;
