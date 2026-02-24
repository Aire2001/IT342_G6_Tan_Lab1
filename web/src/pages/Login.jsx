import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
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
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' })
      return
    }
    if (!formData.email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email' })
      return
    }
    if (!formData.password) {
      setMessage({ type: 'error', text: 'Password is required' })
      return
    }

    try {
      setLoading(true)
      await login(formData.email, formData.password)
      setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' })
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data || 'Login failed. Please check your credentials.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <div className="auth-links">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  )
}

export default Login
