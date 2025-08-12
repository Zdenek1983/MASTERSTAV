import { ArrowRight, Building, Hammer, Home as HomeIcon, Shovel, Award, DollarSign, CheckCircle, Triangle, Square, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'

// Floating Animation Component
function FloatingElements() {
  const floatingIcons = [
    { Icon: Building, delay: '0s', duration: '8s', x: '10%', y: '20%' },
    { Icon: Hammer, delay: '1s', duration: '10s', x: '80%', y: '15%' },
    { Icon: Shovel, delay: '2s', duration: '12s', x: '15%', y: '70%' },
    { Icon: Award, delay: '3s', duration: '9s', x: '85%', y: '65%' },
    { Icon: Triangle, delay: '0.5s', duration: '11s', x: '60%', y: '25%' },
    { Icon: Square, delay: '4s', duration: '13s', x: '25%', y: '45%' },
    { Icon: Circle, delay: '2.5s', duration: '7s', x: '75%', y: '40%' }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => {
        const { Icon } = item
        return (
          <div
            key={index}
            className="absolute opacity-10"
            style={{
              left: item.x,
              top: item.y,
              animation: `float ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay
            }}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-emerald-300" />
          </div>
        )
      })}
      
      {/* Animated geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-emerald-500/20 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-emerald-600/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Moving background lines */}
      <div className="absolute inset-0">
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-emerald-300/10 to-transparent left-1/4 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-emerald-300/10 to-transparent right-1/3 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
      </div>
    </div>
  )
}

// Parallax Background Component
function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-96 h-96 bg-emerald-600/5 rounded-full -top-20 -right-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute w-72 h-72 bg-emerald-400/5 rounded-full -bottom-10 -left-10 animate-pulse" style={{ animationDelay: '3s', animationDuration: '8s' }}></div>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()
  
  const services = [
    {
      icon: Building,
      title: t('newConstruction'),
      description: t('newConstructionDesc'),
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
    },
    {
      icon: Hammer,
      title: t('reconstruction'),
      description: t('reconstructionDesc'),
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop'
    },
    {
      icon: HomeIcon,
      title: t('atticConversion'),
      description: t('atticConversionDesc'),
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      icon: Shovel,
      title: t('earthwork'),
      description: t('earthworkDesc'),
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop'
    },
    {
      icon: Award,
      title: t('stoneWork'),
      description: t('stoneWorkDesc'),
      image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400&h=300&fit=crop'
    },
    {
      icon: HomeIcon,
      title: t('insulation'),
      description: t('insulationDesc'),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      icon: Building,
      title: t('interiors'),
      description: t('interiorsDesc'),
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop'
    }
  ]
  
  const advantages = [
    {
      icon: Award,
      title: t('experience'),
      description: t('experienceDesc')
    },
    {
      icon: CheckCircle,
      title: t('quality'),
      description: t('qualityDesc')
    },
    {
      icon: Building,
      title: t('warranty'),
      description: t('warrantyDesc')
    },
    {
      icon: DollarSign,
      title: t('pricing'),
      description: t('pricingDesc')
    }
  ]
  
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(0px) translateX(20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) translateX(5px) rotate(-5deg);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
      `}</style>
    
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 lg:py-32 overflow-hidden">
          <ParallaxBackground />
          <FloatingElements />
          
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-10"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-3xl animate-slide-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8 font-light animate-slide-in" style={{ animationDelay: '0.2s' }}>
                {t('heroSubtitle')}
              </p>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl animate-slide-in" style={{ animationDelay: '0.4s' }}>
                {t('heroDescription')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                  <Link to="/kontakt" className="flex items-center">
                    {t('getQuote')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-slate-900 bg-white hover:bg-emerald-50 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                  <Link to="/reference">{t('references')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t('ourServices')}
              </h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg transform hover:scale-105">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 transform group-hover:rotate-12">
                          <IconComponent className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Background animated elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-emerald-50 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-emerald-100 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t('whyChooseUs')}
              </h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => {
                const IconComponent = advantage.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:rotate-6">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {advantage.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-32 -left-32 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute w-48 h-48 bg-white/5 rounded-full -bottom-24 -right-24 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Máte projekt v Karlových Varech? Kontaktujte nás ještě dnes!
            </h2>
            <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
              Připravíme vám nezávaznou cenovou nabídku přesně na míru vašich potřeb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-white text-emerald-700 bg-white hover:bg-emerald-50 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                <Link to="/kontakt">{t('getQuote')}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white border border-emerald-400 hover:bg-emerald-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                <a href="tel:+420777250280">+420 777 250 280</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}