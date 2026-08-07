import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'
import './Auth.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      const result = await register(email, password, name)
      localStorage.setItem('token', result.token)
      navigate('/map')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit}>
        <h1 className="auth__title">Sign Up</h1>

        {error && <p className="auth__error">{error}</p>}

        <label className="auth__label" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="auth__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit" className="auth__button">Create account</button>

        <p className="auth__switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}