'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { workshopStore } from '@/lib/WorkshopModeStore';

export function useWorkshopMode(): readonly [boolean, (value: boolean) => void] {
  const enabled = useSyncExternalStore(
    workshopStore.subscribe,
    workshopStore.getSnapshot,
    workshopStore.getServerSnapshot,
  );
  const setEnabled = useCallback((value: boolean) => workshopStore.set(value), []);
  return [enabled, setEnabled] as const;
}