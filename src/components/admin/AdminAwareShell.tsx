'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { NavSpacer } from '@/components/layout/NavSpacer'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Concierge } from '@/components/ui/Concierge'
import { BookingScrollToForm } from '@/components/ui/BookingScrollToForm'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import PageTransition from '@/components/ui/PageTransition'
import RouteOverlay from '@/components/ui/RouteOverlay'
import GSAPAnimations from '@/components/ui/GSAPAnimations'

export function AdminAwareShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <BookingScrollToForm />
      <ScrollToTop />
      <Navbar />
      <GSAPAnimations />
      <NavSpacer />
      <RouteOverlay />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <Concierge />
    </>
  )
}
