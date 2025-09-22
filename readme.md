# MASTERSTAV s.r.o. - Website

Moderní webová prezentace stavební firmy MASTERSTAV s.r.o. postavená na React + TypeScript + Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Query + React Context
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── admin/          # Admin-specific components
├── pages/              # Route components
│   └── admin/         # Admin pages
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Shared libraries
└── types/              # TypeScript type definitions
```

## 🔧 Development Features

- **Hot Module Replacement** via Vite
- **TypeScript** strict mode with path aliases (@/)
- **ESLint + Prettier** for code quality
- **Tailwind CSS** with custom design system
- **Multi-language support** (CS, DE, RU, UK, VI)
- **Admin dashboard** with authentication
- **Responsive design** for all devices

## 🔐 Admin Access

- URL: `/admin/login`
- Default password: `223344`
- Features: Reference management, content editing

## 🛠 Troubleshooting

### Storage Issues (FILE_ERROR_NO_SPACE)

If you encounter "No space" errors in development:

1. **Clear browser data**:
   ```bash
   # Open DevTools > Application > Storage > Clear site data
   # Or manually clear:
   # - IndexedDB
   # - LocalStorage
   # - Cache Storage
   ```

2. **Clear build cache**:
   ```bash
   npm run clean  # If available
   rm -rf node_modules/.vite
   rm -rf dist
   ```

3. **Restart development server**:
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

4. **Close other browser tabs** to free memory

### WebAssembly Out of Memory

If you see WASM memory errors:

1. **Restart development server**:
   ```bash
   # Stop server and restart
   npm run dev
   ```

2. **Close other applications** to free system memory

3. **Use production build** for testing:
   ```bash
   npm run build
   npm run preview
   ```

4. **Update dependencies**:
   ```bash
   npm update
   ```

### COEP/CORS Issues

In development, external services may be blocked:

- **Stripe/TikTok scripts**: Automatically disabled in development
- **Avatar images**: Routed through proxy API (`/api/avatar`)
- **External APIs**: Use local fallbacks when possible

### Memory Optimization Tips

1. **Monitor memory usage**:
   ```javascript
   // In DevTools Console
   performance.memory
   ```

2. **Clear caches periodically**:
   ```javascript
   // In DevTools Console  
   localStorage.clear()
   sessionStorage.clear()
   ```

3. **Use Chrome's Task Manager** (Shift+Esc) to monitor memory

4. **Consider using Firefox** if Chrome has memory issues

## 🚢 Deployment

Project is configured for Vercel deployment:

1. Connect GitHub repository to Vercel
2. Vercel will automatically:
   - Detect Vite framework
   - Run `npm run build`
   - Deploy from `dist/` directory
   - Handle routing with `vercel.json` config

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_APP_NAME=MASTERSTAV s.r.o.
VITE_PHONE=+420777250280
VITE_EMAIL=info@masterstav.cz
```

## 🧪 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📱 Features

- ✅ Responsive design
- ✅ Multi-language support
- ✅ Admin dashboard
- ✅ Reference gallery
- ✅ Contact forms
- ✅ SEO optimized
- ✅ Progressive Web App ready
- ✅ Performance optimized

## 🐛 Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| External scripts blocked | Feature flags disable in dev |
| Avatar images not loading | Uses proxy API |
| Memory errors | Clear cache, restart server |
| Admin context errors | Wrapped in proper providers |

## 📞 Support

- **Email**: info@masterstav.cz
- **Phone**: +420 777 250 280
- **GitHub**: Check repository issues

---

**MASTERSTAV s.r.o.** - Rodinná stavební firma s tradicí 🏗️