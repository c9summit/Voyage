import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <h1>Voyage</h1>
      <div className="landing__actions">
        <Link to="/login" className="landing__button">Login</Link>
        <Link to="/signup" className="landing__button">Sign Up</Link>
      </div>
    </div>
    
  )
}