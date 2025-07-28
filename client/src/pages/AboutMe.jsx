// File Name: About.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: About Me page component that introduces the developer and includes a personal photo and resume link.

import React from 'react'
import myPhoto from '../assets/Mihyun.jpg'
import Layout from '../components/Layout'  // ✅ Layout includes NavBar

function About() {
  return (
    <Layout>
      <div style={styles.container}>
        {/* ------------------ Text Section ------------------ */}
        <div style={styles.text}>
          <h1>About Me</h1>
          <p><strong>Legal Name:</strong> Mihyun Kim</p>
          <p>I am currently studying Software Engineering Technician at Centennial College.</p>
          <p>
            I previously taught high school math for over 12 years in South Korea. I love solving logical problems and exploring how mathematical modeling can be used in data analysis to generate meaningful results.
          </p>

          {/* Resume Link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            View My Resume (PDF)
          </a>
        </div>

        {/* ------------------ Photo Section ------------------ */}
        <img src={myPhoto} alt="Mihyun Kim" style={styles.image} />
      </div>
    </Layout>
  )
}

// ------------------ Inline Styles ------------------
const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap'
  },
  text: {
    flex: 1,
    minWidth: '250px'
  },
  image: {
    width: '200px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#61dafb',
    textDecoration: 'underline'
  }
}

export default About
