'use client'

import { useMemo, useState } from 'react'
import type { Lead } from '@/lib/admin/types'
import {
  addMonths,
  buildMonthGrid,
  formatAppointmentTime,
  formatMonthYear,
  parseAppointmentDate,
  toDateKey,
} from '@/lib/admin/appointment-date'
import { getServiceColor, getServiceColorClass, SERVICE_COLORS } from '@/lib/admin/service-colors'
import { IconChevronLeft, IconChevronRight } from '@/components/admin/AdminIcons'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type Props = {
  leads: Lead[]
  onSelectLead: (lead: Lead) => void
}

export function AdminCalendarView({ leads, onSelectLead }: Props) {
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const appointmentsByDay = useMemo(() => {
    const map = new Map<string, Lead[]>()
    for (const lead of leads) {
      const appt = parseAppointmentDate(lead.appointment_date)
      if (!appt) continue
      const key = toDateKey(appt)
      const list = map.get(key) ?? []
      list.push(lead)
      map.set(key, list)
    }
    for (const [, list] of map) {
      list.sort((a, b) =>
        (a.appointment_time || '').localeCompare(b.appointment_time || ''),
      )
    }
    return map
  }, [leads])

  const grid = useMemo(() => buildMonthGrid(viewMonth), [viewMonth])

  const monthAppointmentCount = useMemo(() => {
    let count = 0
    for (const cell of grid) {
      if (cell.inCurrentMonth) {
        count += appointmentsByDay.get(cell.key)?.length ?? 0
      }
    }
    return count
  }, [grid, appointmentsByDay])

  return (
    <div className="admin-calendar">
      <div className="admin-calendar-header">
        <button
          type="button"
          className="admin-calendar-nav-btn"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          aria-label="Previous month"
        >
          <IconChevronLeft size={18} />
        </button>
        <div className="admin-calendar-title-wrap">
          <h3 className="admin-calendar-title">{formatMonthYear(viewMonth)}</h3>
          <p className="admin-calendar-subtitle">
            {monthAppointmentCount} appointment{monthAppointmentCount === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          className="admin-calendar-nav-btn"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
        >
          <IconChevronRight size={18} />
        </button>
      </div>

      <div className="admin-calendar-legend" aria-label="Service color legend">
        {SERVICE_COLORS.map((color) => (
          <span key={color.id} className="admin-calendar-legend-item">
            <span
              className="admin-calendar-legend-swatch"
              style={{
                background: color.bg,
                borderColor: color.border,
              }}
            />
            <span>{color.label.split(' ')[0]}</span>
          </span>
        ))}
      </div>

      <div className="admin-calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="admin-calendar-weekday">
            {day}
          </div>
        ))}

        {grid.map((cell) => {
          const dayAppointments = appointmentsByDay.get(cell.key) ?? []
          return (
            <div
              key={cell.key}
              className={`admin-calendar-day${cell.inCurrentMonth ? '' : ' admin-calendar-day--outside'}${cell.isToday ? ' admin-calendar-day--today' : ''}`}
            >
              <span className="admin-calendar-day-num">{cell.date.getDate()}</span>
              <div className="admin-calendar-day-appts">
                {dayAppointments.map((lead) => {
                  const color = getServiceColor(lead.service)
                  return (
                    <button
                      key={lead.sheetRow}
                      type="button"
                      className={`admin-cal-appt ${getServiceColorClass(lead.service)}`}
                      style={{
                        background: color.bg,
                        borderColor: color.border,
                        color: color.text,
                      }}
                      onClick={() => onSelectLead(lead)}
                      title={`${lead.name} — ${lead.service}`}
                    >
                      <span className="admin-cal-appt-time">
                        {formatAppointmentTime(lead.appointment_time) || '—'}
                      </span>
                      <span className="admin-cal-appt-name">{lead.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
