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
              <div className="timeline-dot">01</div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <div className="date-badge">Samedi 31 Mai 2026</div>
              <h2 className="event-title">Mairie de Neuilly-sur-Seine</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕓</span>
                  <span>16h00 - Cérémonie civile</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>Mairie de Neuilly-sur-Seine, 92200</span>
                </div>
                <p className="description">
                  Rejoignez-nous pour la cérémonie officielle à la mairie, suivie d'un cocktail dans les jardins.
                  Ce premier événement marquera le début de nos célébrations.
                </p>
                <div className="info-box">
                  <h4>Informations pratiques</h4>
                  <ul>
                    <li>Tenue de ville élégante</li>
                    <li>Accès en métro: Ligne 1, station Les Sablons</li>
                    <li>Parking disponible à proximité</li>
                    <li>Cocktail de 17h30 à 20h00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item highlight">
            <div className="timeline-marker">
              <div className="timeline-dot">02</div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <div className="date-badge highlight">Samedi 6 Juin 2026</div>
              <h2 className="event-title">Cérémonie en Corse</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕕</span>
                  <span>18h00 - Cérémonie laïque</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>Plage Da Mare, Palombaggia, Corse du Sud</span>
                </div>
                <p className="description">
                  Notre cérémonie principale aura lieu sur la magnifique plage de Palombaggia.
                  Célébration en bord de mer au coucher du soleil, suivie d'un dîner et d'une soirée dansante.
                </p>
                <div className="schedule">
                  <h4>Déroulement de la journée</h4>
                  <div className="schedule-item">
                    <span className="schedule-time">18h00</span>
                    <span className="schedule-desc">Cérémonie laïque sur la plage</span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-time">19h00</span>
                    <span className="schedule-desc">Vin d'honneur et photos</span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-time">20h30</span>
                    <span className="schedule-desc">Dîner de gala</span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-time">23h00</span>
                    <span className="schedule-desc">Soirée dansante</span>
                  </div>
                </div>
                <div className="info-box">
                  <h4>À prévoir</h4>
                  <ul>
                    <li>Tenue élégante et légère (pensez au sable!)</li>
                    <li>Protection solaire recommandée</li>
                    <li>Châle ou veste pour la soirée</li>
                    <li>Chaussures plates conseillées pour la plage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot">03</div>
            </div>
            <div className="timeline-content">
              <div className="date-badge">Dimanche 7 Juin 2026</div>
              <h2 className="event-title">Brunch du lendemain</h2>
              <div className="event-details">
                <div className="detail-row">
                  <span className="icon">🕚</span>
                  <span>11h30 - Brunch convivial</span>
                </div>
                <div className="detail-row">
                  <span className="icon">📍</span>
                  <span>Plage La Bohème, Bonifacio</span>
                </div>
                <p className="description">
                  Prolongeons la fête avec un brunch décontracté en bord de mer.
                  Moment parfait pour se retrouver et partager nos souvenirs de la veille.
                </p>
                <div className="info-box">
                  <h4>Informations</h4>
                  <ul>
                    <li>Tenue décontractée</li>
                    <li>Buffet et boissons sur place</li>
                    <li>Ambiance relax en bord de mer</li>
                    <li>Fin prévue vers 15h00</li>
                  </ul>
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
    </div>
  )
}
