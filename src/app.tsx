import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/language-context'
import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'
import Home from './pages/home'
import References from './pages/references'
import Contact from './pages/contact'

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reference" element={<References />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}