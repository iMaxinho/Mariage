import { useState, useEffect } from 'react';
import './TestRsvp.css';

function TestRsvp() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRsvps();
  }, []);

  const fetchRsvps = async () => {
    try {
      const response = await fetch('/api/get-rsvps');
      if (response.ok) {
        const data = await response.json();
        setRsvps(data);
      } else {
        setError('Erreur lors du chargement des réponses');
      }
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="test-rsvp">
        <div className="loading">Chargement des réponses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-rsvp">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const stats = {
    total: rsvps.length,
    mairie: rsvps.filter(r => r.mairie_attending).length,
    corse: rsvps.filter(r => r.corse_attending).length,
    brunch: rsvps.filter(r => r.brunch_attending).length,
    totalGuests: {
      mairie: rsvps.reduce((sum, r) => sum + (r.mairie_attending ? r.mairie_guests : 0), 0),
      corse: rsvps.reduce((sum, r) => sum + (r.corse_attending ? r.corse_guests : 0), 0),
      brunch: rsvps.reduce((sum, r) => sum + (r.brunch_attending ? r.brunch_guests : 0), 0)
    }
  };

  return (
    <div className="test-rsvp">
      <h2 className="page-title">Réponses RSVP</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Réponses totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.mairie}</div>
          <div className="stat-label">Mairie</div>
          <div className="stat-guests">{stats.totalGuests.mairie} invités</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-number">{stats.corse}</div>
          <div className="stat-label">Corse</div>
          <div className="stat-guests">{stats.totalGuests.corse} invités</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.brunch}</div>
          <div className="stat-label">Brunch</div>
          <div className="stat-guests">{stats.totalGuests.brunch} invités</div>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <div className="no-rsvps">
          <p>Aucune réponse pour le moment</p>
        </div>
      ) : (
        <div className="rsvps-list">
          {rsvps.map((rsvp) => (
            <div key={rsvp.id} className="rsvp-card">
              <div className="rsvp-header">
                <h3>{rsvp.name}</h3>
                <span className="rsvp-email">{rsvp.email}</span>
              </div>

              <div className="rsvp-events">
                {rsvp.mairie_attending && (
                  <div className="event-badge">
                    Mairie ({rsvp.mairie_guests} {rsvp.mairie_guests > 1 ? 'personnes' : 'personne'})
                  </div>
                )}
                {rsvp.corse_attending && (
                  <div className="event-badge highlight">
                    Corse ({rsvp.corse_guests} {rsvp.corse_guests > 1 ? 'personnes' : 'personne'})
                  </div>
                )}
                {rsvp.brunch_attending && (
                  <div className="event-badge">
                    Brunch ({rsvp.brunch_guests} {rsvp.brunch_guests > 1 ? 'personnes' : 'personne'})
                  </div>
                )}
              </div>

              {rsvp.plus_one && (
                <div className="rsvp-detail">
                  <strong>Accompagné(e)</strong>
                </div>
              )}

              {rsvp.dietary_restrictions && (
                <div className="rsvp-detail">
                  <strong>Restrictions alimentaires :</strong> {rsvp.dietary_restrictions}
                </div>
              )}

              {rsvp.message && (
                <div className="rsvp-message">
                  <strong>Message :</strong> {rsvp.message}
                </div>
              )}

              <div className="rsvp-date">
                Reçu le {new Date(rsvp.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestRsvp;
