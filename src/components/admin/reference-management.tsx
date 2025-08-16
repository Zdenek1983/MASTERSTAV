import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  X, 
  Save, 
  MapPin, 
  Calendar,
  Building,
  Image as ImageIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Reference {
  id: number
  title: string
  category: string
  location: string
  year: string
  description: string
  image: string
  images: string[]
}

const INITIAL_REFERENCES: Reference[] = [
  {
    id: 1,
    title: 'Rodinný dům Karlovy Vary',
    category: 'newConstruction',
    location: 'Karlovy Vary, Dvory',
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
    title: 'Rekonstrukce lázeňského domu',
    category: 'reconstruction',
    location: 'Karlovy Vary, centrum',
    year: '2023',
    description: 'Celková rekonstrukce historického lázeňského domu s moderním designem.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ]
  }
]

export default function ReferenceManagement() {
  const [references, setReferences] = useState<Reference[]>([])
  const [editingRef, setEditingRef] = useState<Reference | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newImages, setNewImages] = useState<string[]>([])

  useEffect(() => {
    // Načíst data z localStorage nebo použít výchozí data
    const saved = localStorage.getItem('references')
    if (saved) {
      setReferences(JSON.parse(saved))
    } else {
      setReferences(INITIAL_REFERENCES)
      localStorage.setItem('references', JSON.stringify(INITIAL_REFERENCES))
    }
  }, [])

  const saveReferences = (newRefs: Reference[]) => {
    setReferences(newRefs)
    localStorage.setItem('references', JSON.stringify(newRefs))
  }

  const categories = [
    { id: 'newConstruction', name: 'Novostavby' },
    { id: 'reconstruction', name: 'Rekonstrukce' },
    { id: 'atticConversion', name: 'Půdní vestavby' },
    { id: 'earthwork', name: 'Zemní práce' },
    { id: 'stoneWork', name: 'Kamenické práce' },
    { id: 'insulation', name: 'Zateplení' },
    { id: 'interiors', name: 'Interiéry' }
  ]

  const handleEdit = (ref: Reference) => {
    setEditingRef({ ...ref })
    setNewImages([...ref.images])
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    const newRef: Reference = {
      id: Date.now(),
      title: '',
      category: 'newConstruction',
      location: '',
      year: new Date().getFullYear().toString(),
      description: '',
      image: '',
      images: []
    }
    setEditingRef(newRef)
    setNewImages([])
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!editingRef) return

    const updatedRef = {
      ...editingRef,
      images: newImages,
      image: newImages[0] || editingRef.image
    }

    if (references.find(r => r.id === editingRef.id)) {
      // Aktualizace existující reference
      const newRefs = references.map(r => r.id === editingRef.id ? updatedRef : r)
      saveReferences(newRefs)
    } else {
      // Přidání nové reference
      const newRefs = [...references, updatedRef]
      saveReferences(newRefs)
    }

    setIsModalOpen(false)
    setEditingRef(null)
    setNewImages([])
  }

  const handleDelete = (id: number) => {
    if (confirm('Opravdu chcete smazat tuto referenci?')) {
      const newRefs = references.filter(r => r.id !== id)
      saveReferences(newRefs)
    }
  }

  const handleImageAdd = () => {
    const url = prompt('Zadejte URL obrázku:')
    if (url && newImages.length < 4) {
      setNewImages([...newImages, url])
    }
  }

  const handleImageRemove = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Správa referencí</h2>
        <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Přidat referenci
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((ref) => (
          <Card key={ref.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img 
                src={ref.image} 
                alt={ref.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{ref.title}</h3>
              
              <div className="space-y-1 mb-3 text-sm text-slate-600">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {ref.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {ref.year}
                </div>
                <div className="flex items-center">
                  <Building className="w-3 h-3 mr-1" />
                  {categories.find(c => c.id === ref.category)?.name}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                {ref.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  {ref.images.length} foto{ref.images.length !== 1 ? 's' : ''}
                </span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(ref)}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(ref.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal pro editaci/přidání */}
      {isModalOpen && editingRef && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {references.find(r => r.id === editingRef.id) ? 'Upravit referenci' : 'Nová reference'}
              </h3>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Název projektu *
                  </label>
                  <input
                    type="text"
                    value={editingRef.title}
                    onChange={(e) => setEditingRef({...editingRef, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Např. Vila Karlovy Vary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Kategorie *
                  </label>
                  <select
                    value={editingRef.category}
                    onChange={(e) => setEditingRef({...editingRef, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lokalita *
                  </label>
                  <input
                    type="text"
                    value={editingRef.location}
                    onChange={(e) => setEditingRef({...editingRef, location: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Karlovy Vary, Rybáře"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rok dokončení *
                  </label>
                  <input
                    type="text"
                    value={editingRef.year}
                    onChange={(e) => setEditingRef({...editingRef, year: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="2023"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Popis *
                </label>
                <textarea
                  value={editingRef.description}
                  onChange={(e) => setEditingRef({...editingRef, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Stručný popis projektu..."
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Fotografie (max. 4)
                  </label>
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImageAdd}
                    disabled={newImages.length >= 4}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Přidat foto
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {newImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img} 
                        alt={`Foto ${index + 1}`}
                        className="w-full aspect-video object-cover rounded border"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleImageRemove(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {Array.from({ length: 4 - newImages.length }).map((_, index) => (
                    <div key={index} className="aspect-video border-2 border-dashed border-slate-300 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Zrušit
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!editingRef.title || !editingRef.location || !editingRef.description}
              >
                <Save className="w-4 h-4 mr-2" />
                Uložit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}