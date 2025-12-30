import { useState } from 'react'
import './Infos.css'

const LOCATIONS = {
  palombaggia: {
    name: 'Plage Da Mare',
    address: 'Palombaggia, Porto-Vecchio 20137',
    lat: 42.5897,
    lng: 9.3020,
    description: 'Cérémonie - Samedi 6 juin à 18h'
  },
  bonifacio: {
    name: 'Plage La Boheme',
    address: 'Bonifacio 20169',
    lat: 41.3922,
    lng: 9.1575,
    description: 'Brunch - Dimanche 7 juin à 11h30'
  }
}

const HOTELS = [
  {
    id: 1,
    name: 'Les Bergeries de Palombaggia',
    distance: '7 min en voiture',
    website: 'https://hotel-palombaggia.com',
    email: 'contact@bergeries-palombaggia.com',
    discount: '10% Mariage',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Le domaine des Oliviers de Palombaggia',
    distance: '10 min en voiture',
    website: 'https://www.lesoliviersdepalombaggia.fr/',
    rating: 4.3
  },
  {
    id: 3,
    name: 'Hôtel Ambassador Palombaggia',
    distance: '10 min en voiture',
    website: 'http://www.ambassador-palombaggia.com/',
    rating: 4.2
  },
  {
    id: 4,
    name: 'Domaine Santa Giulia Palace',
    distance: '15 min en voiture',
    website: 'https://santa-giulia.net/',
    rating: 4.4
  }
]

const RESIDENCES = [
  {
    id: 1,
    name: 'Les villas de Palombaggia',
    description: 'Location de villas de 2 à 8 personnes',
    distance: '6 min en voiture',
    website: 'https://www.lesvillasdepalombaggia.com/fr',
    rating: 4.4
  },
  {
    id: 2,
    name: 'Résidence Costa Marina',
    description: 'Résidence avec services complètes',
    distance: '8 min en voiture',
    website: 'http://www.residence-costamarina.com/',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Résidence Vasca D\'Oro',
    description: 'Résidence de prestige',
    distance: '12 min en voiture',
    website: 'http://vascadoro.com/',
    rating: 4.3
  }
]

const SERVICES = [
  {
    id: 1,
    category: 'Baby-sitting',
    items: [
      {
        name: 'Babychou Services Corse',
        phone: '+33 4 95 10 50 00',
        description: 'Service de garde d\'enfants à domicile et animations',
        website: 'https://www.babychou.com'
      },
      {
        name: 'Kid & Home Corse',
        phone: '+33 6 12 34 56 78',
        description: 'Baby-sitting qualifié disponible pendant l\'événement'
      }
    ]
  },
  {
    id: 2,
    category: 'Coiffeurs',
    items: [
      {
        name: 'Salon Elegance Porto-Vecchio',
        address: 'Centre ville Porto-Vecchio',
        phone: '+33 4 95 70 12 34',
        description: 'Coiffure et maquillage sur rendez-vous'
      },
      {
        name: 'Beauty & Style',
        address: 'Porto-Vecchio',
        phone: '+33 6 23 45 67 89',
        description: 'Service à domicile disponible pour la journée du mariage'
      }
    ]
  }
]

const ACTIVITIES = [
  {
    id: 1,
    name: 'Bonifacio - Vieille ville',
    type: 'Culture',
    description: 'Découvrez les falaises spectaculaires et la citadelle médiévale',
    duration: 'Demi-journée'
  },
  {
    id: 2,
    name: 'Îles Lavezzi',
    type: 'Nature',
    description: 'Excursion en bateau dans la réserve naturelle',
    duration: 'Journée complète'
  },
  {
    id: 3,
    name: 'Plongée sous-marine',
    type: 'Sport',
    description: 'Explorez les fonds marins exceptionnels de la région',
    duration: '2-3 heures'
  },
  {
    id: 4,
    name: 'Randonnée à Bavella',
    type: 'Nature',
    description: 'Paysages montagneux époustouflants',
    duration: 'Journée'
  }
]

export default function Infos() {
  const [activeTab, setActiveTab] = useState('addresses')
  const [selectedLocation, setSelectedLocation] = useState('palombaggia')

  return (
    <div className="infos">
      <div className="infos-container">
        <h1 className="page-title">Infos Pratiques</h1>

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            Adresses
          </button>
          <button
            className={`tab-button ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hôtels
          </button>
          <button
            className={`tab-button ${activeTab === 'residences' ? 'active' : ''}`}
            onClick={() => setActiveTab('residences')}
          >
            Résidences
          </button>
          <button
            className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activités
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'addresses' && (
            <div className="addresses-section">
              <div className="location-tabs">
                {Object.entries(LOCATIONS).map(([key, location]) => (
                  <button
                    key={key}
                    className={`location-tab ${selectedLocation === key ? 'active' : ''}`}
                    onClick={() => setSelectedLocation(key)}
                  >
                    {location.name}
                  </button>
                ))}
              </div>

              <div className="location-detail">
                {Object.entries(LOCATIONS).map(([key, location]) => (
                  selectedLocation === key && (
                    <div key={key} className="location-info">
                      <div className="location-info-text">
                        <h3>{location.name}</h3>
                        <p className="address">{location.address}</p>
                        <p className="description">{location.description}</p>
                      </div>
                      <div className="map-container">
                        <iframe
                          width="100%"
                          height="400"
                          style={{ border: 0, borderRadius: '8px' }}
                          loading="lazy"
                          allowFullScreen=""
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.5638${Math.random()}!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2s${location.name.replace(/\s+/g, '+')}%20${location.address.replace(/\s+/g, '+')}!5e0!3m2!1sfr!2sfr!4v${Math.random()}`}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="hotels-section">
              <div className="accommodations-grid">
                {HOTELS.map(hotel => (
                  <div key={hotel.id} className="accommodation-card">
                    <div className="card-header">
                      <h3>{hotel.name}</h3>
                      {hotel.discount && (
                        <span className="discount-badge">{hotel.discount}</span>
                      )}
                    </div>
                    <p className="distance">🚗 {hotel.distance}</p>
                    <div className="rating">
                      {'⭐'.repeat(Math.floor(hotel.rating))}
                      <span className="rating-value">{hotel.rating}</span>
                    </div>
                    <div className="card-links">
                      {hotel.website && (
                        <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="link">
                          Site web
                        </a>
                      )}
                      {hotel.email && (
                        <a href={`mailto:${hotel.email}`} className="link">
                          {hotel.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'residences' && (
            <div className="residences-section">
              <div className="accommodations-grid">
                {RESIDENCES.map(residence => (
                  <div key={residence.id} className="accommodation-card">
                    <h3>{residence.name}</h3>
                    <p className="description">{residence.description}</p>
                    <p className="distance">🚗 {residence.distance}</p>
                    <div className="rating">
                      {'⭐'.repeat(Math.floor(residence.rating))}
                      <span className="rating-value">{residence.rating}</span>
                    </div>
                    <div className="card-links">
                      <a href={residence.website} target="_blank" rel="noopener noreferrer" className="link">
                        Site web
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-section">
              {SERVICES.map(service => (
                <div key={service.id} className="service-category">
                  <h2 className="category-title">{service.category}</h2>
                  <div className="service-grid">
                    {service.items.map((item, index) => (
                      <div key={index} className="service-card">
                        <h3>{item.name}</h3>
                        {item.address && <p className="service-address">📍 {item.address}</p>}
                        <p className="service-description">{item.description}</p>
                        {item.phone && (
                          <p className="service-contact">
                            📞 <a href={`tel:${item.phone}`}>{item.phone}</a>
                          </p>
                        )}
                        {item.website && (
                          <a href={item.website} target="_blank" rel="noopener noreferrer" className="link">
                            Site web
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="activities-section">
              <p className="section-intro">
                Profitez de votre séjour en Corse pour découvrir les merveilles de la région
              </p>
              <div className="activities-grid">
                {ACTIVITIES.map(activity => (
                  <div key={activity.id} className="activity-card">
                    <div className="activity-header">
                      <h3>{activity.name}</h3>
                      <span className="activity-type">{activity.type}</span>
                    </div>
                    <p className="activity-description">{activity.description}</p>
                    <p className="activity-duration">⏱️ {activity.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
