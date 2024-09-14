import React from 'react';
import '../About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h1 className="section-title">About BookNest</h1>
          <p className="mission-description">
            At BookNest, we believe in creating a cozy haven for book enthusiasts to connect, share, and discover. Our platform is dedicated to fostering a vibrant community where readers can come together to discuss their favorite books, share reviews, and find their next great read.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-subtitle">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3 className="team-name">Sharvari Mungale</h3>
              <p className="team-role">Founder & CEO</p>
              <p className="team-bio">
                Sharvari is the visionary behind BookNest, bringing a passion for literature and a commitment to creating a thriving community for book lovers.
              </p>
            </div>
            <div className="team-member">
              <h3 className="team-name">Jamie Lee</h3>
              <p className="team-role">Chief Technology Officer</p>
              <p className="team-bio">
                Jamie oversees the technical aspects of BookNest, ensuring the platform runs smoothly and innovatively.
              </p>
            </div>
            <div className="team-member">
              <h3 className="team-name">Taylor Smith</h3>
              <p className="team-role">Community Manager</p>
              <p className="team-bio">
                Taylor is dedicated to building and nurturing our community, ensuring a welcoming environment for all members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-subtitle">Get In Touch</h2>
          <p className="contact-description">
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out to us. We're here to help and connect with our community.
          </p>
          <p className="contact-email">
            <a href="mailto:contact@booknest.com" className="contact-link">contact@booknest.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
