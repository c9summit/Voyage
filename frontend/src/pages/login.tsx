import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      const result = await login(email, password)
      localStorage.setItem('token', result.token) // simple storage for now
      navigate('/map')
    } catch (err) {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit}>
        <h1 className="auth__title">Login</h1>

        {error && <p className="auth__error">{error}</p>}

        <label className="auth__label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth__label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth__button">Login</button>

        <p className="auth__switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  )
}