import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '@/contexts/admin-context'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAdmin()

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}