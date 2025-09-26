import { useState, useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface SafeAvatarProps {
  seed?: string
  size?: number
  className?: string
  fallbackInitials?: string
  onError?: (error: string) => void
}

export default function SafeAvatar({
  seed = 'default',
  size = 40,
  className,
  fallbackInitials,
  onError
}: SafeAvatarProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSeed, setCurrentSeed] = useState(seed)
  
  // Use our avatar proxy API instead of dicebear directly
  const avatarUrl = useMemo(() => {
    if (import.meta.env.DEV) {
      // In development, skip external API and generate locally
      return null
    }
    return `/api/avatar?seed=${encodeURIComponent(currentSeed)}&size=${size}`
  }, [currentSeed, size])
  
  // Local avatar generation for development
  const generateLocalAvatar = (initials: string) => {
    const colors = ['#059669', '#0891b2', '#7c3aed', '#dc2626', '#ea580c']
    const bgColor = colors[Math.abs(initials.charCodeAt(0) % colors.length)]
    
    return (
      <div 
        className={cn(
          "rounded-full flex items-center justify-center text-white font-semibold",
          className
        )}
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: bgColor,
          fontSize: size * 0.4 
        }}
      >
        {initials.slice(0, 2).toUpperCase()}
      </div>
    )
  }
  
  const handleImageError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.('Avatar se nepodařilo načíst')
  }
  
  const handleImageLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }
  
  const regenerateAvatar = () => {
    setIsLoading(true)
    setHasError(false)
    setCurrentSeed(currentSeed + Date.now())
  }
  
  // Always use local generation in development or when error occurs
  const initials = fallbackInitials || currentSeed.slice(0, 2)
  if (!avatarUrl || hasError) {
    return (
      <div className="group relative">
        {generateLocalAvatar(initials)}
        
        <Button
          size="sm"
          variant="outline"
          className="absolute -top-1 -right-1 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={regenerateAvatar}
          title="Generovat nový avatar"
        >
          <RefreshCw className="w-3 h-3" />
        </Button>
      </div>
    )
  }
  
  return (
    <div className="group relative">
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 rounded-full bg-slate-100 animate-pulse flex items-center justify-center",
            className
          )}
          style={{ width: size, height: size }}
        >
          <div className="animate-spin rounded-full h-1/3 w-1/3 border-b-2 border-emerald-600"></div>
        </div>
      )}
      
      <img
        src={avatarUrl}
        alt="Avatar"
        className={cn(
          "rounded-full object-cover transition-opacity",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        style={{ width: size, height: size }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        onLoadStart={() => setIsLoading(true)}
      />
      
      <Button
        size="sm"
        variant="outline"
        className="absolute -top-1 -right-1 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={regenerateAvatar}
        title="Generovat nový avatar"
      >
        <RefreshCw className="w-3 h-3" />
      </Button>
    </div>
  )
}