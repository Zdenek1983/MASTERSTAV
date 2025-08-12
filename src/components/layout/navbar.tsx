import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Image, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  
  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('references'), href: '/reference', icon: Image },
    { name: t('contact'), href: '/kontakt', icon: Phone },
  ]
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg mr-3 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">MASTERSTAV</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1",
                    isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Language switcher with flags */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setLanguage('cs')}
                className={cn(
                  "p-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1",
                  language === 'cs' 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
                title="Čeština"
              >
                <span className="text-lg">🇨🇿</span>
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={cn(
                  "p-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1",
                  language === 'de' 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
                title="Deutsch"
              >
                <span className="text-lg">🇩🇪</span>
              </button>
            </div>
            
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link to="/kontakt">{t('getQuote')}</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2",
                    isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Mobile language switcher with flags */}
            <div className="flex items-center space-x-4 px-3 py-2">
              <span className="text-sm text-slate-600">Jazyk:</span>
              <button
                onClick={() => setLanguage('cs')}
                className={cn(
                  "p-2 rounded-md transition-all duration-200 flex items-center space-x-1",
                  language === 'cs' 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
                title="Čeština"
              >
                <span className="text-lg">🇨🇿</span>
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={cn(
                  "p-2 rounded-md transition-all duration-200 flex items-center space-x-1",
                  language === 'de' 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
                title="Deutsch"
              >
                <span className="text-lg">🇩🇪</span>
              </button>
            </div>
            
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link to="/kontakt" onClick={() => setIsOpen(false)}>{t('getQuote')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}