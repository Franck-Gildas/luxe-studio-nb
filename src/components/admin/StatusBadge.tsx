import type { LeadStatus } from '@/lib/admin/types'

const STATUS_SLUG: Record<LeadStatus, string> = {
  New: 'new',
  Contacted: 'contacted',
  'Waiting on Reply': 'waiting',
  Booked: 'booked',
  'No-Show': 'noshow',
  'Not Interested': 'notinterested',
  Completed: 'completed',
}

const STATUS_CLASS: Record<LeadStatus, string> = {
  New: 'admin-status-badge--new',
  Contacted: 'admin-status-badge--contacted',
  'Waiting on Reply': 'admin-status-badge--waiting',
  Booked: 'admin-status-badge--booked',
  'No-Show': 'admin-status-badge--noshow',
  'Not Interested': 'admin-status-badge--notinterested',
  Completed: 'admin-status-badge--completed',
}

export function statusSlug(status: LeadStatus): string {
  return STATUS_SLUG[status]
}

export function statusColumnClass(status: LeadStatus): string {
  return `admin-pipeline-column--${STATUS_SLUG[status]}`
}

export function statusCardClass(status: LeadStatus): string {
  return `admin-lead-card--${STATUS_SLUG[status]}`
}

export function statusDotClass(status: LeadStatus): string {
  return `admin-status-dot admin-status-dot--${STATUS_SLUG[status]}`
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`admin-status-badge ${STATUS_CLASS[status]}`}>{status}</span>
  )
}
