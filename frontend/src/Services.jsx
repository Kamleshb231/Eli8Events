function Services() {
  return (
    <section>
      <h2>Our Services</h2>
      <div className="services-gallery">
        <div className="service-card">
          <img src="/images/corporate.jpg" alt="Corporate Events" className="service-img" />
          <h3>Corporate Events</h3>
          <p>Conferences, product launches, team building, and more for your business success.</p>
          <a href="/gallery/corporate" className="gallery-link">View Gallery</a>
        </div>
        <div className="service-card">
          <img src="/images/private.jpg" alt="Private Parties" className="service-img" />
          <h3>Private Parties</h3>
          <p>Birthdays, anniversaries, and special occasions tailored to your vision.</p>
          <a href="/gallery/private" className="gallery-link">View Gallery</a>
        </div>
        <div className="service-card">
          <img src="/images/social.jpg" alt="Social Media Marketing" className="service-img" />
          <h3>Social Media Marketing</h3>
          <p>Boost your event's reach and engagement with our digital marketing expertise.</p>
          <a href="/gallery/social" className="gallery-link">View Gallery</a>
        </div>
      </div>
    </section>
  );
}
export default Services;