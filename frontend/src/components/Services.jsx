import React from 'react';
import './Services.css';

function Services() {
  return (
    <section id="services" className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>Corporate Events</h3>
          <p>Professional conferences, seminars, and team-building events</p>
        </div>
        <div className="service-card">
          <h3>Wedding Planning</h3>
          <p>Complete wedding planning and coordination services</p>
        </div>
        <div className="service-card">
          <h3>Birthday Parties</h3>
          <p>Memorable birthday celebrations for all ages</p>
        </div>
        <div className="service-card">
          <h3>Social Events</h3>
          <p>Gala dinners, fundraisers, and social gatherings</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
