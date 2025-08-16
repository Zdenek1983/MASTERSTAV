import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Image, Phone, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { useAdmin } from '@/contexts/admin-context'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const { isLoggedIn } = useAdmin()
  
  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('references'), href: '/reference', icon: Image },
    { name: t('contact'), href: '/kontakt', icon: Phone },
  ]
  
  const languages = [
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
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
            
            {/* Admin ikonka */}
            <Link
              to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}
              className={cn(
                "p-2 rounded-md transition-all duration-200 flex items-center justify-center w-10 h-10",
                isLoggedIn 
                  ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
              title={isLoggedIn ? "Admin Dashboard" : "Admin přihlášení"}
            >
              <Settings className="w-5 h-5" />
            </Link>
            
            {/* Language switcher with flags */}
            <div className="flex items-center space-x-1 ml-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={cn(
                    "p-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center w-10 h-10",
                    language === lang.code 
                      ? "bg-emerald-600 text-white shadow-md scale-110" 
                      : "text-slate-600 hover:bg-slate-100 border border-slate-200 hover:scale-105"
                  )}
                  title={lang.name}
                >
                  <span className="text-lg">{lang.flag}</span>
                </button>
              ))}
            </div>
            
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white ml-4">
              <Link to="/kontakt">{t('getQuote')}</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile admin ikonka */}
            <Link
              to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}
              className={cn(
                "p-2 rounded-md transition-all duration-200",
                isLoggedIn 
                  ? "bg-emerald-600 text-white" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Settings className="w-5 h-5" />
            </Link>
            
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
            
            {/* Mobile admin link */}
            <Link
              to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2",
                isLoggedIn
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
              )}
            >
              <Settings className="w-5 h-5" />
              <span>{isLoggedIn ? "Admin Dashboard" : "Admin přihlášení"}</span>
            </Link>
            
            {/* Mobile language switcher with flags */}
            <div className="px-3 py-4">
              <div className="text-sm text-slate-600 mb-3">Jazyk / Language / Язык / Мова / Ngôn ngữ:</div>
              <div className="grid grid-cols-5 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "p-3 rounded-md transition-all duration-200 flex flex-col items-center justify-center space-y-1",
                      language === lang.code 
                        ? "bg-emerald-600 text-white shadow-md" 
                        : "text-slate-600 hover:bg-slate-100 border border-slate-200"
                    )}
                    title={lang.name}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-xs font-medium">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link to="/kontakt" onClick={() => setIsOpen(false)}>{t('getQuote')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}