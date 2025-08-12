import { useState } from 'react'
import { ExternalLink, Calendar, MapPin, Building } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

export default function References() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const projects = [
    {
      id: 1,
      title: 'Rodinný dům Praha 6',
      category: 'newConstruction',
      location: 'Praha 6, Dejvice',
      year: '2023',
      description: 'Kompletní výstavba moderního rodinného domu s energeticky úsporným řešením.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Rekonstrukce bytu Vinohrady',
      category: 'reconstruction',
      location: 'Praha 2, Vinohrady',
      year: '2023',
      description: 'Celková rekonstrukce bytu 3+1 včetně nového půdorysu a moderního designu.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop'
      ]
    },
    {
      id: 3,
      title: 'Půdní vestavba Karlín',
      category: 'atticConversion',
      location: 'Praha 8, Karlín',
      year: '2022',
      description: 'Přeměna nevyužitého podkroví na krásný byt 2+kk s terasou.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop'
      ]
    },
    {
      id: 4,
      title: 'Vila Břevnov',
      category: 'newConstruction',
      location: 'Praha 6, Břevnov',
      year: '2022',
      description: 'Luxusní rodinná vila s bazénem a zahradou na klíč.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop'
      ]
    },
    {
      id: 5,
      title: 'Střešní rekonstrukce Smíchov',
      category: 'roofWork',
      location: 'Praha 5, Smíchov',
      year: '2023',
      description: 'Kompletní výměna střešní krytiny a zateplení střechy.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop'
      ]
    },
    {
      id: 6,
      title: 'Zateplení fasády Holešovice',
      category: 'insulation',
      location: 'Praha 7, Holešovice',
      year: '2022',
      description: 'Komplexní zateplení panelového domu včetně nové fasády.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
      ]
    }
  ]
  
  const categories = [
    { id: 'all', name: 'Všechny projekty' },
    { id: 'newConstruction', name: t('newConstruction') },
    { id: 'reconstruction', name: t('reconstruction') },
    { id: 'atticConversion', name: t('atticConversion') },
    { id: 'roofWork', name: t('roofWork') },
    { id: 'insulation', name: t('insulation') }
  ]
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('referencesTitle')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('referencesSubtitle')}
          </p>
        </div>
      </section>
      
      {/* Filter buttons */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                      {project.year}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Building className="w-4 h-4 mr-2 text-emerald-600" />
                      {categories.find(c => c.id === project.category)?.name}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('viewProject')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                Žádné projekty nenalezeny
              </h3>
              <p className="text-slate-500">
                V této kategorii zatím nemáme žádné dokončené projekty.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Chcete vidět váš projekt v naší galerii?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Kontaktujte nás a společně vytvoříme projekt, na který budeme všichni hrdí.
          </p>
          <Button asChild size="lg" variant="outline" className="border-white text-emerald-700 bg-white hover:bg-emerald-50">
            <a href="/kontakt">{t('getQuote')}</a>
          </Button>
        </div>
      </section>
    </div>
  )
}