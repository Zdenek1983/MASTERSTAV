import { useState, useEffect } from 'react'
import { AlertTriangle, HardDrive, Trash2 } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'
import { StorageManager, StorageInfo } from '@/utils/storage-manager'

export default function StorageStatus() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const updateStorageInfo = async () => {
      const info = await StorageManager.getStorageInfo()
      setStorageInfo(info)
    }

    updateStorageInfo()
    const interval = setInterval(updateStorageInfo, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleClearStorage = async () => {
    setIsClearing(true)
    try {
      await StorageManager.performFullCleanup()
      // Update info after cleanup
      const info = await StorageManager.getStorageInfo()
      setStorageInfo(info)
    } catch (error) {
      console.error('Failed to clear storage:', error)
    } finally {
      setIsClearing(false)
    }
  }

  if (!storageInfo) {
    return null
  }

  const isHigh = storageInfo.percentage > 80
  const isCritical = storageInfo.percentage > 95

  if (!isHigh && !showDetails) {
    return null // Don't show when storage is fine
  }

  return (
    <Card className={`fixed bottom-4 right-4 z-50 max-w-sm ${
      isCritical ? 'border-red-500 bg-red-50' : 
      isHigh ? 'border-amber-500 bg-amber-50' : 
      'border-slate-200'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${
            isCritical ? 'text-red-600' :
            isHigh ? 'text-amber-600' :
            'text-slate-600'
          }`}>
            {isCritical ? <AlertTriangle className="w-5 h-5" /> : <HardDrive className="w-5 h-5" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-sm ${
              isCritical ? 'text-red-900' :
              isHigh ? 'text-amber-900' :
              'text-slate-900'
            }`}>
              {isCritical ? 'Úložiště je plné' :
               isHigh ? 'Málo místa v úložišti' :
               'Stav úložiště'
              }
            </h3>
            
            <p className="text-xs text-slate-600 mt-1">
              Použito: {storageInfo.percentage.toFixed(1)}% 
              ({StorageManager.formatBytes(storageInfo.used)} / {StorageManager.formatBytes(storageInfo.quota)})
            </p>
            
            <div className="mt-2 bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCritical ? 'bg-red-500' :
                  isHigh ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
              />
            </div>
            
            {isHigh && (
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearStorage}
                  disabled={isClearing}
                  className="text-xs"
                >
                  {isClearing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1"></div>
                      Mazání...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Vyčistit
                    </div>
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDetails(false)}
                  className="text-xs"
                >
                  Zavřít
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}