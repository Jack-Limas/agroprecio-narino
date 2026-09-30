'use client';

import { useWorkshopMode } from '@/hooks/useWorkshopMode';
import { RENDERING_PATTERNS } from '@/lib/patterns';

export function WorkshopToggle() {
  const [enabled, setEnabled] = useWorkshopMode();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
      {enabled && (
        <aside className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-4 text-sm shadow-xl">
          <h2 className="font-extrabold">Modo taller activo</h2>
          <p className="mt-1 text-xs text-muted">
            Cada zona punteada muestra el patrón que la renderiza y la antigüedad de sus datos.
          </p>
          <ul className="mt-3 space-y-2">
            {RENDERING_PATTERNS.map((pattern) => (
              <li key={pattern.id} className="flex gap-2">
                <span className={`h-fit rounded-full px-2 py-0.5 text-[11px] font-bold ${pattern.chip}`}>
                  {pattern.label}
                </span>
                <span className="text-xs text-muted">{pattern.advantage}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <button
        type="button"
        aria-pressed={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`rounded-full px-4 py-2 text-sm font-bold shadow-lg transition ${
          enabled
            ? 'bg-brand text-on-brand'
            : 'border border-line bg-surface text-fg hover:bg-surface-2'
        }`}
      >
        🔬 Modo taller {enabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}