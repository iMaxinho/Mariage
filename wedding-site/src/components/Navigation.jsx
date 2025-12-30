import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-text">Allison & Maxime</span>
        </Link>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link></li>
          <li><Link to="/programme" className="nav-link" onClick={closeMenu}>Programme</Link></li>
          <li><Link to="/infos" className="nav-link" onClick={closeMenu}>Infos Pratiques</Link></li>
          <li><Link to="/cadeaux" className="nav-link" onClick={closeMenu}>Cadeaux</Link></li>
          <li><Link to="/rsvp" className="nav-link" onClick={closeMenu}>RSVP</Link></li>
        </ul>
      </div>
    </nav>
  )
}
