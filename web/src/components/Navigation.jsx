import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span style={{ color: 'white', padding: '0.5rem 1rem' }}>
                Welcome, {user?.firstname}!
              </span>
            </li>
            <li>
              <button 
                className="btn-danger" 
                onClick={handleLogout}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: 'auto' }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
