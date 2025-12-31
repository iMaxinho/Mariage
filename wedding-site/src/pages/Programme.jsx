import './Programme.css'

export default function Programme() {
  return (
    <div className="programme">
      <div className="programme-header">
        <h1 className="page-title">Le Programme</h1>
        <p className="page-subtitle">Trois moments pour célébrer notre union</p>
      </div>

      <div className="programme-container">
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot">
                <img src="/logo (8).svg" alt="" className="shell-number" />
                <span className="number-text">1</span>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <div className="date-badge">28 Mai 2026</div>
              <h2 className="event-title">Mairie de Neuilly-sur-Seine</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕓</span>
                  <span>15h00 - Cérémonie civile</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>
                    <a
                      href="https://www.google.com/maps/place/96+Avenue+Achille+Peretti,+92200+Neuilly-sur-Seine"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Mairie de Neuilly-sur-Seine, 96 avenue Achille Peretti, 92200
                    </a>
                  </span>
                </div>
                <p className="description">
                  Nous nous dirons oui à la mairie de Neuilly-Sur-Seine.
                  La Mairie sera suivie d'un cocktail convivial.
                  Cette première journée marquera le début de nos célébrations.
                </p>
                <div className="info-box">
                  <h4>Informations pratiques</h4>
                  <ul>
                    <li>Accès en métro: Ligne 1, station Les Sablons</li>
                    <li>Parking disponible à proximité</li>
                    <li>Cocktail de 16h30 à 19h00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item highlight">
            <div className="timeline-marker">
              <div className="timeline-dot">
                <img src="/logo (8).svg" alt="" className="shell-number" />
                <span className="number-text">2</span>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <div className="date-badge highlight">Samedi 6 Juin 2026</div>
              <h2 className="event-title">Cérémonie en Corse</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕕</span>
                  <span>17h30 - Cérémonie laïque</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>
                    <a
                      href="https://www.google.com/maps/search/Da+Mare+By+Sea+Lounge+Palombaggia+Porto+Vecchio/@41.5891,9.3558,15z"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Plage Da Mare, Palombaggia, Corse du Sud
                    </a>
                  </span>
                </div>
                <p className="description">
                  La cérémonie aura lieu sur la magnifique plage de Palombaggia et sera suivie d'un dîner et d'une soirée les pieds dans le sable.
                </p>
                <div className="info-box">
                  <h4>À prévoir</h4>
                  <ul>
                    <li>Tenue élégante et légère (pensez au sable!)</li>
                    <li>Chaussures plates conseillées pour la plage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot">
                <img src="/logo (8).svg" alt="" className="shell-number" />
                <span className="number-text">3</span>
              </div>
            </div>
            <div className="timeline-content">
              <div className="date-badge">Dimanche 7 Juin 2026</div>
              <h2 className="event-title">Brunch du lendemain</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕚</span>
                  <span>12h30 - Brunch convivial</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>
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
                <p className="description">
                  Prolongeons la fête avec un brunch décontracté en bord de mer.
                  Moment parfait pour se retrouver et profiter des derniers instants en Corse.
                </p>
                <div className="info-box">
                  <h4>Informations</h4>
                  <ul>
                    <li>Dress code white party même le maillot</li>
                    <li>Ambiance chill en bord de mer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="final-note">
        <h3>Une question sur le programme?</h3>
        <p>
          N'hésitez pas à nous contacter si vous avez besoin de plus d'informations
          sur l'un de ces événements.
        </p>
      </div>
    </div>
  )
}
