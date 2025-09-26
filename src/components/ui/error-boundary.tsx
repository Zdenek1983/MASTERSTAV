import { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw, HardDrive } from 'lucide-react'
import { Card, CardContent } from './card'
import { Button } from './button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  isStorageError?: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    const isStorageError = error.message?.includes('FILE_ERROR_NO_SPACE') || 
                          error.message?.includes('storage') ||
                          error.message?.includes('quota')
    return { hasError: true, error, isStorageError }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
    
    // Log to external service in production
    if (import.meta.env.PROD) {
      // Could send to error tracking service here
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, isStorageError: false })
  }

  clearStorage = () => {
    try {
      // Clear localStorage
      window.localStorage.clear()
      // Clear sessionStorage  
      window.sessionStorage.clear()
      // Clear indexedDB if possible
      if ('indexedDB' in window) {
        indexedDB.databases().then(databases => {
          databases.forEach(db => {
            if (db.name) {
              indexedDB.deleteDatabase(db.name)
            }
          })
        }).catch(console.warn)
      }
      
      this.handleRetry()
    } catch (e) {
      console.error('Failed to clear storage:', e)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isStorageError = this.state.isStorageError

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
          <Card className="max-w-lg w-full">
            <CardContent className="p-6 text-center">
              {isStorageError ? (
                <HardDrive className="w-16 h-16 text-red-500 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              )}
              
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {isStorageError ? 'Problém s úložištěm' : 'Došlo k neočekávané chybě'}
              </h2>
              
              <p className="text-slate-600 mb-4">
                {isStorageError 
                  ? 'Došlo místo v úložišti prohlížeče. Zkuste vyčistit data aplikace.'
                  : 'Omlouváme se za nepříjemnosti. Aplikace narazila na problém.'
                }
              </p>
              
              {isStorageError && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
                  <h3 className="font-medium text-blue-900 mb-2">Jak vyřešit problém s úložištěm:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>1. Zavřete ostatní panely prohlížeče</li>
                    <li>2. Klikněte na "Vyčistit úložiště" níže</li>
                    <li>3. Obnovte stránku</li>
                    <li>4. Pokud problém přetrvává, restartujte prohlížeč</li>
                  </ul>
                </div>
              )}

              {import.meta.env.DEV && this.state.error && (
                <details className="text-left bg-slate-100 p-3 rounded mb-4">
                  <summary className="cursor-pointer font-medium text-sm text-slate-700 mb-2">
                    Detaily chyby (pouze v development)
                  </summary>
                  <pre className="text-xs text-red-600 overflow-auto max-h-32">
                    {this.state.error.message}
                    {this.state.errorInfo?.componentStack && (
                      <div className="mt-2 text-slate-600">
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                {isStorageError ? (
                  <>
                    <Button 
                      onClick={this.clearStorage}
                      className="bg-red-600 hover:bg-red-700 flex items-center"
                    >
                      <HardDrive className="w-4 h-4 mr-2" />
                      Vyčistit úložiště
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Obnovit stránku
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={this.handleRetry}
                      className="bg-emerald-600 hover:bg-emerald-700 flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Zkusit znovu
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Obnovit stránku
                    </Button>
                  </>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t text-xs text-slate-500">
                Pokud problém přetrvává, kontaktujte nás na:
                <br />
                <a href="mailto:info@masterstav.cz" className="text-emerald-600 hover:underline">
                  info@masterstav.cz
                </a>
                <br />
                <a href="tel:+420777250280" className="text-emerald-600 hover:underline">
                  +420 777 250 280
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary