import { useState } from 'react';
import './Rsvp.css';

function Rsvp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plusOne: false,
    dietary_restrictions: '',
    message: '',
    mairie_attending: false,
    mairie_guests: 1,
    corse_attending: false,
    corse_guests: 1,
    brunch_attending: false,
    brunch_guests: 1
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Merci ! Votre réponse a été enregistrée avec succès.' });
        setFormData({
          name: '',
          email: '',
          plusOne: false,
          dietary_restrictions: '',
          message: '',
          mairie_attending: false,
          mairie_guests: 1,
          corse_attending: false,
          corse_guests: 1,
          brunch_attending: false,
          brunch_guests: 1
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus({
          type: 'error',
          message: errorData.error || 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erreur de connexion. Veuillez vérifier votre connexion internet.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rsvp">
      <h2 className="page-title">Confirmez votre présence</h2>
      <p className="page-intro">
        Merci de remplir ce formulaire avant le 1er avril 2025
      </p>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Vos informations</h3>

          <div className="form-group">
            <label htmlFor="name">Nom et Prénom *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jean Dupont"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jean.dupont@email.com"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="plusOne"
                checked={formData.plusOne}
                onChange={handleChange}
              />
              <span>Je viendrai accompagné(e)</span>
            </label>
          </div>
        </div>

        <div className="form-section events-section">
          <h3>À quels événements participerez-vous ?</h3>

          <div className="event-card">
            <div className="event-header-form">
              <label className="event-checkbox">
                <input
                  type="checkbox"
                  name="mairie_attending"
                  checked={formData.mairie_attending}
                  onChange={handleChange}
                />
                <span className="event-name">Mairie - 28 Mai 2025</span>
              </label>
            </div>
            {formData.mairie_attending && (
              <div className="guests-input">
                <label htmlFor="mairie_guests">Nombre de personnes :</label>
                <input
                  type="number"
                  id="mairie_guests"
                  name="mairie_guests"
                  min="1"
                  max="10"
                  value={formData.mairie_guests}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="event-card featured">
            <div className="event-header-form">
              <label className="event-checkbox">
                <input
                  type="checkbox"
                  name="corse_attending"
                  checked={formData.corse_attending}
                  onChange={handleChange}
                />
                <span className="event-name">Weekend en Corse - 6-7 Juin 2025</span>
              </label>
            </div>
            {formData.corse_attending && (
              <div className="guests-input">
                <label htmlFor="corse_guests">Nombre de personnes :</label>
                <input
                  type="number"
                  id="corse_guests"
                  name="corse_guests"
                  min="1"
                  max="10"
                  value={formData.corse_guests}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="event-card">
            <div className="event-header-form">
              <label className="event-checkbox">
                <input
                  type="checkbox"
                  name="brunch_attending"
                  checked={formData.brunch_attending}
                  onChange={handleChange}
                />
                <span className="event-name">Brunch - 8 Juin 2025</span>
              </label>
            </div>
            {formData.brunch_attending && (
              <div className="guests-input">
                <label htmlFor="brunch_guests">Nombre de personnes :</label>
                <input
                  type="number"
                  id="brunch_guests"
                  name="brunch_guests"
                  min="1"
                  max="10"
                  value={formData.brunch_guests}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Informations complémentaires</h3>

          <div className="form-group">
            <label htmlFor="dietary_restrictions">
              Allergies ou restrictions alimentaires
            </label>
            <textarea
              id="dietary_restrictions"
              name="dietary_restrictions"
              value={formData.dietary_restrictions}
              onChange={handleChange}
              rows="3"
              placeholder="Végétarien, sans gluten, allergies..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Un message pour nous ?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Partagez vos souhaits ou questions..."
            />
          </div>
        </div>

        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Envoi en cours...' : 'Confirmer ma présence'}
        </button>
      </form>
    </div>
  );
}

export default Rsvp;
