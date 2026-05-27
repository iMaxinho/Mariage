import './Cadeaux.css'

export default function Cadeaux() {
  return (
    <div className="cadeaux">
      <div className="cadeaux-container">
        <h1 className="page-title">Liste de Cadeaux</h1>

        <div className="cadeaux-intro">
          <p>
            Votre présence à nos côtés est le plus beau des cadeaux. Si toutefois vous souhaitez nous gâter, nous avons préparé une liste avec quelques idées qui nous tiendraient à cœur.
          </p>
        </div>

        <div className="cadeaux-card">
          <div className="cadeaux-card-content">
            <div className="cadeaux-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12V22H4V12" stroke="#8b9d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7H2V12H22V7Z" stroke="#8b9d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V7" stroke="#8b9d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="#8b9d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="#8b9d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Notre liste sur Mes Envies</h2>
            <p>Retrouvez notre sélection de cadeaux sur la plateforme Mes Envies.</p>
            <a
              href="https://www.mesenvies.fr/liste-mariage?r=39&led=32924518"
              target="_blank"
              rel="noopener noreferrer"
              className="cadeaux-btn"
            >
              Voir notre liste de cadeaux
            </a>
          </div>
        </div>

        <p className="cadeaux-note">
          Un grand merci pour votre générosité et votre amour.
        </p>
      </div>
    </div>
  )
}
