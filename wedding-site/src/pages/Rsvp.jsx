import { useState, useEffect } from 'react'
import { supabase, hasValidConfig } from '../lib/supabase'
import './Rsvp.css'

export default function Rsvp() {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    attending_mairie: false,
    guests_mairie: 1,
    attending_corse: false,
    guests_corse: 1,
    attending_brunch: false,
    guests_brunch: 1,
    plus_one_name: '',
    dietary_restrictions: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    if (!hasValidConfig()) {
      setConfigError(true)
      console.error('❌ Supabase configuration is missing or invalid')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    if (!hasValidConfig()) {
      setSubmitStatus({
        type: 'error',
        message: 'Configuration Supabase manquante. Veuillez contacter l\'administrateur.'
      })
      setIsSubmitting(false)
      console.error('❌ Cannot submit: Supabase configuration is missing')
      return
    }

    if (!formData.guest_name.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez entrer votre nom.'
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez entrer votre email.'
      })
      setIsSubmitting(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez entrer un email valide.'
      })
      setIsSubmitting(false)
      return
    }

    try {
      console.log('📤 Submitting RSVP...')
      console.log('Form data:', {
        guest_name: formData.guest_name,
        email: formData.email,
        attending_mairie: formData.attending_mairie,
        guests_mairie: formData.guests_mairie,
        attending_corse: formData.attending_corse,
        guests_corse: formData.guests_corse,
        attending_brunch: formData.attending_brunch,
        guests_brunch: formData.guests_brunch
      })

      const rsvpData = {
        guest_name: formData.guest_name.trim(),
        email: formData.email.trim(),
        attending_mairie: formData.attending_mairie,
        guests_mairie: formData.guests_mairie,
        attending_corse: formData.attending_corse,
        guests_corse: formData.guests_corse,
        attending_brunch: formData.attending_brunch,
        guests_brunch: formData.guests_brunch,
        plus_one_name: formData.plus_one_name?.trim() || null,
        dietary_restrictions: formData.dietary_restrictions?.trim() || null,
        message: formData.message?.trim() || null
      }

      console.log('📊 RSVP data to insert:', rsvpData)

      const { data, error } = await supabase
        .from('rsvps')
        .insert([rsvpData])
        .select()

      console.log('📥 Response from Supabase:', { data, error })

      if (error) {
        console.error('❌ Supabase Error Details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      if (!data || data.length === 0) {
        console.error('❌ No data returned after insert')
        throw new Error('Aucune donnée retournée après l\'insertion')
      }

      const attendingAny = formData.attending_mairie || formData.attending_corse || formData.attending_brunch

      console.log('✅ RSVP submitted successfully')
      setSubmitStatus({
        type: 'success',
        message: attendingAny
          ? 'Merci pour votre confirmation! Nous avons hâte de célébrer avec vous!'
          : 'Merci de nous avoir informés.'
      })
      setFormData({
        guest_name: '',
        email: '',
        attending_mairie: false,
        guests_mairie: 1,
        attending_corse: false,
        guests_corse: 1,
        attending_brunch: false,
        guests_brunch: 1,
        plus_one_name: '',
        dietary_restrictions: '',
        message: ''
      })
    } catch (error) {
      console.error('❌ Full error object:', error)
      console.error('❌ Error stack:', error.stack)

      let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.'

      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        errorMessage = 'Impossible de contacter le serveur. Veuillez vérifier votre connexion internet et que Supabase est configuré correctement.'
        console.error('❌ Network error - check Supabase configuration in .env file')
        console.error('Required env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
      } else if (error.code === 'PGRST301') {
        errorMessage = 'Erreur de configuration: la table rsvps n\'existe pas. Veuillez exécuter les migrations SQL.'
        console.error('❌ Table does not exist - run migration script')
      } else if (error.code === 'PGRST116') {
        errorMessage = 'Erreur de permission: impossible d\'insérer les données. Veuillez vérifier les politiques RLS.'
        console.error('❌ RLS policy prevents insert - check policies')
      } else if (error.code === '23514') {
        errorMessage = 'Le nombre d\'invités doit être entre 0 et 10 pour chaque événement.'
        console.error('❌ Check constraint violation - guest count out of range')
      } else if (error.message) {
        errorMessage = error.message
        console.error('❌ Error message:', error.message)
      } else if (error.error_description) {
        errorMessage = error.error_description
        console.error('❌ Error description:', error.error_description)
      }

      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const anyEventSelected = formData.attending_mairie || formData.attending_corse || formData.attending_brunch

  return (
    <div className="rsvp">
      <section className="rsvp-header">
        <h1>Confirmez votre présence</h1>
        <p>Merci de nous indiquer à quels événements vous pourrez vous joindre à nous</p>
      </section>

      <section className="rsvp-content">
        {configError && (
          <div className="submit-status error" style={{ marginBottom: '20px' }}>
            Configuration manquante. Veuillez contacter l'administrateur du site.
          </div>
        )}

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-section">
            <h2 className="section-title">Vos coordonnées</h2>

            <div className="form-group">
              <label htmlFor="guest_name">Nom complet *</label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleChange}
                required
                placeholder="Ex: Jean et Marie Dupont"
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
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Événements</h2>
            <p className="section-description">Cochez les événements auxquels vous pourrez participer</p>

            <div className="event-checkbox-group">
              <div className="event-checkbox">
                <input
                  type="checkbox"
                  id="attending_mairie"
                  name="attending_mairie"
                  checked={formData.attending_mairie}
                  onChange={handleChange}
                />
                <label htmlFor="attending_mairie" className="event-label">
                  <div className="event-info">
                    <strong>Mairie de Neuilly-sur-Seine</strong>
                    <span>28 Mai 2026 - 15h00</span>
                  </div>
                </label>
              </div>

              {formData.attending_mairie && (
                <div className="nested-input">
                  <label htmlFor="guests_mairie">Nombre de personnes</label>
                  <input
                    type="number"
                    id="guests_mairie"
                    name="guests_mairie"
                    value={formData.guests_mairie}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </div>

            <div className="event-checkbox-group">
              <div className="event-checkbox">
                <input
                  type="checkbox"
                  id="attending_corse"
                  name="attending_corse"
                  checked={formData.attending_corse}
                  onChange={handleChange}
                />
                <label htmlFor="attending_corse" className="event-label">
                  <div className="event-info">
                    <strong>Cérémonie en Corse</strong>
                    <span>Samedi 6 Juin 2026 - 17h30</span>
                  </div>
                </label>
              </div>

              {formData.attending_corse && (
                <div className="nested-input">
                  <label htmlFor="guests_corse">Nombre de personnes</label>
                  <input
                    type="number"
                    id="guests_corse"
                    name="guests_corse"
                    value={formData.guests_corse}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </div>

            <div className="event-checkbox-group">
              <div className="event-checkbox">
                <input
                  type="checkbox"
                  id="attending_brunch"
                  name="attending_brunch"
                  checked={formData.attending_brunch}
                  onChange={handleChange}
                />
                <label htmlFor="attending_brunch" className="event-label">
                  <div className="event-info">
                    <strong>Brunch du lendemain</strong>
                    <span>Dimanche 7 Juin 2026 - 12h30</span>
                  </div>
                </label>
              </div>

              {formData.attending_brunch && (
                <div className="nested-input">
                  <label htmlFor="guests_brunch">Nombre de personnes</label>
                  <input
                    type="number"
                    id="guests_brunch"
                    name="guests_brunch"
                    value={formData.guests_brunch}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </div>
          </div>

          {anyEventSelected && (
            <div className="form-section">
              <h2 className="section-title">Informations complémentaires</h2>

              <div className="form-group">
                <label htmlFor="plus_one_name">Nom de votre accompagnant(e)</label>
                <input
                  type="text"
                  id="plus_one_name"
                  name="plus_one_name"
                  value={formData.plus_one_name}
                  onChange={handleChange}
                  placeholder="Si vous venez accompagné(e)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dietary_restrictions">Restrictions alimentaires</label>
                <input
                  type="text"
                  id="dietary_restrictions"
                  name="dietary_restrictions"
                  value={formData.dietary_restrictions}
                  onChange={handleChange}
                  placeholder="Allergies, régimes spéciaux..."
                />
              </div>
            </div>
          )}

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="message">Message (optionnel)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Un petit mot pour les mariés..."
                rows="4"
              ></textarea>
            </div>
          </div>

          {submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma réponse'}
          </button>
        </form>

        <div className="rsvp-info">
          <div className="info-card">
            <h3>Date limite</h3>
            <p>Merci de confirmer votre présence avant le <strong>15 janvier 2026</strong></p>
          </div>

          <div className="info-card highlight">
            <h3>Important</h3>
            <p>Veuillez indiquer précisément le nombre de personnes pour chaque événement. Cela nous aidera pour l'organisation.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
