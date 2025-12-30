import './Programme.css';

function Programme() {
  return (
    <div className="programme">
      <h2 className="page-title">Programme des Festivités</h2>
      <p className="page-intro">
        Nous avons préparé trois événements mémorables pour célébrer notre union
      </p>

      <div className="events">
        <div className="event-card">
          <div className="event-header">
            <h3 className="event-title">Mairie</h3>
            <span className="event-date">Mercredi 28 Mai 2025</span>
          </div>
          <div className="event-content">
            <div className="event-detail">
              <strong>Lieu :</strong> Mairie du 15ème arrondissement, Paris
            </div>
            <div className="event-detail">
              <strong>Adresse :</strong> 31 Rue Péclet, 75015 Paris
            </div>
            <div className="event-timeline">
              <div className="timeline-item">
                <span className="time">14h30</span>
                <span className="description">Accueil des invités</span>
              </div>
              <div className="timeline-item">
                <span className="time">15h00</span>
                <span className="description">Cérémonie civile</span>
              </div>
              <div className="timeline-item">
                <span className="time">16h00</span>
                <span className="description">Vin d'honneur</span>
              </div>
            </div>
          </div>
        </div>

        <div className="event-card featured">
          <div className="event-header">
            <h3 className="event-title">Célébration en Corse</h3>
            <span className="event-date">Vendredi 6 - Samedi 7 Juin 2025</span>
          </div>
          <div className="event-content">
            <div className="event-detail">
              <strong>Lieu :</strong> Domaine de Murtoli, Corse-du-Sud
            </div>
            <div className="event-detail">
              <strong>Accès :</strong> Transferts organisés depuis Ajaccio
            </div>

            <div className="day-section">
              <h4>Vendredi 6 Juin</h4>
              <div className="event-timeline">
                <div className="timeline-item">
                  <span className="time">17h00</span>
                  <span className="description">Arrivée et installation</span>
                </div>
                <div className="timeline-item">
                  <span className="time">19h30</span>
                  <span className="description">Cocktail de bienvenue</span>
                </div>
                <div className="timeline-item">
                  <span className="time">20h30</span>
                  <span className="description">Dîner convivial</span>
                </div>
              </div>
            </div>

            <div className="day-section">
              <h4>Samedi 7 Juin</h4>
              <div className="event-timeline">
                <div className="timeline-item">
                  <span className="time">15h00</span>
                  <span className="description">Cérémonie laïque</span>
                </div>
                <div className="timeline-item">
                  <span className="time">16h30</span>
                  <span className="description">Cocktail et photos</span>
                </div>
                <div className="timeline-item">
                  <span className="time">20h00</span>
                  <span className="description">Dîner de gala</span>
                </div>
                <div className="timeline-item">
                  <span className="time">22h30</span>
                  <span className="description">Soirée dansante</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="event-header">
            <h3 className="event-title">Brunch du Lendemain</h3>
            <span className="event-date">Dimanche 8 Juin 2025</span>
          </div>
          <div className="event-content">
            <div className="event-detail">
              <strong>Lieu :</strong> Domaine de Murtoli
            </div>
            <div className="event-timeline">
              <div className="timeline-item">
                <span className="time">11h00</span>
                <span className="description">Brunch décontracté</span>
              </div>
              <div className="timeline-item">
                <span className="time">14h00</span>
                <span className="description">Au revoir et bon retour</span>
              </div>
            </div>
            <p className="event-note">
              Un moment convivial pour se remémorer les meilleurs moments du weekend !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Programme;
