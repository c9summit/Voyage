import { useEffect, useState } from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="landing">

      {/* HERO */}
      <section className="landing__hero" id="top">

        <div className="title">
          <h1>Voyage</h1>
        </div>

        <div className="landing__actions">

          <Link to="/login" className="landing__button">
            Login
          </Link>

          <Link to="/signup" className="landing__button">
            Signup
          </Link>

          <a href="#about" className="landing__button">
            About
          </a>

        </div>


      </section>


      {/* ABOUT */}
      <section id="about" className="landing__about">

        <div className="landing__about-content">

          <h2 className="landing__about-title">
            Born too early to explore space?          
          </h2>
          <h2 className="landing__about-title">       
            Born too late to explore earth?
          </h2>

          <p className="landing__about-text">
            Voyage turns your real world travels into the exploration
            of an unknown earth. When you begin your journey, the map lies
            hidden beneath fog. Every country you actually visit becomes
            land you've explored, revealed forever on your personal map.
          </p>

          <p className="landing__about-text">
            Earn renown for new lands charted, track your progress continent
            by continent, and see how your exploration compares to fellow
            travellers on the Fellowship's Ledger.
          </p>
          <a
        href="#top"
        className={`back-to-top ${showBackToTop ? 'back-to-top--visible' : ''}`}
        aria-label="Back to top">↑</a>

        </div>

      </section>

    </div>
  )
}