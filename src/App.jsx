import { useState } from 'react'
import { supabase, hasSupabaseConfig } from './supabaseClient'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: 'yes',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!hasSupabaseConfig) {
      setError('Configuration error: Supabase credentials are missing. Please check your environment variables.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data, error: insertError } = await supabase
        .from('rsvps_simple')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            guests: parseInt(formData.guests),
            attendance: formData.attendance,
            message: formData.message.trim() || null
          }
        ])
        .select()

      if (insertError) {
        if (insertError.code === '42501') {
          throw new Error('Permission denied: Unable to submit RSVP. Please contact the administrator to enable anonymous submissions.')
        } else if (insertError.code === '23514') {
          throw new Error('Invalid data: Please check that the number of guests is between 1 and 10.')
        } else {
          throw new Error(`Database error: ${insertError.message}`)
        }
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        guests: '1',
        attendance: 'yes',
        message: ''
      })

      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      if (err.message.includes('fetch')) {
        setError('Network error: Unable to connect to the server. Please check your internet connection and try again.')
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!hasSupabaseConfig) {
    return (
      <div className="container">
        <div className="card">
          <h1>⚠️ Configuration Error</h1>
          <div className="error-message">
            <p><strong>Missing Supabase Configuration</strong></p>
            <p>Please set the following environment variables:</p>
            <ul style={{ textAlign: 'left', marginTop: '10px' }}>
              <li><code>VITE_SUPABASE_URL</code></li>
              <li><code>VITE_SUPABASE_ANON_KEY</code></li>
            </ul>
            <p style={{ marginTop: '15px', fontSize: '14px' }}>
              See the README.md file for setup instructions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h1>RSVP Form</h1>
        <p className="subtitle">Please let us know if you can attend</p>

        {success && (
          <div className="success-message">
            ✓ Thank you! Your RSVP has been submitted successfully.
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              Number of Guests <span className="required">*</span>
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="attendance">
              Will you attend? <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Yes, I'll be there</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Sorry, can't make it</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requests or dietary restrictions?"
              rows="4"
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit RSVP'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
