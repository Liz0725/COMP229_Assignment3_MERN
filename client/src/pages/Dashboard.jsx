// Dashboard.jsx
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../api/auth'

export default function Dashboard() {
  const { user } = isAuthenticated()

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>

      <ul>
        <li><Link to="/dashboard/projects">Manage Projects</Link></li>
        <li><Link to="/dashboard/contacts">Manage Contacts</Link></li>
        <li><Link to="/dashboard/qualifications">Manage Qualifications</Link></li>
      </ul>
    </div>
  )
}
