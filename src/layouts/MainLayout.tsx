import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { SkipToContent } from '@/components/common/SkipToContent'

function RouteLoadingFallback() {
  return (
    <div className="container-x py-32 md:py-48">
      <div className="h-3 w-24 bg-surface-alt animate-pulse-subtle" />
      <div className="mt-4 h-10 w-3/4 bg-surface-alt animate-pulse-subtle md:w-1/2" />
      <div className="mt-4 h-4 w-full max-w-prose bg-surface-alt animate-pulse-subtle" />
    </div>
  )
}

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-white">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
