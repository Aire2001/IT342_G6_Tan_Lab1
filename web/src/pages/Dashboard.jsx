import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(true)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  const handleEditProfile = () => {
    // This can be extended later with edit functionality
    alert('Edit profile feature coming soon!')
  }

  const handleChangePassword = () => {
    // This can be extended later with change password functionality
    alert('Change password feature coming soon!')
  }

  return (
    <div className="dashboard">
      <h1>Dashboard & Profile</h1>
      
      {showProfile && user && (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.firstname} {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.id || 'N/A'}
          </p>
          <p>
            <strong>Status:</strong> <span style={{ color: '#27ae60' }}>Active</span>
          </p>
        </div>
      )}

      <div style={{ backgroundColor: '#ecf0f1', padding: '1.5rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Account Information</h3>
        <p style={{ marginBottom: '0.5rem' }}>You are logged in and have access to your personal dashboard.</p>
        <p>Here you can view and manage your profile information, change your password, and more.</p>
      </div>

      <div className="dashboard-actions">
        <button 
          className="btn-primary"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <button 
          className="btn-secondary"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
        <button 
          className="btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#f0f8ff', padding: '1.5rem', borderRadius: '6px', borderLeft: '4px solid #3498db' }}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Quick Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ color: '#7f8c8d', marginBottom: '0.5rem' }}>Account Status</p>
            <p style={{ fontSize: '1.2rem', color: '#27ae60', fontWeight: 'bold' }}>Active</p>
          </div>
          <div>
            <p style={{ color: '#7f8c8d', marginBottom: '0.5rem' }}>Last Login</p>
            <p style={{ fontSize: '1.2rem', color: '#3498db', fontWeight: 'bold' }}>Just Now</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
