import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <img src="/logo-AM.png" alt="Logo Allison & Maxime" className="shell-logo" />
          </div>
          <h1 className="hero-title">
            Allison & Maxime
          </h1>
          <p className="hero-subtitle">Nous nous marions</p>
          <div className="hero-dates">
            <p className="date-line">28 Mai 2026 · Neuilly-sur-Seine</p>
            <p className="date-line">6 & 7 Juin 2026 · Corse</p>
          </div>
        </div>
      </section>

      <section className="save-the-date">
        <div className="container">
          <h2 className="section-title">Réservez ces dates</h2>
          <p className="section-intro">
            Nous avons le bonheur de vous inviter à célébrer notre union lors de trois moments exceptionnels
          </p>
        </div>
      </section>

      <section className="events-timeline">
        <div className="container">
          <div className="event-card featured">
            <div className="event-number">
              <img src="/logo (8).png" alt="" className="shell-number" />
              <span className="number-text">1</span>
            </div>
            <div className="event-content">
              <h3 className="event-title">Mairie de Neuilly-sur-Seine</h3>
              <p className="event-date">28 Mai 2026</p>
              <p className="event-description">
                Cérémonie civile à la mairie de Neuilly-sur-Seine suivie d'un cocktail
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">15h00</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">
                    <a
                      href="https://www.google.com/maps/place/96+Avenue+Achille+Peretti,+92200+Neuilly-sur-Seine"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Mairie de Neuilly-sur-Seine
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="event-card featured">
            <div className="event-number">
              <img src="/logo (8).png" alt="" className="shell-number" />
              <span className="number-text">2</span>
            </div>
            <div className="event-content">
              <h3 className="event-title">Cérémonie en Corse</h3>
              <p className="event-date">Samedi 6 Juin 2026</p>
              <p className="event-description">
                Cérémonie laïque sur une plage de Corse du Sud, suivie d'une soirée inoubliable
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">17h30</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">
                    <a
                      href="https://www.google.com/maps/search/Da+Mare+By+Sea+Lounge+Palombaggia+Porto+Vecchio/@41.5891,9.3558,15z"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Plage Da Mare, Palombaggia
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="event-card">
            <div className="event-number">
              <img src="/logo (8).png" alt="" className="shell-number" />
              <span className="number-text">3</span>
            </div>
            <div className="event-content">
              <h3 className="event-title">Brunch du lendemain</h3>
              <p className="event-date">Dimanche 7 Juin 2026</p>
              <p className="event-description">
                Brunch convivial pour prolonger les festivités en bord de mer
              </p>
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Heure</span>
                  <span className="detail-value">12h30</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lieu</span>
                  <span className="detail-value">
                    <a
                      href="https://maps.app.goo.gl/TgvSLz7VwqLrx72h8"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Plage La Bohème, Bonifacio
                    </a>
                  </span>
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
