'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AdminBooking } from '@/lib/google-sheets'
import type { Lead, LeadStatus } from '@/lib/admin/types'
import { STATUS_PIPELINE } from '@/lib/admin/types'
import { LeadCard } from '@/components/admin/LeadCard'
import { statusColumnClass } from '@/components/admin/StatusBadge'
import { useFollowUps } from '@/lib/admin/use-followups'
import { useArchivedLeads } from '@/lib/admin/use-archived-leads'
import { AddLeadPanel } from '@/components/admin/AddLeadPanel'
import { useMediaQuery } from '@/lib/use-media-query'

const FINAL_STATUSES: LeadStatus[] = ['Completed', 'Not Interested']
const EDGE_SCROLL_ZONE_PX = 80
const EDGE_SCROLL_SPEED_PX = 10

type PendingMove = {
  targetStatus: LeadStatus
  sourceStatus: LeadStatus
  kind: 'final-to-active' | 'final-to-final'
}

type Props = {
  leads: Lead[]
  onStatusChange: (sheetRow: number, status: LeadStatus) => void
  onViewLead: (lead: Lead) => void
  onAddLead: (booking: AdminBooking) => void
}

function isFinalStatus(status: LeadStatus): boolean {
  return FINAL_STATUSES.includes(status)
}

export function LeadPipeline({ leads, onStatusChange, onViewLead, onAddLead }: Props) {
  const touchPipeline = useMediaQuery('(hover: none)')
  const followUps = useFollowUps()
  const { archivedRows, isArchived, getArchivedFrom, setLeadArchived } = useArchivedLeads()
  const [showArchived, setShowArchived] = useState(false)
  const [pendingArchiveRows, setPendingArchiveRows] = useState<Set<number>>(() => new Set())
  const [pendingMoves, setPendingMoves] = useState<Map<number, PendingMove>>(() => new Map())
  const [archivingOutRows, setArchivingOutRows] = useState<Set<number>>(() => new Set())
  const [draggingRow, setDraggingRow] = useState<number | null>(null)
  const [dragSourceStatus, setDragSourceStatus] = useState<LeadStatus | null>(null)
  const [archiveDismissedOnDrag, setArchiveDismissedOnDrag] = useState<Set<number>>(
    () => new Set(),
  )
  const [dragOverStatus, setDragOverStatus] = useState<LeadStatus | null>(null)
  const [addLeadOpen, setAddLeadOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollDirectionRef = useRef<-1 | 0 | 1>(0)
  const scrollAnimationRef = useRef<number | null>(null)

  const stopEdgeScroll = useCallback(() => {
    scrollDirectionRef.current = 0
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
    }
  }, [])

  const edgeScrollStep = useCallback(function step() {
    const el = scrollRef.current
    const direction = scrollDirectionRef.current
    if (!el || direction === 0) {
      scrollAnimationRef.current = null
      return
    }
    el.scrollLeft += direction * EDGE_SCROLL_SPEED_PX
    scrollAnimationRef.current = requestAnimationFrame(step)
  }, [])

  const updateEdgeScroll = useCallback(
    (clientX: number) => {
      const el = scrollRef.current
      if (!el || draggingRow === null) {
        stopEdgeScroll()
        return
      }

      const rect = el.getBoundingClientRect()
      let direction: -1 | 0 | 1 = 0
      if (clientX < rect.left + EDGE_SCROLL_ZONE_PX) {
        direction = -1
      } else if (clientX > rect.right - EDGE_SCROLL_ZONE_PX) {
        direction = 1
      }

      if (direction === scrollDirectionRef.current) return

      stopEdgeScroll()
      scrollDirectionRef.current = direction
      if (direction !== 0) {
        edgeScrollStep()
      }
    },
    [draggingRow, edgeScrollStep, stopEdgeScroll],
  )

  useEffect(() => () => stopEdgeScroll(), [stopEdgeScroll])

  const leadsByRow = useMemo(() => {
    const map = new Map<number, Lead>()
    for (const lead of leads) {
      map.set(lead.sheetRow, lead)
    }
    return map
  }, [leads])

  const archivedInViewCount = useMemo(
    () => leads.filter((l) => archivedRows.has(l.sheetRow)).length,
    [leads, archivedRows],
  )

  const visibleLeads = useMemo(
    () => leads.filter((l) => showArchived || !isArchived(l.sheetRow)),
    [leads, showArchived, isArchived],
  )

  const addPendingArchive = useCallback((sheetRow: number) => {
    setPendingArchiveRows((prev) => new Set(prev).add(sheetRow))
  }, [])

  const removePendingArchive = useCallback((sheetRow: number) => {
    setPendingArchiveRows((prev) => {
      if (!prev.has(sheetRow)) return prev
      const next = new Set(prev)
      next.delete(sheetRow)
      return next
    })
  }, [])

  const clearPendingMove = useCallback((sheetRow: number) => {
    setPendingMoves((prev) => {
      if (!prev.has(sheetRow)) return prev
      const next = new Map(prev)
      next.delete(sheetRow)
      return next
    })
  }, [])

  const clearDragState = useCallback(() => {
    setDraggingRow(null)
    setDragSourceStatus(null)
    setDragOverStatus(null)
  }, [])

  function handleDragStart(sheetRow: number) {
    const lead = leadsByRow.get(sheetRow)
    const sourceStatus = lead?.effectiveStatus ?? null
    setDraggingRow(sheetRow)
    setDragSourceStatus(sourceStatus)

    if (
      sourceStatus &&
      isFinalStatus(sourceStatus) &&
      pendingArchiveRows.has(sheetRow)
    ) {
      removePendingArchive(sheetRow)
      setArchiveDismissedOnDrag((prev) => new Set(prev).add(sheetRow))
    }
  }

  function handleDragEnd() {
    stopEdgeScroll()
    clearDragState()
  }

  function handlePipelineDragOver(e: React.DragEvent) {
    e.preventDefault()
    updateEdgeScroll(e.clientX)
  }

  function handleDragOver(e: React.DragEvent, status: LeadStatus) {
    e.preventDefault()
    setDragOverStatus(status)
    updateEdgeScroll(e.clientX)
  }

  function handleDragLeave() {
    setDragOverStatus(null)
  }

  function applyStatusMove(
    sheetRow: number,
    sourceStatus: LeadStatus,
    targetStatus: LeadStatus,
  ) {
    if (sourceStatus === targetStatus) return

    if (isFinalStatus(sourceStatus)) {
      const kind: PendingMove['kind'] = isFinalStatus(targetStatus)
        ? 'final-to-final'
        : 'final-to-active'
      setPendingMoves((prev) => {
        const next = new Map(prev)
        next.set(sheetRow, { targetStatus, sourceStatus, kind })
        return next
      })
      removePendingArchive(sheetRow)
    } else {
      onStatusChange(sheetRow, targetStatus)
      if (isFinalStatus(targetStatus)) {
        addPendingArchive(sheetRow)
      }
    }
  }

  function handleStatusPickerChange(sheetRow: number, targetStatus: LeadStatus) {
    const lead = leadsByRow.get(sheetRow)
    if (!lead) return
    applyStatusMove(sheetRow, lead.effectiveStatus, targetStatus)
  }

  function handleDrop(e: React.DragEvent, targetStatus: LeadStatus) {
    e.preventDefault()
    const sheetRow = draggingRow
    const sourceStatus = dragSourceStatus

    if (sheetRow !== null && sourceStatus !== null) {
      if (sourceStatus === targetStatus) {
        if (isFinalStatus(sourceStatus) && archiveDismissedOnDrag.has(sheetRow)) {
          addPendingArchive(sheetRow)
          setArchiveDismissedOnDrag((prev) => {
            const next = new Set(prev)
            next.delete(sheetRow)
            return next
          })
        }
      } else {
        applyStatusMove(sheetRow, sourceStatus, targetStatus)
        setArchiveDismissedOnDrag((prev) => {
          const next = new Set(prev)
          next.delete(sheetRow)
          return next
        })
      }
    }

    stopEdgeScroll()
    clearDragState()
  }

  function handleConfirmMove(sheetRow: number) {
    const pending = pendingMoves.get(sheetRow)
    if (!pending) return

    onStatusChange(sheetRow, pending.targetStatus)
    clearPendingMove(sheetRow)

    if (isFinalStatus(pending.targetStatus)) {
      addPendingArchive(sheetRow)
    }
  }

  function handleCancelMove(sheetRow: number) {
    const pending = pendingMoves.get(sheetRow)
    clearPendingMove(sheetRow)

    if (pending && isFinalStatus(pending.sourceStatus)) {
      addPendingArchive(sheetRow)
    }
  }

  function handleManualArchive(sheetRow: number, fromStatus: LeadStatus) {
    setArchivingOutRows((prev) => new Set(prev).add(sheetRow))
    window.setTimeout(() => {
      setLeadArchived(sheetRow, true, fromStatus)
      setArchivingOutRows((prev) => {
        const next = new Set(prev)
        next.delete(sheetRow)
        return next
      })
      removePendingArchive(sheetRow)
      clearPendingMove(sheetRow)
    }, 280)
  }

  function handleConfirmArchive(sheetRow: number) {
    const lead = leadsByRow.get(sheetRow)
    if (lead) {
      handleManualArchive(sheetRow, lead.effectiveStatus)
    }
  }

  function handleDismissArchive(sheetRow: number) {
    removePendingArchive(sheetRow)
  }

  function handleRestore(sheetRow: number) {
    setLeadArchived(sheetRow, false)
    removePendingArchive(sheetRow)
    clearPendingMove(sheetRow)
  }

  return (
    <section className="admin-pipeline admin-animate-in admin-animate-in--5">
      <div className="admin-pipeline-toolbar">
        <div className="admin-pipeline-toolbar-left">
          <h2 className="admin-section-title">Lead Pipeline</h2>
          {archivedInViewCount > 0 && (
            <span className="admin-pipeline-archived-count">
              {archivedInViewCount} archived
            </span>
          )}
        </div>
        <div className="admin-pipeline-toolbar-right">
          <button
            type="button"
            className="admin-add-lead-btn"
            onClick={() => setAddLeadOpen(true)}
          >
            + Add Lead
          </button>
          <label className="admin-pipeline-show-archived">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />
            <span>Show Archived</span>
          </label>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="admin-pipeline-scroll"
        onDragOver={handlePipelineDragOver}
      >
        {STATUS_PIPELINE.map((status) => {
          const columnLeads = visibleLeads.filter((l) => l.effectiveStatus === status)
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
                  <p className="admin-pipeline-empty">
                    {touchPipeline ? 'No leads' : 'Drop leads here'}
                  </p>
                ) : (
                  columnLeads.map((lead) => {
                    const reminder = followUps[String(lead.sheetRow)] ?? null
                    const archived = isArchived(lead.sheetRow)
                    const pendingMove = pendingMoves.get(lead.sheetRow)
                    const archivedFrom =
                      showArchived && archived
                        ? (getArchivedFrom(lead.sheetRow) ?? lead.effectiveStatus)
                        : undefined
                    return (
                      <LeadCard
                        key={lead.sheetRow}
                        lead={lead}
                        reminder={reminder}
                        isDragging={draggingRow === lead.sheetRow}
                        isArchived={archived}
                        showRestore={showArchived && archived}
                        archivedFrom={archivedFrom}
                        isArchivingOut={archivingOutRows.has(lead.sheetRow)}
                        showArchivePrompt={
                          pendingArchiveRows.has(lead.sheetRow) && !pendingMove
                        }
                        pendingMove={pendingMove}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onClick={() => onViewLead(lead)}
                        onArchive={() =>
                          handleManualArchive(lead.sheetRow, lead.effectiveStatus)
                        }
                        onRestore={showArchived && archived ? handleRestore : undefined}
                        onConfirmArchive={handleConfirmArchive}
                        onDismissArchive={handleDismissArchive}
                        onConfirmMove={handleConfirmMove}
                        onCancelMove={handleCancelMove}
                        draggable={!touchPipeline}
                        showStatusPicker={touchPipeline}
                        onStatusChange={handleStatusPickerChange}
                      />
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="admin-pipeline-auto-archive-note">
        Leads marked Completed or Not Interested are auto-archived after 30 days
      </p>

      <AddLeadPanel
        open={addLeadOpen}
        onClose={() => setAddLeadOpen(false)}
        onSubmit={onAddLead}
      />
    </section>
  )
}
