import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    // Demo login for project presentation
    if (email === 'admin@musicacademy.com' && password === 'admin123') {
      setError('')
      onLogin()
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand-content">

          <div className="music-logo">
            ♪
          </div>

          <h1>Music Academy</h1>

          <p>
            Manage students, instructors, courses
            and enrollments in one place.
          </p>

          <div className="music-notes">
            ♪ ♫ ♪
          </div>

        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your academy dashboard</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="login-form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="login-form-group">
              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>

              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

          <div className="login-footer">
            <span>Music Academy Management System</span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Login