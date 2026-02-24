import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    // Validation
    if (!formData.firstname.trim()) {
      setMessage({ type: 'error', text: 'First name is required' })
      return
    }
    if (!formData.lastname.trim()) {
      setMessage({ type: 'error', text: 'Last name is required' })
      return
    }
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' })
      return
    }
    if (!formData.email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email' })
      return
    }
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    try {
      setLoading(true)
      await register(
        formData.firstname,
        formData.lastname,
        formData.email,
        formData.password
      )
      setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data || 'Registration failed. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <div className="auth-links">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  )
}

export default Register
