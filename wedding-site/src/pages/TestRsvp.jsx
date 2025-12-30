import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function TestRsvp() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult(null)

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('count')
        .limit(1)

      if (error) {
        setResult({
          success: false,
          message: 'Erreur de connexion',
          error: error
        })
      } else {
        setResult({
          success: true,
          message: 'Connexion réussie'
        })
      }
    } catch (err) {
      setResult({
        success: false,
        message: 'Exception',
        error: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  const testInsert = async () => {
    setLoading(true)
    setResult(null)

    try {
      const testData = {
        guest_name: 'Test ' + Date.now(),
        email: 'test@test.com',
        attending_mairie: true,
        guests_mairie: 1,
        attending_corse: false,
        guests_corse: 0,
        attending_brunch: false,
        guests_brunch: 0,
        plus_one_name: '',
        dietary_restrictions: '',
        message: 'Test message'
      }

      const { data, error } = await supabase
        .from('rsvps')
        .insert([testData])
        .select()

      if (error) {
        setResult({
          success: false,
          message: 'Erreur d\'insertion',
          error: error
        })
      } else {
        setResult({
          success: true,
          message: 'Insertion réussie',
          data: data
        })
      }
    } catch (err) {
      setResult({
        success: false,
        message: 'Exception',
        error: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'monospace' }}>
      <h1>Test Supabase Connection</h1>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
        <p><strong>Supabase Key présente:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Oui' : 'Non'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={testConnection}
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Tester la connexion
        </button>

        <button
          onClick={testInsert}
          disabled={loading}
          style={{ padding: '10px 20px' }}
        >
          Tester l'insertion
        </button>
      </div>

      {loading && <p>Chargement...</p>}

      {result && (
        <div style={{
          padding: '20px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h3>{result.message}</h3>
          {result.error && (
            <div>
              <h4>Détails de l'erreur:</h4>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {JSON.stringify(result.error, null, 2)}
              </pre>
            </div>
          )}
          {result.data && (
            <div>
              <h4>Données:</h4>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
