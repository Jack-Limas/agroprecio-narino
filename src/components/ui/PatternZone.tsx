'use client';

import type { ReactNode } from 'react';
import { PageAge } from '@/components/ui/PageAge';
import { useWorkshopMode } from '@/hooks/useWorkshopMode';
import { getPattern, type PatternId } from '@/lib/patterns';

interface PatternZoneProps {
  readonly pattern: PatternId;
  readonly label: string;
  readonly generatedAt?: string | null;
  readonly className?: string;
  readonly children: ReactNode;
}

export function PatternZone({
  pattern,
  label,
  generatedAt = null,
  className = '',
  children,
}: PatternZoneProps) {
  const [enabled] = useWorkshopMode();

  if (!enabled) return <div className={className}>{children}</div>;

  const info = getPattern(pattern);

  return (
    <div
      className={`relative rounded-3xl outline-2 outline-offset-8 outline-dashed ${info.zone} ${className}`}
    >
      <div
        title={info.how}
        className={`absolute -top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow ${info.chip}`}
      >
        <span>{info.label}</span>
        <span className="opacity-90">· {label}</span>
        <span className="opacity-90">
          · {generatedAt ? <PageAge generatedAt={generatedAt} /> : 'cargando…'}
        </span>
      </div>
      {children}
    </div>
  );
}