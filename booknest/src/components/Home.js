import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BookNest</h1>
          <p className="hero-tagline">
            BookNest - Conveys a cozy place for book enthusiasts to gather and share reviews.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-secondary hero-button">
              Log In
            </Link>
            <Link to="/register" className="btn btn-primary hero-button">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="container ">
          <h2 className="section-title">Discover What Makes Us Special</h2>
          <div className="features-grid ">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Vibrant Community</h3>
              <p className="feature-description">
                Connect with fellow book lovers and share your reading journey in a supportive environment.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Community-Driven Insights</h3>
               <p className="feature-description">
                  Connect with fellow book lovers, share reviews, and discover the latest trends in the literary world.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✍️</div>
              <h3 className="feature-title">Interactive Reviews</h3>
              <p className="feature-description">
                Engage with detailed reviews, ratings, and comments to enhance your reading experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <p className="testimonial-text">
                "BookNest has transformed my reading experience. The community is so supportive and the recommendations are spot-on!"
              </p>
              <p className="testimonial-author">- Alex J.</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "I love how easy it is to find new books and share my thoughts with other book enthusiasts. BookNest is amazing!"
              </p>
              <p className="testimonial-author">- Jamie R.</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "The personalized recommendations have introduced me to so many great books. The community is friendly and welcoming."
              </p>
              <p className="testimonial-author">- Taylor S.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
    <section className="join-community-section">
    <div className="container">
      <h2 className="join-community-title">Join Our Community</h2>
      <p className="join-community-description">
        Become a part of our vibrant community and share your love for books. Connect with fellow readers, discover new books, and enjoy personalized recommendations.
      </p>
      <p> Copyright &copy; All Rights Reserved</p>
    </div>
  </section>

    </div>
  );
};

export default Home;
