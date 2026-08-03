import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: call the backend login endpoint once auth is built
    console.log({ email, password })
  }

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit}>
        <h1 className="auth__title">Login</h1>

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