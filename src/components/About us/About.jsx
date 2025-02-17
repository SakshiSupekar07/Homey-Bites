import React from 'react';
import './About.css';

const About = () => {
  return (
    <div>
      {/* Other Contents */}
      <header className="hero-section">
        <h1>Welcome to HOMEYBITES </h1>
        <p>Your gateway to healthy, home-style meals delivered fresh every day!</p>
      </header>

      

      {/* About Us Section */}
      <div  className="about-container" id="about">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-text"></p>
            Welcome to <strong>HomeyBites</strong>,  We provide fresh, homemade, and delicious meals delivered straight to your doorstep. Our carefully curated menus offer a perfect balance of taste and nutrition, ensuring you enjoy wholesome, home-style food every day. Whether it's lunch or dinner, we are here to make your mealtime hassle-free and satisfying."
        </div>
      </div>
    </div>
  );
};

export default About;
