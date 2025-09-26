import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  onError?: () => void
}

export default function SafeImage({ 
  src, 
  alt, 
  className, 
  fallbackSrc,
  onError 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }
  
  const handleLoad = () => {
    setIsLoading(false)
  }
  
  if (hasError && !fallbackSrc) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-slate-100 text-slate-400",
        className
      )}>
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Obrázek se nepodařilo načíst</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn("relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}
      
      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </div>
  )
}