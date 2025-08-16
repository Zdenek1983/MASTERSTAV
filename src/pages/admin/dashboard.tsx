import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  LogOut,
  Plus,
  Edit3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/admin-context'
import ReferenceManagement from '@/components/admin/reference-management'

export default function AdminDashboard() {
  const { isLoggedIn, logout } = useAdmin()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  const menuItems = [
    { id: 'dashboard', name: 'Přehled', icon: LayoutDashboard },
    { id: 'references', name: 'Reference', icon: Image },
    { id: 'pages', name: 'Stránky', icon: FileText },
    { id: 'users', name: 'Návštěvnost', icon: Users },
    { id: 'settings', name: 'Nastavení', icon: Settings },
  ]

  const stats = [
    { name: 'Celkem referencí', value: '24', change: '+3 tento měsíc', color: 'bg-emerald-500' },
    { name: 'Návštěvy webu', value: '1,248', change: '+12% oproti minulému měsíci', color: 'bg-blue-500' },
    { name: 'Kontaktní formuláře', value: '18', change: '+5 nových dotazů', color: 'bg-purple-500' },
    { name: 'Aktivní projekty', value: '7', change: 'V různých fázích', color: 'bg-amber-500' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'references':
        return <ReferenceManagement />
      
      case 'pages':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Správa stránek</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Nová stránka
              </Button>
            </div>
            
            <div className="grid gap-4">
              {['Domů', 'Reference', 'Kontakt'].map((page) => (
                <Card key={page} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{page}</h3>
                        <p className="text-slate-600 text-sm">Naposledy upraveno: před 2 dny</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Upravit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      
      case 'users':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Návštěvnost a statistiky</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nejnavštěvovanější stránky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: 'Domů', visits: 45, percentage: 60 },
                      { page: 'Reference', visits: 28, percentage: 37 },
                      { page: 'Kontakt', visits: 15, percentage: 20 }
                    ].map((item) => (
                      <div key={item.page} className="flex items-center justify-between">
                        <span className="font-medium">{item.page}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-600">{item.visits}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Poslední aktivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Nová reference přidána: "Vila Karlovy Vary"',
                      'Kontaktní formulář vyplněn',
                      'Stránka Reference upravena',
                      'Nový návštěvník z Google'
                    ].map((activity, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-slate-50 rounded">
                        {activity}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Nastavení webu</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktní údaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                    <input 
                      type="text" 
                      defaultValue="+420 777 250 280"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue="info@masterstav.cz"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Adresa</label>
                    <textarea 
                      defaultValue="Sedlečko 123, 362 72 Kyselka"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={2}
                    />
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Uložit změny</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bezpečnost</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Změnit admin heslo</label>
                    <input 
                      type="password" 
                      placeholder="Nové heslo"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <Button variant="outline">Změnit heslo</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
              <p className="text-slate-600">Vítejte v admin panelu MASTERSTAV s.r.o.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rychlé akce</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('references')} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Přidat novou referenci
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('pages')} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Upravit stránky
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('settings')} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Nastavení webu
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Systémové informace</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Verze webu:</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Poslední backup:</span>
                    <span className="font-medium">Dnes 08:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Databáze:</span>
                    <span className="font-medium text-green-600">Online</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg mr-3 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Odhlásit se
            </Button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                )
              })}
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}