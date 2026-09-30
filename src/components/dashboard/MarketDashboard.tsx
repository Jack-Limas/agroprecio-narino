'use client';

import { PriceMatrix } from '@/components/dashboard/PriceMatrix';
import { ProductTicker } from '@/components/dashboard/ProductTicker';
import { TrendPanel } from '@/components/dashboard/TrendPanel';
import { KpiCard } from '@/components/ui/KpiCard';
import { PageAge } from '@/components/ui/PageAge';
import { PatternZone } from '@/components/ui/PatternZone';
import { useOverview } from '@/hooks/useOverview';
import { formatPercent } from '@/lib/format';

export function MarketDashboard() {
  const { data, error, refresh } = useOverview();

  return (
    <PatternZone pattern="csr" label="Mercado en vivo" generatedAt={data?.generatedAt ?? null}>
      <section aria-labelledby="live-title" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="live-title" className="text-2xl font-extrabold">
              Mercado en vivo
            </h2>
            <p className="text-sm text-muted">
              {data ? (
                <>
                  Actualizado hace <PageAge generatedAt={data.generatedAt} /> · se refresca cada 30 s
                </>
              ) : (
                'Descargando datos desde /api/overview…'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold hover:bg-surface-2"
          >
            ↻ Actualizar ahora
          </button>
        </div>

        {error && (
          <p className="rounded-2xl border border-down/40 bg-down/10 p-4 text-sm text-down">
            {data
              ? `No se pudo actualizar (${error}). Mostrando los últimos datos.`
              : `No se pudieron cargar los datos (${error}).`}
          </p>
        )}

        {!data && !error && (
          <div className="grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-36 rounded-2xl bg-surface-2" />
            ))}
          </div>
        )}

        {data && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                label="Mercados monitoreados"
                value={String(data.markets.length)}
                hint={`${data.products.length} productos`}
              />
              {data.riser && (
                <KpiCard
                  label="Mayor alza hoy"
                  value={`${data.riser.emoji} ${data.riser.productName}`}
                  hint={`${formatPercent(data.riser.changePct, true)} vs. ayer`}
                  tone={data.riser.changePct >= 0 ? 'up' : 'down'}
                />
              )}
              {data.faller && (
                <KpiCard
                  label="Mayor baja hoy"
                  value={`${data.faller.emoji} ${data.faller.productName}`}
                  hint={`${formatPercent(data.faller.changePct, true)} vs. ayer`}
                  tone={data.faller.changePct >= 0 ? 'up' : 'down'}
                />
              )}
              {data.topMarket && (
                <KpiCard
                  label="Mejor plaza para vender"
                  value={data.topMarket.city}
                  hint={`Lidera en ${data.topMarket.wins} de ${data.products.length} productos`}
                  tone="up"
                />
              )}
            </div>

            <ProductTicker products={data.products} />

            <div>
              <h3 className="mb-3 text-lg font-extrabold">Tendencia de 14 días</h3>
              <TrendPanel products={data.products} dates={data.dates} />
            </div>

            <div>
              <h3 className="mb-3 text-lg font-extrabold">Comparador de plazas</h3>
              <PriceMatrix quotes={data.quotes} markets={data.markets} />
            </div>
          </>
        )}
      </section>
    </PatternZone>
  );
}