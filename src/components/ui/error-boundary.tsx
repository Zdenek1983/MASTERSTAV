import { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Card, CardContent } from './card'
import { Button } from './button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
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
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
          <Card className="max-w-lg w-full">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Došlo k neočekávané chybě
              </h2>
              
              <p className="text-slate-600 mb-4">
                Omlouváme se za nepříjemnosti. Aplikace narazila na problém.
              </p>
              
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
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary