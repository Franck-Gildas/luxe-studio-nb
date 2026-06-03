'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lead } from '@/lib/admin/types'
import {
  addMonths,
  buildMonthGrid,
  formatAppointmentTime,
  formatMonthYear,
  isSameCalendarDay,
  parseAppointmentDate,
  toDateKey,
} from '@/lib/admin/appointment-date'
import {
  getServiceColor,
  getServiceColorClass,
  SERVICE_COLORS,
} from '@/lib/admin/service-colors'
import { IconChevronLeft, IconChevronRight } from '@/components/admin/AdminIcons'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MAX_VISIBLE_IN_CELL = 3
const VISIBLE_BEFORE_MORE = 2

type Props = {
  leads: Lead[]
  onSelectLead: (lead: Lead) => void
}

type DaySlice = {
  visible: Lead[]
  hiddenCount: number
}

function splitAppointmentsForCell(appointments: Lead[]): DaySlice {
  if (appointments.length <= MAX_VISIBLE_IN_CELL) {
    return { visible: appointments, hiddenCount: 0 }
  }
  return {
    visible: appointments.slice(0, VISIBLE_BEFORE_MORE),
    hiddenCount: appointments.length - VISIBLE_BEFORE_MORE,
  }
}

function formatListDayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

type AppointmentBlockProps = {
  lead: Lead
  onSelect: (lead: Lead) => void
  showName?: boolean
}

function CalendarAppointmentBlock({
  lead,
  onSelect,
  showName = true,
}: AppointmentBlockProps) {
  const color = getServiceColor(lead.service)

  return (
    <button
      type="button"
      className={`admin-cal-appt ${getServiceColorClass(lead.service)}`}
      style={{
        background: color.bg,
        borderColor: color.border,
        color: color.text,
      }}
      onClick={() => onSelect(lead)}
      title={`${lead.name} — ${lead.service}`}
    >
      <span className="admin-cal-appt-time">
        {formatAppointmentTime(lead.appointment_time) || '—'}
      </span>
      {showName && <span className="admin-cal-appt-name">{lead.name}</span>}
    </button>
  )
}

type CalendarDayCellProps = {
  cellKey: string
  dayNumber: number
  inCurrentMonth: boolean
  isToday: boolean
  appointments: Lead[]
  isExpanded: boolean
  onToggleExpand: (key: string) => void
  onSelectLead: (lead: Lead) => void
}

function CalendarDayCell({
  cellKey,
  dayNumber,
  inCurrentMonth,
  isToday,
  appointments,
  isExpanded,
  onToggleExpand,
  onSelectLead,
}: CalendarDayCellProps) {
  const { visible, hiddenCount } = splitAppointmentsForCell(appointments)
  const minHeight = Math.max(100, 36 + visible.length * 34 + (hiddenCount > 0 ? 26 : 0))

  return (
    <div
      className={`admin-calendar-day${inCurrentMonth ? '' : ' admin-calendar-day--outside'}${isToday ? ' admin-calendar-day--today' : ''}${isExpanded ? ' admin-calendar-day--expanded' : ''}`}
      style={{ minHeight }}
      data-day-key={cellKey}
    >
      <span className="admin-calendar-day-num">{dayNumber}</span>
      <div className="admin-calendar-day-appts">
        {visible.map((lead) => (
          <CalendarAppointmentBlock key={lead.sheetRow} lead={lead} onSelect={onSelectLead} />
        ))}
        {hiddenCount > 0 && (
          <div className="admin-cal-more-wrap">
            <button
              type="button"
              className="admin-cal-more"
              aria-expanded={isExpanded}
              aria-haspopup="dialog"
              onClick={() => onToggleExpand(cellKey)}
            >
              +{hiddenCount} more
            </button>
            {isExpanded && (
              <div
                className="admin-cal-day-popover"
                role="dialog"
                aria-label={`All appointments for day ${dayNumber}`}
              >
                <div className="admin-cal-day-popover-title">
                  {appointments.length} appointment{appointments.length === 1 ? '' : 's'}
                </div>
                <div className="admin-cal-day-popover-list">
                  {appointments.map((lead) => (
                    <CalendarAppointmentBlock
                      key={lead.sheetRow}
                      lead={lead}
                      onSelect={(selected) => {
                        onSelectLead(selected)
                        onToggleExpand(cellKey)
                      }}
                      showName
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminCalendarView({ leads, onSelectLead }: Props) {
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [expandedDayKey, setExpandedDayKey] = useState<string | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

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

  const monthListDays = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    const days: {
      date: Date
      key: string
      appointments: Lead[]
      isToday: boolean
    }[] = []

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      const key = toDateKey(date)
      const appointments = appointmentsByDay.get(key) ?? []
      if (appointments.length === 0) continue
      days.push({
        date,
        key,
        appointments,
        isToday: isSameCalendarDay(date, today),
      })
    }

    return days
  }, [viewMonth, appointmentsByDay])

  useEffect(() => {
    if (!expandedDayKey) return

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node
      const expandedCell = calendarRef.current?.querySelector(
        `[data-day-key="${expandedDayKey}"]`,
      )
      if (expandedCell?.contains(target)) return
      setExpandedDayKey(null)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setExpandedDayKey(null)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedDayKey])

  function handleToggleExpand(key: string) {
    setExpandedDayKey((current) => (current === key ? null : key))
  }

  return (
    <div className="admin-calendar" ref={calendarRef}>
      <div className="admin-calendar-header">
        <button
          type="button"
          className="admin-calendar-nav-btn"
          onClick={() => {
            setExpandedDayKey(null)
            setViewMonth((m) => addMonths(m, -1))
          }}
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
          onClick={() => {
            setExpandedDayKey(null)
            setViewMonth((m) => addMonths(m, 1))
          }}
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
            <span>{color.shortLabel}</span>
          </span>
        ))}
      </div>

      <div className="admin-calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="admin-calendar-weekday">
            <span className="admin-calendar-weekday-long">{day}</span>
            <span className="admin-calendar-weekday-short">{day.slice(0, 1)}</span>
          </div>
        ))}

        {grid.map((cell) => (
          <CalendarDayCell
            key={cell.key}
            cellKey={cell.key}
            dayNumber={cell.date.getDate()}
            inCurrentMonth={cell.inCurrentMonth}
            isToday={cell.isToday}
            appointments={appointmentsByDay.get(cell.key) ?? []}
            isExpanded={expandedDayKey === cell.key}
            onToggleExpand={handleToggleExpand}
            onSelectLead={onSelectLead}
          />
        ))}
      </div>

      <div className="admin-calendar-list" aria-label="Monthly appointment list">
        {monthListDays.length === 0 ? (
          <p className="admin-calendar-list-empty">No appointments this month.</p>
        ) : (
          monthListDays.map(({ date, key, appointments, isToday }) => (
            <section
              key={key}
              className={`admin-calendar-list-day${isToday ? ' admin-calendar-list-day--today' : ''}`}
            >
              <header className="admin-calendar-list-day-head">
                <span className="admin-calendar-list-day-num">{date.getDate()}</span>
                <div className="admin-calendar-list-day-meta">
                  <span className="admin-calendar-list-day-label">{formatListDayDate(date)}</span>
                  <span className="admin-calendar-list-day-count">
                    {appointments.length} appointment{appointments.length === 1 ? '' : 's'}
                  </span>
                </div>
              </header>
              <div className="admin-calendar-list-appts">
                {appointments.map((lead) => (
                  <CalendarAppointmentBlock
                    key={lead.sheetRow}
                    lead={lead}
                    onSelect={onSelectLead}
                    showName
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
