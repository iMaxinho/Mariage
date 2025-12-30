import { useState } from 'react';
import './Navigation.css';

function Navigation({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'programme', label: 'Programme' },
    { id: 'infos', label: 'Infos Pratiques' },
    { id: 'cadeaux', label: 'Liste de Mariage' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  const handleClick = (pageId) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="navigation">
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
