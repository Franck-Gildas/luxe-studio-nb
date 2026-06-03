'use client'

import { useState } from 'react'
import type { Lead, LeadStatus } from '@/lib/admin/types'
import { STATUS_PIPELINE } from '@/lib/admin/types'
import { LeadCard } from '@/components/admin/LeadCard'
import { statusColumnClass } from '@/components/admin/StatusBadge'

type Props = {
  leads: Lead[]
  onStatusChange: (sheetRow: number, status: LeadStatus) => void
  onViewLead: (lead: Lead) => void
}

export function LeadPipeline({ leads, onStatusChange, onViewLead }: Props) {
  const [draggingRow, setDraggingRow] = useState<number | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<LeadStatus | null>(null)

  function handleDragStart(sheetRow: number) {
    setDraggingRow(sheetRow)
  }

  function handleDragEnd() {
    setDraggingRow(null)
    setDragOverStatus(null)
  }

  function handleDragOver(e: React.DragEvent, status: LeadStatus) {
    e.preventDefault()
    setDragOverStatus(status)
  }

  function handleDragLeave() {
    setDragOverStatus(null)
  }

  function handleDrop(e: React.DragEvent, status: LeadStatus) {
    e.preventDefault()
    if (draggingRow !== null) {
      onStatusChange(draggingRow, status)
    }
    setDraggingRow(null)
    setDragOverStatus(null)
  }

  return (
    <section className="admin-pipeline admin-animate-in admin-animate-in--5">
      <h2 className="admin-section-title">Lead Pipeline</h2>
      <div className="admin-pipeline-scroll">
        {STATUS_PIPELINE.map((status) => {
          const columnLeads = leads.filter((l) => l.effectiveStatus === status)
          return (
            <div
              key={status}
              className={`admin-pipeline-column ${statusColumnClass(status)}${dragOverStatus === status ? ' admin-pipeline-column--drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="admin-pipeline-column-header">
                <span className="admin-pipeline-column-title">{status}</span>
                <span className="admin-pipeline-count">{columnLeads.length}</span>
              </div>
              <div className="admin-pipeline-cards">
                {columnLeads.length === 0 ? (
                  <p className="admin-pipeline-empty">Drop leads here</p>
                ) : (
                  columnLeads.map((lead) => (
                    <LeadCard
                      key={lead.sheetRow}
                      lead={lead}
                      isDragging={draggingRow === lead.sheetRow}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onClick={() => onViewLead(lead)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
