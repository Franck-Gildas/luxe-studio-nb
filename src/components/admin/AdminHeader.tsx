'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/admin/auth'
import { IconBell, IconHome, IconRefresh } from '@/components/admin/AdminIcons'
import { countHeaderReminderAlerts } from '@/lib/admin/followups'
import { useFollowUps } from '@/lib/admin/use-followups'

type Props = {
  onRefresh?: () => void
  refreshing?: boolean
  onRemindersClick?: () => void
}

export function AdminHeader({ onRefresh, refreshing = false, onRemindersClick }: Props) {
  const followUps = useFollowUps()
  const alertCount = countHeaderReminderAlerts(followUps)
  const router = useRouter()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  function handleLogout() {
    logout()
    router.push('/admin')
  }

  return (
    <header className="admin-header admin-animate-in">
      <div className="admin-header-brand">
        <h1 className="admin-header-title">LUXE STUDIO NB</h1>
        <p className="admin-header-subtitle">Tableau de bord · Dashboard</p>
        <p className="admin-header-date">{today}</p>
      </div>
      <div className="admin-header-actions">
        <Link href="/" className="admin-header-tool-btn" title="Back to site home" aria-label="Back to site home">
          <IconHome size={18} />
          <span className="admin-header-tool-label">Home</span>
        </Link>
        {onRefresh && (
          <button
            type="button"
            className={`admin-header-tool-btn${refreshing ? ' admin-header-tool-btn--spinning' : ''}`}
            onClick={onRefresh}
            disabled={refreshing}
            title="Refresh bookings"
            aria-label="Refresh bookings"
          >
            <IconRefresh size={18} />
            <span className="admin-header-tool-label">Refresh</span>
          </button>
        )}
        {onRemindersClick && alertCount > 0 && (
          <button
            type="button"
            className="admin-header-reminder-btn"
            onClick={onRemindersClick}
            title="View follow-up reminders"
            aria-label={`${alertCount} reminders due today or overdue`}
          >
            <IconBell size={18} />
            <span className="admin-header-reminder-count">{alertCount}</span>
          </button>
        )}
        <button type="button" className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
