import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Programme from './pages/Programme'
import Infos from './pages/Infos'
import Cadeaux from './pages/Cadeaux'
import Rsvp from './pages/Rsvp'
import TestRsvp from './pages/TestRsvp'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/infos" element={<Infos />} />
          <Route path="/cadeaux" element={<Cadeaux />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="/test-rsvp" element={<TestRsvp />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
