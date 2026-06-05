'use client'

import { useCallback, useEffect, useState } from 'react'
import type { LeadStatus } from '@/lib/admin/types'
import {
  ARCHIVE_CHANGED_EVENT,
  getArchivedFromMap,
  getArchivedRows,
  setLeadArchived as persistLeadArchived,
} from '@/lib/admin/storage'

export function useArchivedLeads() {
  const [archivedRows, setArchivedRows] = useState<Set<number>>(() => new Set())
  const [archivedFromMap, setArchivedFromMap] = useState<Record<number, LeadStatus>>(() => ({}))

  const refresh = useCallback(() => {
    setArchivedRows(getArchivedRows())
    setArchivedFromMap(getArchivedFromMap())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(ARCHIVE_CHANGED_EVENT, refresh)
    return () => window.removeEventListener(ARCHIVE_CHANGED_EVENT, refresh)
  }, [refresh])

  const setLeadArchived = useCallback(
    (sheetRow: number, archived: boolean, fromStatus?: LeadStatus) => {
      persistLeadArchived(sheetRow, archived, fromStatus)
    },
    [],
  )

  const isArchived = useCallback(
    (sheetRow: number) =>
      archivedRows.has(sheetRow) ||
      Object.prototype.hasOwnProperty.call(archivedFromMap, sheetRow),
    [archivedRows, archivedFromMap],
  )

  const getArchivedFrom = useCallback(
    (sheetRow: number) => archivedFromMap[sheetRow],
    [archivedFromMap],
  )

  return { archivedRows, archivedFromMap, isArchived, getArchivedFrom, setLeadArchived, refresh }
}
