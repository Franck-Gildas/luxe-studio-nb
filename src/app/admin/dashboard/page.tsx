'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AdminBooking } from '@/lib/google-sheets'
import type { Lead, LeadFilters, LeadStatus } from '@/lib/admin/types'
import { EMPTY_FILTERS } from '@/lib/admin/types'
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { SummaryCards } from '@/components/admin/SummaryCards'
import { FilterBar } from '@/components/admin/FilterBar'
import { LeadPipeline } from '@/components/admin/LeadPipeline'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { LeadDetailModal } from '@/components/admin/LeadDetailModal'
import { AdminCalendarView } from '@/components/admin/AdminCalendarView'
import { AdminViewToggle, type AdminLeadsView } from '@/components/admin/AdminViewToggle'
import { parseAppointmentDate } from '@/lib/admin/appointment-date'
import { mergeBookingsToLeads, updateLeadStatus } from '@/lib/admin/merge-leads'
import {
  getStatusOverrides,
  setStatusOverride,
} from '@/lib/admin/storage'
import {
  filterLeads,
  computeSummaryStats,
  getUniqueServices,
  getUniqueArtists,
} from '@/lib/admin/filters'

function formatSyncTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  if (diffMs < 60000) return 'just now'
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins} min ago`
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filters, setFilters] = useState<LeadFilters>(EMPTY_FILTERS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [syncTime, setSyncTime] = useState<Date | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [leadsView, setLeadsView] = useState<AdminLeadsView>('table')
  const [tableRevealKey, setTableRevealKey] = useState(1)

  function handleLeadsViewChange(view: AdminLeadsView) {
    setLeadsView(view)
    if (view === 'table') {
      setTableRevealKey((k) => k + 1)
    }
  }

  const loadBookings = useCallback(async (options?: { background?: boolean }) => {
    const background = options?.background ?? false
    if (background) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError('')
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? `Failed to load bookings (${res.status})`)
      }
      const data = (await res.json()) as { bookings: AdminBooking[] }
      const overrides = getStatusOverrides()
      const merged = mergeBookingsToLeads(data.bookings, overrides)
      setLeads(merged)
      setSyncTime(new Date())
      setSelectedLead((prev) => {
        if (!prev) return prev
        return merged.find((l) => l.sheetRow === prev.sheetRow) ?? prev
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadBookings()
  }, [loadBookings])

  const filteredLeads = useMemo(
    () => filterLeads(leads, filters),
    [leads, filters],
  )

  const stats = useMemo(
    () => computeSummaryStats(filteredLeads),
    [filteredLeads],
  )

  const services = useMemo(() => getUniqueServices(leads), [leads])
  const artists = useMemo(() => getUniqueArtists(leads), [leads])

  function handleStatusChange(sheetRow: number, status: LeadStatus) {
    setStatusOverride(sheetRow, status)
    setLeads((prev) => updateLeadStatus(prev, sheetRow, status))
    setSelectedLead((prev) =>
      prev?.sheetRow === sheetRow ? { ...prev, effectiveStatus: status } : prev,
    )
  }

  const modalLeads = useMemo(() => {
    if (leadsView === 'calendar') {
      return filteredLeads
        .filter((l) => parseAppointmentDate(l.appointment_date))
        .sort((a, b) => {
          const da = parseAppointmentDate(a.appointment_date)!
          const db = parseAppointmentDate(b.appointment_date)!
          const diff = da.getTime() - db.getTime()
          if (diff !== 0) return diff
          return (a.appointment_time || '').localeCompare(b.appointment_time || '')
        })
    }
    return filteredLeads
  }, [filteredLeads, leadsView])

  const handleModalNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      setSelectedLead((current) => {
        if (!current) return current
        const idx = modalLeads.findIndex((l) => l.sheetRow === current.sheetRow)
        const nextIdx = direction === 'prev' ? idx - 1 : idx + 1
        if (nextIdx >= 0 && nextIdx < modalLeads.length) {
          return modalLeads[nextIdx]
        }
        return current
      })
    },
    [modalLeads],
  )

  const selectedLeadIndex = selectedLead
    ? modalLeads.findIndex((l) => l.sheetRow === selectedLead.sheetRow)
    : -1

  return (
    <AdminAuthGuard>
      <div className="admin-dashboard">
        <AdminHeader
          onRefresh={() => loadBookings({ background: true })}
          refreshing={refreshing}
        />

        {loading && <div className="admin-loading">Loading bookings…</div>}

        {error && !loading && (
          <div className="admin-error">
            {error}
            <button
              type="button"
              className="admin-view-btn"
              style={{ marginLeft: 16 }}
              onClick={() => loadBookings()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <SummaryCards stats={stats} />

            <hr className="admin-divider" aria-hidden />

            <FilterBar
              filters={filters}
              onChange={setFilters}
              services={services}
              artists={artists}
              filteredLeads={filteredLeads}
            />

            <hr className="admin-divider" aria-hidden />

            <LeadPipeline
              leads={filteredLeads}
              onStatusChange={handleStatusChange}
              onViewLead={setSelectedLead}
            />

            <hr className="admin-divider" aria-hidden />

            <section className="admin-animate-in admin-animate-in--6">
              <div className="admin-section-head">
                <h2 className="admin-section-title">All Leads</h2>
                <AdminViewToggle view={leadsView} onChange={handleLeadsViewChange} />
              </div>
              <div
                className={`admin-leads-panel${leadsView === 'table' ? '' : ' admin-leads-panel--hidden'}`}
                aria-hidden={leadsView !== 'table'}
              >
                <LeadsTable
                  leads={filteredLeads}
                  revealKey={tableRevealKey}
                  onStatusChange={handleStatusChange}
                  onViewLead={setSelectedLead}
                />
              </div>
              <div
                className={`admin-leads-panel${leadsView === 'calendar' ? '' : ' admin-leads-panel--hidden'}`}
                aria-hidden={leadsView !== 'calendar'}
              >
                <AdminCalendarView
                  leads={filteredLeads}
                  onSelectLead={setSelectedLead}
                />
              </div>
            </section>

            <p className="admin-sync-notice admin-animate-in admin-animate-in--7">
              All leads automatically synced to Google Sheets · Dernière sync:{' '}
              {syncTime ? formatSyncTime(syncTime) : '—'}
            </p>
          </>
        )}

        {selectedLead && selectedLeadIndex >= 0 && (
          <LeadDetailModal
            lead={selectedLead}
            leadIndex={selectedLeadIndex}
            totalLeads={modalLeads.length}
            hasPrevious={selectedLeadIndex > 0}
            hasNext={selectedLeadIndex < modalLeads.length - 1}
            onClose={() => setSelectedLead(null)}
            onSave={handleStatusChange}
            onNavigate={handleModalNavigate}
          />
        )}
      </div>
    </AdminAuthGuard>
  )
}
