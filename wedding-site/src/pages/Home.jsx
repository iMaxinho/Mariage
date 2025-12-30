import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <svg className="shell-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#d4a574" />
            </svg>
          </div>
          <h1 className="hero-title">
            Allison <span className="ampersand">&</span> Maxime
          </h1>
          <p className="hero-subtitle">Nous nous marions</p>
          <div className="hero-dates">
            <p className="date-line">31 Mai 2026 · Neuilly-sur-Seine</p>
            <p className="date-line">6 & 7 Juin 2026 · Corse</p>
          </div>
        </div>
      </section>

      <section className="save-the-date">
        <div className="container">
          <h2 className="section-title">Réservez ces dates</h2>
          <p className="section-intro">
            Nous avons le bonheur de vous inviter à célébrer notre union lors de deux moments exceptionnels
          </p>
        </div>
      </section>

      <section className="events-timeline">
        <div className="container">
          <div className="event-card featured">
            <div className="event-number">01</div>
            <div className="event-content">
              <h3 className="event-title">Mairie de Neuilly-sur-Seine</h3>
              <p className="event-date">Samedi 31 Mai 2026</p>
              <p className="event-description">
                Cérémonie civile à la mairie de Neuilly-sur-Seine suivie d'un cocktail
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">16h00</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">Mairie de Neuilly-sur-Seine</span>
                </div>
              </div>
            </div>
          </div>

          <div className="event-card featured">
            <div className="event-number">02</div>
            <div className="event-content">
              <h3 className="event-title">Cérémonie en Corse</h3>
              <p className="event-date">Samedi 6 Juin 2026</p>
              <p className="event-description">
                Cérémonie laïque sur une plage de Corse du Sud, suivie d'une soirée inoubliable
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">18h00</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">Plage Da Mare, Palombaggia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="event-card">
            <div className="event-number">03</div>
            <div className="event-content">
              <h3 className="event-title">Brunch du lendemain</h3>
              <p className="event-date">Dimanche 7 Juin 2026</p>
              <p className="event-description">
                Brunch convivial pour prolonger les festivités en bord de mer
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">11h30</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">Plage La Bohème, Bonifacio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Confirmez votre présence</h2>
          <p className="cta-text">
            Merci de nous faire savoir si vous pourrez nous rejoindre pour célébrer ce jour spécial
          </p>
          <div className="cta-buttons">
            <Link to="/rsvp" className="btn btn-primary">
              Répondre à l'invitation
            </Link>
            <Link to="/infos" className="btn btn-secondary">
              Infos pratiques
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
