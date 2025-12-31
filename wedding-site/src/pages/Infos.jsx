import { useState } from 'react'
import './Infos.css'

const LOCATIONS = {
  palombaggia: {
    name: 'Plage Da Mare',
    address: 'Palombaggia, Porto-Vecchio 20137',
    addressLink: 'https://www.google.com/maps/dir/?api=1&destination=Plage+Da+Mare+Palombaggia+Porto-Vecchio',
    lat: 42.5897,
    lng: 9.3020,
    description: 'Cérémonie - Samedi 6 juin à 17h30',
    image: '/damare.jpg'
  },
  bonifacio: {
    name: 'Plage La Boheme',
    address: 'Bonifacio 20169',
    addressLink: 'https://www.google.com/maps/dir/?api=1&destination=Plage+La+Boheme+Bonifacio',
    lat: 41.3922,
    lng: 9.1575,
    description: 'Brunch - Dimanche 7 juin à 11h30',
    image: '/la-boheme-bonifacio-photo-google-1-1753279872_2.jpg'
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

const ACTIVITIES = {
  portoVecchio: {
    title: 'Les Incontournables de Porto-Vecchio',
    sections: [
      {
        title: 'Visiter la vieille ville de Porto-Vecchio',
        link: 'https://maps.app.goo.gl/fzzKiJxPVL3KW71x7',
        linkText: 'Localisation : place de la République'
      },
      {
        title: 'Les plus belles plages de Porto-Vecchio',
        items: [
          { name: 'Plage de Santa Giulia', link: 'https://maps.app.goo.gl/eVqDkbTjTaBf5g3n7', linkText: 'parking' },
          { name: 'Plage de Palombaggia', link: 'https://maps.app.goo.gl/YC7qbGrw6GN6jt7Q9', linkText: 'parking' },
          { name: 'Plage de Rondinara', link: 'https://maps.app.goo.gl/aZMKRPEi7ELn99Vz8', linkText: 'parking' },
          { name: 'Plage de Fautea', link: 'https://maps.app.goo.gl/NW6E7h4g43o1eXz79', linkText: 'parking' }
        ]
      },
      {
        title: 'Randonnées :',
        items: [
          {
            name: 'Randonnée de la Piscia di Gallu',
            details: [
              { label: 'Point de départ de la randonnée', link: 'https://maps.app.goo.gl/sT8P8uqnqNbPNs768', linkText: 'parking Piscia di Gallu' },
              { label: 'Niveau de difficulté', value: 'modéré' },
              { label: 'Nombre de kilomètres', value: '4,8km' },
              { label: 'Durée de la randonnée', value: '2 à 3 h' }
            ]
          },
          {
            name: 'Belle boucle dans la baie de Saint Cyprien',
            details: [
              { label: 'Point de départ de la randonnée', link: 'https://maps.app.goo.gl/K5g5vPCeVs2HmwUD7', linkText: 'Piazza Di a Marina' },
              { label: 'Niveau de difficulté', value: 'facile' },
              { label: 'Nombre de kilomètres', value: '6,2 km' },
              { label: 'Durée de la randonnée', value: '2h' }
            ]
          }
        ]
      }
    ]
  },
  bonifacio: {
    title: 'Les Incontournables de Bonifacio',
    sections: [
      {
        title: 'La citadelle de Bonifacio',
        link: 'https://maps.app.goo.gl/9vqrj7JQYK8QKHYK6',
        linkText: 'Localisation : citadelle de Bonifacio'
      },
      {
        title: 'La chapelle Saint-Roch',
        link: 'https://maps.app.goo.gl/p3EXGxgWz7S1x3x19',
        linkText: 'Localisation : chapelle Saint-Roch',
        description: 'Depuis le port, vous trouverez un escalier pour vous rendre à la chapelle Saint-Roch ! Ça grimpe ! Mais ça vaut clairement le coup, on vous l\'assure ! La vue depuis la chapelle Saint-Roch est absolument incroyable'
      },
      {
        title: 'Le sentier du Littoral de Bonifacio',
        link: 'https://maps.app.goo.gl/7V37SDKU8MsjkD5r6',
        linkText: 'Localisation : sentier du Campu Rumanilu et Pertusato',
        description: 'Pour les amateurs de marche, le sentier du Campu Rumanilu ou le chemin de Pertusato vous permettront de longer les falaises et d\'admirer des panoramas spectaculaires.'
      },
      {
        title: 'Les plus belles plages autour de Bonifacio',
        items: [
          { name: 'La plage de Saint-Antoine', link: 'https://maps.app.goo.gl/vRSX7RJp8Z8ZJhJ29', linkText: 'parking' },
          { name: 'Plage de Paragan et Fazzio', link: 'https://maps.app.goo.gl/6h2gf1GD2MQ3W6hM6', linkText: 'parking' },
          { name: 'Plages du Petit et du Grand Spérone et baie de Piantarella', link: 'https://maps.app.goo.gl/aKB1pNVkeDjR93TH6', linkText: 'parking' }
        ]
      }
    ]
  },
  restaurants: {
    title: 'The Restaurants',
    subtitle: 'Porto Vecchio',
    sections: [
      {
        title: 'Restaurant de plages :',
        subtitle: 'Plages de Saint Cyprien',
        items: [
          { name: 'Le cabanon Bleu', link: 'https://maps.app.goo.gl/DVjXqNvj7kU6sn8S8' },
          { name: 'Le tiki', link: 'https://maps.app.goo.gl/AQNUm6Bf47JCLQKX6' }
        ]
      },
      {
        subtitle: 'Plages de Palombaggia',
        items: [
          { name: 'Playa Baggia', link: 'https://maps.app.goo.gl/LfH6cqxXAD5xvWry5' },
          { name: 'Le Palm Beach', link: 'https://maps.app.goo.gl/cRWcGDCvXnZh9PJ38' }
        ]
      },
      {
        subtitle: 'Sur la baie de Santa Giulia',
        items: [
          { name: 'Le Bar Plage', link: 'https://maps.app.goo.gl/vLx4jQXefh4XhB3BA' }
        ]
      },
      {
        title: 'Restaurants traditionels',
        items: [
          { name: 'Restaurant Bar de la guitare', link: 'https://maps.app.goo.gl/XPWHuFzKHm1JfBzaA' },
          { name: 'Restaurant U cantonu', link: 'https://maps.app.goo.gl/vRYaYhtdCMhEW6dc8' },
          { name: 'L\'Alivi', link: 'https://maps.app.goo.gl/8yXG5KsVMCbVzMSV7' },
          { name: 'Costa Marina', link: 'https://maps.app.goo.gl/bkzuoP7i4zc8z2dn9' },
          { name: 'Terramea', link: 'https://maps.app.goo.gl/7RqRSZKW2mSBCqpP8' },
          { name: 'L\'Ondella', link: 'https://maps.app.goo.gl/4C7v7ZPSR8XJkrns8' },
          { name: 'Le Figuier', link: 'https://maps.app.goo.gl/DXqCFWCTAKLVjKxR9' }
        ]
      }
    ]
  }
}

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
                      <div className="location-header">
                        <div className="location-info-text">
                          <h3>{location.name}</h3>
                          {location.addressLink ? (
                            <a href={location.addressLink} target="_blank" rel="noopener noreferrer" className="address-link">
                              {location.address}
                            </a>
                          ) : (
                            <p className="address">{location.address}</p>
                          )}
                          <p className="description">{location.description}</p>
                        </div>
                        {location.image && (
                          <div className="location-image">
                            <img src={location.image} alt={location.name} />
                          </div>
                        )}
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
                    <p className="distance"><img src="/ifa-f9-6952180_640 copy.webp" alt="car" className="car-icon" /> {hotel.distance}</p>
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
                    <p className="distance"><img src="/ifa-f9-6952180_640 copy.webp" alt="car" className="car-icon" /> {residence.distance}</p>
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
              <div className="activities-framed-grid">
                <div className="framed-card">
                  <div className="framed-card-content">
                    <h2 className="framed-title">
                      <img src="/the-text.png" alt="the" className="the-logo-img" />
                      {ACTIVITIES.portoVecchio.title.toUpperCase()}
                    </h2>

                    {ACTIVITIES.portoVecchio.sections.map((section, idx) => (
                      <div key={idx} className="framed-section">
                        <h3 className="section-title-framed">{section.title}</h3>
                        {section.link && (
                          <a href={section.link} target="_blank" rel="noopener noreferrer" className="location-link">
                            {section.linkText}
                          </a>
                        )}
                        {section.description && (
                          <p className="section-description">{section.description}</p>
                        )}
                        {section.items && (
                          <div className="items-list">
                            {section.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="item-entry">
                                {item.name && <div className="item-name">{item.name}</div>}
                                {item.link && (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link">
                                    {item.linkText}
                                  </a>
                                )}
                                {item.details && (
                                  <div className="item-details">
                                    {item.details.map((detail, detailIdx) => (
                                      <div key={detailIdx} className="detail-row">
                                        <span className="detail-label">{detail.label} : </span>
                                        {detail.link ? (
                                          <a href={detail.link} target="_blank" rel="noopener noreferrer" className="detail-link">
                                            {detail.linkText}
                                          </a>
                                        ) : (
                                          <span className="detail-value">{detail.value}</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="framed-card">
                  <div className="framed-card-content">
                    <h2 className="framed-title">
                      <img src="/the-text.png" alt="the" className="the-logo-img" />
                      {ACTIVITIES.bonifacio.title.toUpperCase()}
                    </h2>

                    {ACTIVITIES.bonifacio.sections.map((section, idx) => (
                      <div key={idx} className="framed-section">
                        <h3 className="section-title-framed">{section.title}</h3>
                        {section.link && (
                          <a href={section.link} target="_blank" rel="noopener noreferrer" className="location-link">
                            {section.linkText}
                          </a>
                        )}
                        {section.description && (
                          <p className="section-description">{section.description}</p>
                        )}
                        {section.items && (
                          <div className="items-list">
                            {section.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="item-entry">
                                <div className="item-name">{item.name}</div>
                                {item.link && (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link">
                                    {item.linkText}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="framed-card">
                  <div className="framed-card-content">
                    <h2 className="framed-title">
                      <img src="/the-text.png" alt="the" className="the-logo-img" />
                      {ACTIVITIES.restaurants.title.toUpperCase().replace('THE ', '')}
                    </h2>
                    <h3 className="framed-subtitle">{ACTIVITIES.restaurants.subtitle}</h3>

                    {ACTIVITIES.restaurants.sections.map((section, idx) => (
                      <div key={idx} className="framed-section">
                        {section.title && <h3 className="section-title-framed">{section.title}</h3>}
                        {section.subtitle && <h4 className="section-subtitle-framed">{section.subtitle}</h4>}
                        {section.items && (
                          <div className="items-list">
                            {section.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="item-entry restaurant-entry">
                                {item.link ? (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="restaurant-link">
                                    {item.name}
                                  </a>
                                ) : (
                                  <span className="item-name">{item.name}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
