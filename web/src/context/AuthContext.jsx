import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchCurrentUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async (token) => {
    try {
      const response = await api.get('/auth/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching user:', err)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const register = async (firstname, lastname, email, password) => {
    try {
      setError(null)
      const response = await api.post('/auth/register', {
        firstname,
        lastname,
        email,
        password
      })
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data || 'Registration failed'
      setError(errorMessage)
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await api.post('/auth/login', {
        email,
        password
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      
      // Fetch user data immediately
      await fetchCurrentUser(token)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data || 'Login failed'
      setError(errorMessage)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      register, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
