import './Infos.css';

function Infos() {
  return (
    <div className="infos">
      <h2 className="page-title">Informations Pratiques</h2>
      <p className="page-intro">
        Tout ce que vous devez savoir pour profiter pleinement de ces moments avec nous
      </p>

      <div className="info-sections">
        <section className="info-section">
          <h3 className="section-title">🏨 Hébergement</h3>
          <div className="section-content">
            <p>
              Pour le weekend en Corse, nous avons réservé des hébergements au
              Domaine de Murtoli pour tous nos invités.
            </p>
            <ul>
              <li>Chambres doubles et familiales disponibles</li>
              <li>Petit-déjeuner inclus</li>
              <li>Piscine et accès à la plage privée</li>
            </ul>
            <p className="info-note">
              Les détails de votre hébergement vous seront communiqués après confirmation
              de votre présence via le formulaire RSVP.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">✈️ Comment venir</h3>
          <div className="section-content">
            <h4>Pour la mairie à Paris</h4>
            <p>
              <strong>Adresse :</strong> Mairie du 15ème, 31 Rue Péclet, 75015 Paris
            </p>
            <p>
              <strong>Métro :</strong> Ligne 12 - Station Vaugirard
            </p>

            <h4>Pour la Corse</h4>
            <p>
              <strong>Aéroport :</strong> Ajaccio Napoléon Bonaparte (AJA)
            </p>
            <p>
              Vols directs disponibles depuis Paris, Lyon, Marseille, Nice et d'autres villes.
            </p>
            <p className="info-note">
              Des navettes seront organisées depuis l'aéroport d'Ajaccio jusqu'au domaine.
              Horaires communiqués ultérieurement.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">👗 Dress Code</h3>
          <div className="section-content">
            <h4>Mairie (28 Mai)</h4>
            <p>Tenue de ville élégante</p>

            <h4>Weekend en Corse (6-7 Juin)</h4>
            <ul>
              <li><strong>Vendredi soir :</strong> Tenue décontractée chic</li>
              <li><strong>Samedi cérémonie :</strong> Tenue de soirée
                <br /><em>Couleurs suggérées : tons pastel, beige, terracotta</em>
                <br /><em>À éviter : blanc, ivoire</em>
              </li>
              <li><strong>Dimanche brunch :</strong> Tenue décontractée</li>
            </ul>
            <p className="info-note">
              Le terrain peut être en herbe, prévoyez des chaussures adaptées !
            </p>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">🌤️ Météo & Conseils</h3>
          <div className="section-content">
            <p>
              <strong>Températures attendues en juin en Corse :</strong> 20-28°C
            </p>
            <ul>
              <li>Prévoir de la crème solaire</li>
              <li>Lunettes de soleil recommandées</li>
              <li>Un châle ou veste légère pour la soirée</li>
              <li>Maillot de bain pour profiter de la piscine</li>
            </ul>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">👶 Enfants</h3>
          <div className="section-content">
            <p>
              Les enfants sont les bienvenus à tous nos événements !
            </p>
            <ul>
              <li>Menu enfant disponible</li>
              <li>Animations prévues pendant la soirée</li>
              <li>Lits bébé disponibles sur demande</li>
            </ul>
            <p className="info-note">
              Merci de nous indiquer le nombre d'enfants dans le formulaire RSVP.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">🍽️ Allergies & Régimes</h3>
          <div className="section-content">
            <p>
              Nous souhaitons que chacun puisse profiter pleinement des repas.
            </p>
            <p className="info-note">
              N'oubliez pas de nous signaler vos restrictions alimentaires,
              allergies ou régimes spéciaux dans le formulaire RSVP.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h3 className="section-title">📸 Photos & Réseaux Sociaux</h3>
          <div className="section-content">
            <p>
              Un photographe professionnel sera présent pour immortaliser ces moments.
            </p>
            <p>
              Nous vous encourageons à prendre vos propres photos et à les partager
              avec le hashtag :
            </p>
            <p className="hashtag">#AliceEtMarc2025</p>
          </div>
        </section>

        <section className="info-section highlight">
          <h3 className="section-title">📞 Contact</h3>
          <div className="section-content">
            <p>
              Pour toute question ou information complémentaire, n'hésitez pas à nous contacter :
            </p>
            <p>
              <strong>Email :</strong>{' '}
              <a href="mailto:contact@aliceetmarc.fr">contact@aliceetmarc.fr</a>
            </p>
            <p>
              <strong>Téléphone :</strong> +33 6 XX XX XX XX
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Infos;
