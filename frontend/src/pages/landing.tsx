import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet"></link>
      <div className="title">
      <h1>Voyage</h1>
      </div>
      <div className="landing__actions">
        <Link to="/login" className="landing__button">Login</Link>
        <Link to="/signup" className="landing__button">Signup</Link>
      </div>
    </div>
    
  )
}