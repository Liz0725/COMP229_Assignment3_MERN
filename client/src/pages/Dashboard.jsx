// Dashboard.jsx
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../api/auth'
import Layout from '../components/Layout'

export default function Dashboard() {
  const { user } = isAuthenticated()

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome, {user.name}!</h2>
        <p style={styles.role}>Role: <strong>{user.role}</strong></p>

        <ul style={styles.list}>
          <li><Link to="/dashboard/projects" style={styles.link}>Manage Projects</Link></li>
          <li><Link to="/dashboard/contacts" style={styles.link}>Manage Contacts</Link></li>
          <li><Link to="/dashboard/qualifications" style={styles.link}>Manage Qualifications</Link></li>
        </ul>
      </div>
    </Layout>
  )
}

// ------------------ Styling ------------------
const styles = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    textAlign: 'center',
    color: '#fff'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  role: {
    fontSize: '1.1rem',
    color: '#ccc',
    marginBottom: '30px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '2'
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '18px'
  }
}
