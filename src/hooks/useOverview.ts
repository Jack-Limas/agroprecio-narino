'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MarketOverview } from '@/domain/entities/MarketOverview';

export function useOverview(refreshMs = 30_000) {
  const [data, setData] = useState<MarketOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/overview', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = (await response.json()) as MarketOverview;
      if (mounted.current) {
        setData(json);
        setError(null);
      }
    } catch (cause) {
      if (mounted.current) setError(cause instanceof Error ? cause.message : 'Error desconocido');
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void refresh();
    const id = setInterval(() => void refresh(), refreshMs);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [refresh, refreshMs]);

  return { data, error, refresh };
}