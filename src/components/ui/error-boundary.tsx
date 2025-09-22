import { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
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
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Could send to error tracking service here
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Došlo k neočekávané chybě
              </h2>
              <p className="text-slate-600 mb-4">
                Omlouváme se za nepříjemnosti. Aplikace narazila na problém.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
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
              </div>
              
              <div className="mt-6 pt-4 border-t text-xs text-slate-500">
                Pokud problém přetrvává, kontaktujte nás na:
                <br />
                <a href="mailto:info@masterstav.cz" className="text-emerald-600 hover:underline">
                  info@masterstav.cz
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