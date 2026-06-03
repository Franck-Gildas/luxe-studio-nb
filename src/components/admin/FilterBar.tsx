'use client'

import { useState } from 'react'
import type { Lead, LeadFilters } from '@/lib/admin/types'
import { LEAD_STATUSES, EMPTY_FILTERS } from '@/lib/admin/types'
import { exportLeadsCsv } from '@/lib/admin/csv-export'
import { AdminSelect } from '@/components/admin/AdminSelect'
import {
  IconCalendar,
  IconExport,
  IconFilter,
  IconSearch,
} from '@/components/admin/AdminIcons'

type Props = {
  filters: LeadFilters
  onChange: (filters: LeadFilters) => void
  services: string[]
  artists: string[]
  filteredLeads: Lead[]
}

export function FilterBar({
  filters,
  onChange,
  services,
  artists,
  filteredLeads,
}: Props) {
  const [open, setOpen] = useState(false)

  function update(partial: Partial<LeadFilters>) {
    onChange({ ...filters, ...partial })
  }

  const activeCount = [
    filters.search,
    filters.status,
    filters.service,
    filters.artist,
    filters.dateFrom,
    filters.dateTo,
  ].filter(Boolean).length

  function clearAll() {
    onChange(EMPTY_FILTERS)
  }

  return (
    <section className={`admin-filters-wrap admin-animate-in admin-animate-in--4${open ? ' admin-filters-wrap--open' : ''}`}>
      <button
        type="button"
        className="admin-filters-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="admin-filters-toggle-left">
          <IconFilter size={16} />
          <span>Filters</span>
        </span>
        {activeCount > 0 && (
          <span className="admin-filters-toggle-badge">{activeCount}</span>
        )}
        <span className="admin-filters-toggle-icon" aria-hidden />
      </button>

      <div className="admin-filters">
        <div className="admin-filter-group admin-filter-group--search">
          <label className="admin-filter-label" htmlFor="filter-search">
            Search
          </label>
          <div className="admin-input-wrap">
            <span className="admin-input-icon" aria-hidden>
              <IconSearch size={16} />
            </span>
            <input
              id="filter-search"
              type="search"
              className="admin-filter-input admin-filter-input--with-icon"
              placeholder="Name or email…"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label" htmlFor="filter-status">
            Status
          </label>
          <AdminSelect
            id="filter-status"
            variant="filter"
            value={filters.status}
            onChange={(e) => update({ status: e.target.value })}
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </AdminSelect>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label" htmlFor="filter-service">
            Service
          </label>
          <AdminSelect
            id="filter-service"
            variant="filter"
            value={filters.service}
            onChange={(e) => update({ service: e.target.value })}
          >
            <option value="">All services</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </AdminSelect>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label" htmlFor="filter-artist">
            Artist
          </label>
          <AdminSelect
            id="filter-artist"
            variant="filter"
            value={filters.artist}
            onChange={(e) => update({ artist: e.target.value })}
          >
            <option value="">All artists</option>
            {artists.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </AdminSelect>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label" htmlFor="filter-from">
            From
          </label>
          <div className="admin-input-wrap">
            <span className="admin-input-icon" aria-hidden>
              <IconCalendar size={16} />
            </span>
            <input
              id="filter-from"
              type="date"
              className="admin-filter-input admin-filter-input--with-icon admin-filter-input--date"
              value={filters.dateFrom}
              onChange={(e) => update({ dateFrom: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label" htmlFor="filter-to">
            To
          </label>
          <div className="admin-input-wrap">
            <span className="admin-input-icon" aria-hidden>
              <IconCalendar size={16} />
            </span>
            <input
              id="filter-to"
              type="date"
              className="admin-filter-input admin-filter-input--with-icon admin-filter-input--date"
              value={filters.dateTo}
              onChange={(e) => update({ dateTo: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-filters-actions">
          {activeCount > 0 && (
            <button
              type="button"
              className="admin-clear-filters-btn"
              onClick={clearAll}
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            className="admin-export-btn"
            onClick={() => exportLeadsCsv(filteredLeads)}
          >
            <IconExport size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </section>
  )
}
