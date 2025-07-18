// File Name: App.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: Main application component that sets up routing and layout for the portfolio site.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ------------------ Component Imports ------------------
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/AboutMe';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/ContactMe';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ContactList from './components/ContactList';
import QualificationList from './components/QualificationList';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// ------------------ App Component ------------------
function App() {
  return (
    <Router>
      <div style={styles.layout}>
        <NavBar />
        
        {/* ------------------ Page Content Area ------------------ */}
        <div style={styles.page}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
           
  {/* 🔐 Assignment 3 Routes */}
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard/projects"
    element={
      <ProtectedRoute>
        <ProjectList />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/contacts"
    element={
      <ProtectedRoute>
        <ContactList />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/qualifications"
    element={
      <ProtectedRoute>
        <QualificationList />
      </ProtectedRoute>
    }
  />
  
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

// ------------------ Inline Styles ------------------
const styles = {
  layout: {
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#ddd'
  },
  page: {
    padding: '40px 20px'
  }
};

export default App;
