import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: call the backend register endpoint once auth is built
    console.log({ name, email, password })
  }

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit}>
        <h1 className="auth__title">Sign Up</h1>

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