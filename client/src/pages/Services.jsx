// File Name: Services.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: A React component displaying service/project cards with title, description, role, and outcome.

import React from 'react';

// ------------------ Services Data ------------------
const services = [
  {
    title: "React Portfolio Website",
    image: "https://placehold.co/250x140?text=Portfolio+Website",
    description: "Custom portfolio websites using React and modern frontend tools.",
    role: "Frontend Developer",
    outcome: "Built a multi-page responsive site using Vite and React Router."
  },
  {
    title: "Math Quiz App",
    image: "https://placehold.co/250x140?text=Math+Quiz",
    description: "Educational quiz apps with scoring logic and interactive UI.",
    role: "App Developer",
    outcome: "Focused on state handling, input validation, and score feedback."
  },
  {
    title: "Reading Journal - Book Tracker",
    image: "https://placehold.co/250x140?text=Reading+Journal",
    description: "Personalized reading trackers with dynamic book entries and links.",
    role: "Frontend Developer",
    outcome: "Used array mapping and props to build a clean reading tracker."
  }
];

// ------------------ Services Component ------------------
function Services() {
  return (
    <div>
      <h1>Services I Offer</h1>

      {/* ------------------ Service Cards ------------------ */}
      <div style={styles.container}>
        {services.map((service, index) => (
          <div key={index} style={styles.card}>
            <img src={service.image} alt={service.title} style={styles.image} />
            <h3>{service.title}</h3>
            <p><strong>Role:</strong> {service.role}</p>
            <p>{service.description}</p>
            <p><strong>Outcome:</strong> {service.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Inline Styles ------------------
const styles = {
  card: {
    width: '250px',
    backgroundColor: '#1e1f26',
    padding: '20px',
    borderRadius: '8px',
    color: '#fff'
  },
  image: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    marginBottom: '10px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '30px',
    flexWrap: 'nowrap'
  }
};

export default Services;
