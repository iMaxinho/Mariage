import './Cadeaux.css'

export default function Cadeaux() {
  return (
    <div className="cadeaux">
      <div className="cadeaux-container">
        <h1 className="page-title">Liste de Cadeaux</h1>

        <div className="placeholder-card">
          <h2>En cours de préparation</h2>
          <p>Notre liste de cadeaux sera disponible très bientôt.</p>
          <p className="subtitle">Revenez nous voir dans quelques jours !</p>
        </div>
      </div>
    </div>
  )
}
