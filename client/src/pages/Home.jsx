// File Name: Home.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: Updated July 23, 2025
// Description: Home page wrapped in Layout for consistent NavBar and layout styling.

import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout' // ✅ import Layout

function Home() {
  return (
    <Layout> {/* ✅ Wrap content in Layout to include NavBar */}
      <div style={styles.container}>
        <h1>Welcome to My Portfolio!</h1>

        {/* ------------------ Introductory Paragraphs ------------------ */}
        <p>
          I'm Mihyun Kim — currently studying Software Engineering Technician at Centennial College.
        </p>
        <p style={styles.italic}>
          My mission is to explore how mathematical modeling techniques can be applied to data analysis in order to derive accurate and meaningful results.
        </p>
        <p style={{ color: "lightblue" }}>
  ✅ This is a CI/CD test update to demonstrate automatic deployment.
</p>


        {/* ------------------ Navigation Buttons ------------------ */}
        <div style={styles.buttonGroup}>
          <Link to="/about">
            <button style={styles.button}>Learn More About Me</button>
          </Link>
          <Link to="/projects">
            <button style={styles.button}>View My Projects</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

// ------------------ Styles ------------------
const styles = {
  container: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic',
    marginTop: '20px',
    color: '#bbb'
  },
  buttonGroup: {
    marginTop: '30px'
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer'
  }
}

export default Home
