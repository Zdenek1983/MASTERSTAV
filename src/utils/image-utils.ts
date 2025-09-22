// Utility functions for safe image handling

/**
 * Creates a safe Unsplash URL with proper parameters
 */
export function createSafeImageUrl(baseUrl: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'jpg'
} = {}): string {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'auto'
  } = options

  // Add proper parameters for better CORS compatibility
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    fit: 'crop',
    auto: format,
    q: quality.toString()
  })

  return `${baseUrl}?${params.toString()}`
}

/**
 * Preloads an image and returns a promise
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    
    img.src = src
  })
}

/**
 * Safe image URLs that are known to work well with CORS
 */
export const SAFE_PLACEHOLDER_IMAGES = {
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
  house: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
  renovation: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d',
  architecture: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
  interior: 'https://images.unsplash.com/photo-1586105251261-72a756497a11',
  building: 'https://images.unsplash.com/photo-1554995207-c18c203602cb'
}

/**
 * Creates a fallback image data URL as backup
 */
export function createFallbackImage(text: string = 'Obrázek'): string {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 300
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Gray background
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Center text
    ctx.fillStyle = '#6b7280'
    ctx.font = '16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  }
  
  return canvas.toDataURL()
}