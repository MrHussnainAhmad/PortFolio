import React from 'react';
import './Welcome.css';

const Welcome = ({ name }) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Greetings, {name}!</h1>
      <p className="welcome-message">You've just entered the digital realm of my creativity and passion.</p>
      <p className="welcome-description">Get ready to explore my journey and the projects that have shaped my path.</p>
    </div>
  );
};

export default Welcome;
