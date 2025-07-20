// File Name: NavBar.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: Updated for Assignment 3
// Description: Navigation bar with dynamic login/logout and dashboard links

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../api/auth'

const NavBar = () => {
  const navigate = useNavigate()
  const auth = isAuthenticated()

  const handleLogout = () => {
    signout(() => {
      navigate('/login')
    })
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MK</div>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About Me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact Me</Link>


        {auth ? (
  <>
    <Link to="/dashboard">Dashboard</Link>
    <button onClick={handleLogout} style={styles.button}>Logout</button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link> {/* ✅ Add this line */}
  </>
)}

      </div>
    </nav>
  )
}

// ------------------ Inline Styles ------------------
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#11121a',
    padding: '20px',
    marginBottom: '40px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#61dafb'
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    color: '#111',
    borderRadius: '4px'
  }
}

export default NavBar
