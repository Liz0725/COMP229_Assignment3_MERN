// File Name: Projects.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: Displays a list of personal React projects using dynamic rendering with array mapping.

import React from 'react';

// ------------------ Projects Data ------------------
const projects = [
  {
    title: "React Portfolio Website",
    image: "https://placehold.co/250x140?text=Portfolio+Website",
    description: "A multi-page portfolio built using React, showcasing my background, skills, and projects. I used React Router for navigation and Vite for fast development.",
    role: "Frontend Developer",
    outcome: "Practiced component-based architecture and styling in React."
  },
  {
    title: "Math Quiz App",
    image: "https://placehold.co/250x140?text=Math+Quiz+App",
    description: "A small app that quizzes users with random math problems. Built with React state and conditional rendering. Includes scoring and feedback system.",
    role: "Developer",
    outcome: "Improved understanding of React hooks and event handling."
  },
  {
    title: "Reading Journal - Book Tracker",
    image: "https://placehold.co/250x140?text=Reading+Journal",
    description: "A personal reading journal that highlights my favorite books. Each book entry includes a cover image, personal reflection, and a link to more information.",
    role: "Frontend Developer & Curator",
    outcome: "Built dynamic rendering of book data using React. Strengthened array mapping, prop handling, and personal expression through content."
  }
];

// ------------------ Projects Component ------------------
function Projects() {
  return (
    <div>
      <h1>My Projects</h1>

      {/* ------------------ Project Cards ------------------ */}
      <div style={styles.container}>
        {projects.map((project, index) => (
          <div key={index} style={styles.card}>
            <img src={project.image} alt={project.title} style={styles.image} />
            <h3>{project.title}</h3>
            <p><strong>Role:</strong> {project.role}</p>
            <p>{project.description}</p>
            <p><strong>Outcome:</strong> {project.outcome}</p>
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

export default Projects;
