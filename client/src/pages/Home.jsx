// File Name: Home.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: Home page for the portfolio site. Introduces the student and links to About and Projects pages.

import React from 'react';
import { Link } from 'react-router-dom';

// ------------------ Home Component ------------------
function Home() {
  return (
    <>
      <h1>Welcome to My Portfolio!</h1>
      
      {/* ------------------ Introductory Paragraphs ------------------ */}
      <p>
        I'm Mihyun Kim — currently studying Software Engineering Technician at Centennial College.
      </p>
      <p style={{ fontStyle: 'italic', marginTop: '20px', color: '#bbb' }}>
        My mission is to explore how mathematical modeling techniques can be applied to data analysis in order to derive accurate and meaningful results.
      </p>

      {/* ------------------ Navigation Buttons ------------------ */}
      <div style={{ marginTop: '30px' }}>
        <Link to="/about">
          <button style={buttonStyle}>Learn More About Me</button>
        </Link>
        <Link to="/projects">
          <button style={buttonStyle}>View My Projects</button>
        </Link>
      </div>
    </>
  );
}

// ------------------ Inline Button Style ------------------
const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#61dafb',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer'
};

export default Home;
