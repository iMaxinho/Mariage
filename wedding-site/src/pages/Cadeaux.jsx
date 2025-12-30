import './Cadeaux.css';

function Cadeaux() {
  return (
    <div className="cadeaux">
      <h2 className="page-title">Liste de Mariage</h2>
      <p className="page-intro">
        Votre présence à nos côtés est le plus beau des cadeaux
      </p>

      <div className="gift-content">
        <section className="gift-section main-message">
          <p className="main-text">
            Si vous souhaitez nous faire plaisir, nous avons quelques suggestions pour vous aider.
            Mais sachez que votre présence et votre amitié sont ce qui compte le plus pour nous !
          </p>
        </section>

        <section className="gift-section">
          <h3 className="gift-title">🌍 Voyage de Noces</h3>
          <div className="gift-description">
            <p>
              Nous prévoyons un voyage de noces au Japon au printemps prochain.
              Si vous souhaitez contribuer à ce voyage, une cagnotte en ligne est disponible.
            </p>
            <button className="gift-button" disabled>
              Accéder à la cagnotte
              <span className="coming-soon">Lien à venir</span>
            </button>
          </div>
        </section>

        <section className="gift-section">
          <h3 className="gift-title">🏡 Notre Nouveau Chez-Nous</h3>
          <div className="gift-description">
            <p>
              Nous avons également créé une liste de mariage pour équiper notre futur foyer.
              Vous y trouverez des idées variées pour tous les budgets.
            </p>
            <button className="gift-button" disabled>
              Voir la liste de mariage
              <span className="coming-soon">Lien à venir</span>
            </button>
          </div>
        </section>

        <section className="gift-section alternative">
          <h3 className="gift-title">💝 Une Autre Idée ?</h3>
          <div className="gift-description">
            <p>
              Bien sûr, si vous préférez nous offrir autre chose, nous serons tout aussi touchés.
              L'essentiel est de partager ce moment avec vous !
            </p>
          </div>
        </section>

        <section className="gift-section note">
          <p className="gift-note">
            📮 Si vous préférez offrir un cadeau physique, vous pourrez le déposer
            lors du weekend en Corse. Un espace sera prévu à cet effet.
          </p>
        </section>

        <section className="gift-section contact">
          <p>
            Pour toute question concernant la liste de mariage, n'hésitez pas à nous contacter :
          </p>
          <p>
            <a href="mailto:contact@aliceetmarc.fr">contact@aliceetmarc.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Cadeaux;
