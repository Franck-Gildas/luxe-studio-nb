'use client'

import { useMemo, useState } from 'react'
import type { AdminBooking } from '@/lib/google-sheets'
import type { LeadStatus } from '@/lib/admin/types'
import { formatCurrency } from '@/lib/admin/parse-total'
import {
  computeMarketingInsights,
  getRangeTitleLabel,
  INSIGHTS_RANGE_OPTIONS,
  type CustomRange,
  type InsightsRange,
  type SourceStats,
} from '@/lib/admin/marketing-insights'
import { IconCalendar } from '@/components/admin/AdminIcons'

type MarketingBooking = AdminBooking & { effectiveStatus?: LeadStatus }

type Props = {
  bookings: MarketingBooking[]
}

function formatTrend(source: string, diff: number): { className: string; text: string } {
  if (diff > 0) {
    return {
      className: 'insights-trend-up',
      text: `↑ +${diff} ${source}`,
    }
  }
  if (diff < 0) {
    return {
      className: 'insights-trend-down',
      text: `↓ ${diff} ${source}`,
    }
  }
  return {
    className: 'insights-trend-neutral',
    text: `→ ${source} stable`,
  }
}

function formatTopSourceTrend(diff: number): { className: string; text: string } {
  if (diff > 0) {
    return { className: 'insights-trend-up', text: `↑ +${diff} vs prior period` }
  }
  if (diff < 0) {
    return { className: 'insights-trend-down', text: `↓ ${diff} vs prior period` }
  }
  return { className: 'insights-trend-neutral', text: '→ stable vs prior period' }
}

function SourceBar({ stat }: { stat: SourceStats }) {
  return (
    <div className="insights-row">
      <div className="insights-row-label">
        <span className="insights-row-source">{stat.source}</span>
        <span className="insights-row-count">
          {' '}
          — {stat.count} lead{stat.count === 1 ? '' : 's'}{' '}
          <span className="insights-percentage">({stat.percentage}%)</span>
        </span>
      </div>
      <div className="insights-bar" role="presentation">
        <div
          className="insights-bar-fill"
          style={{ width: `${Math.max(stat.percentage, stat.count > 0 ? 4 : 0)}%` }}
        />
      </div>
    </div>
  )
}

export function MarketingInsights({ bookings }: Props) {
  const [range, setRange] = useState<InsightsRange>('30d')
  const [customRange, setCustomRange] = useState<CustomRange>({ from: null, to: null })

  const rangeLabel = getRangeTitleLabel(range, customRange)

  const { sources, totalLeads, topSource, rangeReady } = useMemo(
    () => computeMarketingInsights(bookings, range, customRange),
    [bookings, range, customRange],
  )

  const topSourceTrend = topSource ? formatTopSourceTrend(topSource.trendDiff) : null

  const emptyMessage =
    range === 'custom' && !rangeReady
      ? 'Select a from and to date to view analytics.'
      : `No leads recorded for ${rangeLabel.toLowerCase()}.`

  return (
    <section
      className="marketing-insights-card admin-animate-in admin-animate-in--3"
      aria-labelledby="marketing-insights-title"
    >
      <div className="marketing-insights-header">
        <h2 id="marketing-insights-title" className="marketing-insights-title">
          Marketing Insights · {rangeLabel}
        </h2>

        <div className="insights-header-right">
          <label className="insights-range-label" htmlFor="insights-range">
            Time range
          </label>
          <select
            id="insights-range"
            className="insights-range-selector"
            value={range}
            onChange={(e) => setRange(e.target.value as InsightsRange)}
          >
            {INSIGHTS_RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {range === 'custom' && (
            <div className="insights-custom-range">
              <div className="insights-date-field">
                <label className="insights-date-label" htmlFor="insights-from">
                  From
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-icon" aria-hidden>
                    <IconCalendar size={14} />
                  </span>
                  <input
                    id="insights-from"
                    type="date"
                    className="insights-date-picker admin-filter-input admin-filter-input--with-icon admin-filter-input--date"
                    value={customRange.from ?? ''}
                    onChange={(e) =>
                      setCustomRange((prev) => ({
                        ...prev,
                        from: e.target.value || null,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="insights-date-field">
                <label className="insights-date-label" htmlFor="insights-to">
                  To
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-icon" aria-hidden>
                    <IconCalendar size={14} />
                  </span>
                  <input
                    id="insights-to"
                    type="date"
                    className="insights-date-picker admin-filter-input admin-filter-input--with-icon admin-filter-input--date"
                    value={customRange.to ?? ''}
                    onChange={(e) =>
                      setCustomRange((prev) => ({
                        ...prev,
                        to: e.target.value || null,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="marketing-insights-divider" aria-hidden />

      <div className="marketing-insights-body">
        <div className="marketing-insights-main">
          {!rangeReady || totalLeads === 0 ? (
            <p className="marketing-insights-empty">{emptyMessage}</p>
          ) : (
            <>
              <div className="marketing-insights-block">
                <h3 className="marketing-insights-subtitle">Source Breakdown</h3>
                <div className="marketing-insights-bars">
                  {sources.map((stat) => (
                    <SourceBar key={stat.source} stat={stat} />
                  ))}
                </div>
              </div>

              <div className="marketing-insights-metrics">
                <div className="marketing-insights-metric-col">
                  <h3 className="marketing-insights-subtitle">Conversion by Source</h3>
                  <ul className="marketing-insights-list">
                    {sources.map((stat) => (
                      <li key={`conv-${stat.source}`}>
                        {stat.source} — {stat.conversionRate}% booked
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="marketing-insights-metric-col">
                  <h3 className="marketing-insights-subtitle">Revenue by Source</h3>
                  <ul className="marketing-insights-list marketing-insights-list--revenue">
                    {sources.map((stat) => (
                      <li key={`rev-${stat.source}`}>
                        {stat.source} — {formatCurrency(stat.revenue)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="marketing-insights-metric-col">
                  <h3 className="marketing-insights-subtitle">Trends</h3>
                  <ul className="marketing-insights-list marketing-insights-list--trends">
                    {sources.map((stat) => {
                      const trend = formatTrend(stat.source, stat.trendDiff)
                      return (
                        <li key={`trend-${stat.source}`} className={trend.className}>
                          {trend.text}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {rangeReady && topSource && (
          <aside className="top-source-card">
            <div className="top-source-card-label">Top Source</div>
            <div className="top-source-card-name">
              {topSource.source} — {topSource.percentage}% of all leads
            </div>
            {topSourceTrend && (
              <div className={`top-source-card-trend ${topSourceTrend.className}`}>
                {topSourceTrend.text}
              </div>
            )}
          </aside>
        )}
      </div>
    </section>
  )
}
