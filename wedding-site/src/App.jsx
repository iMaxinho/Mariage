import { useState } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programme from './pages/Programme'
import Infos from './pages/Infos'
import Cadeaux from './pages/Cadeaux'
import Rsvp from './pages/Rsvp'
import TestRsvp from './pages/TestRsvp'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'programme':
        return <Programme />
      case 'infos':
        return <Infos />
      case 'cadeaux':
        return <Cadeaux />
      case 'rsvp':
        return <Rsvp />
      case 'test-rsvp':
        return <TestRsvp />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Header />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
