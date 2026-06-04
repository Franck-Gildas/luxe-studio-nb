'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  REMINDER_CHANGED_EVENT,
  getFollowUps,
  type FollowUpsStore,
} from '@/lib/admin/followups'

export function useFollowUps(): FollowUpsStore {
  const [store, setStore] = useState<FollowUpsStore>({})

  const refresh = useCallback(() => {
    setStore(getFollowUps())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(REMINDER_CHANGED_EVENT, refresh)
    return () => window.removeEventListener(REMINDER_CHANGED_EVENT, refresh)
  }, [refresh])

  return store
}
