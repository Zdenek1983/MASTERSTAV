// Development mode utilities to handle external services

export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD

// Feature flags for external services in development
export const EXTERNAL_SERVICES = {
  // Disable problematic external scripts in development
  STRIPE_ENABLED: isProduction,
  TIKTOK_ANALYTICS_ENABLED: isProduction,
  DICEBEAR_ENABLED: isProduction,
  
  // Local fallbacks
  USE_LOCAL_AVATARS: isDevelopment,
  USE_MOCK_DATA: isDevelopment
}

// Safe external script loader
export function loadExternalScript(src: string, enabled: boolean = true): Promise<void> {
  return new Promise((resolve) => {
    if (!enabled || isDevelopment) {
      console.info(`Skipping external script in development: ${src}`)
      resolve()
      return
    }
    
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.crossOrigin = 'anonymous'
    
    script.onload = () => resolve()
    script.onerror = (error) => {
      console.warn(`Failed to load external script: ${src}`, error)
      // Don't reject - continue without the script
      resolve()
    }
    
    document.head.appendChild(script)
  })
}

// Safe API call wrapper
export async function safeApiCall<T>(
  url: string, 
  options: RequestInit = {},
  fallback?: T
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.warn(`API call failed: ${url}`, error)
    return fallback || null
  }
}

// Memory optimization helpers
export function clearCaches() {
  // Clear React Query cache
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name))
    })
  }
  
  // Clear localStorage if getting too full
  if (typeof window !== 'undefined' && window.localStorage) {
    const used = JSON.stringify(window.localStorage).length
    if (used > 4000000) { // ~4MB
      console.warn('LocalStorage is getting full, consider clearing old data')
    }
  }
}

// Development debugging helpers
export function logMemoryUsage() {
  if (isDevelopment && 'performance' in window && 'memory' in (window.performance as any)) {
    const memory = (window.performance as any).memory
    console.info('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
    })
  }
}