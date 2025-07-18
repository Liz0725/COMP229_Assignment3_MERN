// File Name: Layout.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: Layout component that wraps all pages with consistent styling and width.

import React from 'react';

// ------------------ Layout Component ------------------
function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      {children}
    </div>
  );
}

// ------------------ Inline Styles ------------------
const styles = {
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#ddd',
  }
};

export default Layout;
