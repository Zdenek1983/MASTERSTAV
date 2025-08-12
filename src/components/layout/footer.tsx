import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Home } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg mr-3 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MASTERSTAV</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/reference" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                  {t('references')}
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>{t('newConstruction')}</li>
              <li>{t('reconstruction')}</li>
              <li>{t('atticConversion')}</li>
              <li>{t('earthwork')}</li>
              <li>{t('stoneWork')}</li>
              <li>{t('insulation')}</li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-300">
                  <p>Hlavní 123</p>
                  <p>360 01 Karlovy Vary</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+420123456789" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                  +420 123 456 789
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@masterstav.cz" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                  info@masterstav.cz
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-300">
                  <p>{t('workdays')}</p>
                  <p>{t('saturday')}</p>
                  <p>{t('sunday')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              © {currentYear} MASTERSTAV s.r.o. {t('allRightsReserved')}
            </p>
            <p className="text-sm text-slate-400 mt-2 md:mt-0">
              IČO: 12345678 | DIČ: CZ12345678
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}