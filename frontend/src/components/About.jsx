import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <h2>About E!i8Events</h2>
      <div className="about-content">
        <div className="about-text">
          <p>We are your premier event planning partner, dedicated to creating memorable experiences that last a lifetime.</p>
          <p>With years of experience in event management, we specialize in:</p>
          <ul>
            <li>Corporate Events</li>
            <li>Weddings</li>
            <li>Birthday Celebrations</li>
            <li>Social Gatherings</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
