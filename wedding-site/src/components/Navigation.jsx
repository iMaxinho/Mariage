import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Allison & Maxime</span>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Accueil</Link></li>
          <li><Link to="/programme" className="nav-link">Programme</Link></li>
          <li><Link to="/infos" className="nav-link">Infos Pratiques</Link></li>
          <li><Link to="/cadeaux" className="nav-link">Cadeaux</Link></li>
          <li><Link to="/rsvp" className="nav-link">RSVP</Link></li>
        </ul>
      </div>
    </nav>
  )
}
