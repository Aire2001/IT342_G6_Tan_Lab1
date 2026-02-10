import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="welcome-container">
      <h1>Welcome to User Authentication App</h1>
      <p>A secure authentication system built with React and Spring Boot</p>
      
      {!isAuthenticated ? (
        <div className="btn-group">
          <Link to="/register">
            <button className="btn-primary">Register</button>
          </Link>
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>
        </div>
      ) : (
        <div className="btn-group">
          <Link to="/dashboard">
            <button className="btn-primary">Go to Dashboard</button>
          </Link>
        </div>
      )}

      <div style={{ marginTop: '3rem', maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <h2>Features</h2>
        <ul style={{ listStyle: 'none', textAlign: 'left' }}>
          <li style={{ padding: '0.5rem 0' }}>✓ User Registration with validation</li>
          <li style={{ padding: '0.5rem 0' }}>✓ Secure Login with JWT tokens</li>
          <li style={{ padding: '0.5rem 0' }}>✓ Protected Dashboard</li>
          <li style={{ padding: '0.5rem 0' }}>✓ User Profile Management</li>
          <li style={{ padding: '0.5rem 0' }}>✓ Secure Logout</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
