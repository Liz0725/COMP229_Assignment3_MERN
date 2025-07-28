// Layout.jsx
import React from 'react'
import NavBar from './NavBar'

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div style={styles.wrapper}>
        {children}
      </div>
    </>
  )
}

const styles = {
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#ddd',
    textAlign: 'center'
  }
}

export default Layout
