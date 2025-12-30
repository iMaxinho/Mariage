import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-06-07T15:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="welcome-text">Bienvenue sur notre site de mariage</h2>
          <p className="intro-text">
            Nous sommes ravis de partager avec vous les détails de notre grand jour !
          </p>

          <div className="countdown">
            <h3>Compte à rebours</h3>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span className="countdown-number">{timeRemaining.days}</span>
                <span className="countdown-label">Jours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeRemaining.hours}</span>
                <span className="countdown-label">Heures</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeRemaining.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{timeRemaining.seconds}</span>
                <span className="countdown-label">Secondes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <h3>Mairie</h3>
          <p className="card-date">28 Mai 2025</p>
          <p className="card-details">Cérémonie civile à Paris</p>
        </div>
        <div className="info-card highlight">
          <h3>Célébration en Corse</h3>
          <p className="card-date">6-7 Juin 2025</p>
          <p className="card-details">Weekend de fête à Ajaccio</p>
        </div>
        <div className="info-card">
          <h3>Brunch</h3>
          <p className="card-date">8 Juin 2025</p>
          <p className="card-details">Pour prolonger les festivités</p>
        </div>
      </div>

      <div className="invitation-section">
        <p className="invitation-text">
          Votre présence à nos côtés serait le plus beau des cadeaux.<br />
          N'oubliez pas de confirmer votre participation via le formulaire RSVP !
        </p>
      </div>
    </div>
  );
}

export default Home;
