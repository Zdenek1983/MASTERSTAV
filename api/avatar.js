// Simple Node.js/Vercel API route for avatar proxy
// This avoids CORS issues with dicebear.com in COEP credentialless environment

export default async function handler(req, res) {
  const { seed, style = 'avataaars', size = '150' } = req.query
  
  if (!seed) {
    return res.status(400).json({ error: 'Seed parameter is required' })
  }
  
  try {
    // Use ui-avatars.com as primary (more reliable than dicebear in COEP)
    const initials = String(seed).slice(0, 2).toUpperCase()
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=059669&color=ffffff&rounded=true`
    
    const response = await fetch(avatarUrl)
    
    if (!response.ok) {
      throw new Error('Avatar service unavailable')
    }
    
    const imageBuffer = await response.arrayBuffer()
    
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', 'public, max-age=86400') // 24h cache
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    
    return res.send(Buffer.from(imageBuffer))
    
  } catch (error) {
    console.error('Avatar proxy error:', error)
    
    // Fallback: generate simple SVG avatar
    const initials = String(seed).slice(0, 2).toUpperCase()
    const colors = ['#059669', '#0891b2', '#7c3aed', '#dc2626', '#ea580c']
    const bgColor = colors[Math.abs(seed.charCodeAt(0) % colors.length)]
    
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}" rx="50%"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
              font-family="Arial, sans-serif" font-size="${Math.floor(size * 0.4)}" 
              fill="white" font-weight="bold">${initials}</text>
      </svg>
    `
    
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    return res.send(svg)
  }
}