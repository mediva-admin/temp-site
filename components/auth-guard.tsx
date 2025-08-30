"use client"

import { authUtils } from '@/utils/auth-utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!authUtils.isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push('/auth/signin')
      return
    }
  }, [router])

  // Don't render children until we've checked authentication
  if (!authUtils.isAuthenticated()) {
    return null
  }

  return <>{children}</>
}
