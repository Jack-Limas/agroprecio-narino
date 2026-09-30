import Link from 'next/link';
import { MarketDashboard } from '@/components/dashboard/MarketDashboard';
import { PatternZone } from '@/components/ui/PatternZone';
import { priceService } from '@/lib/container';
import { RENDERING_PATTERNS } from '@/lib/patterns';

export const dynamic = 'force-static';

export default async function HomePage() {
  const [catalog, markets] = await Promise.all([priceService.getCatalog(), priceService.getMarkets()]);
  const generatedAt = new Date().toISOString();

  return (
    <div className="space-y-16">
      <PatternZone pattern="ssg" label="Portada" generatedAt={generatedAt}>
        <section className="rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-600 p-8 text-white shadow-lg sm:p-10">
          <p className="text-xs font-semibold tracking-widest text-emerald-100 uppercase">
            Precios agrícolas · Nariño
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">Vende tu cosecha donde mejor se paga</h1>
          <p className="mt-3 max-w-2xl text-emerald-50">
            Compara los precios de papa, café, panela y leche en {markets.length} plazas de mercado, calcula
            tu ganancia neta y consulta el boletín del día.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ssr"
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50"
            >
              Buscar precios
            </Link>
            <Link
              href="/csr"
              className="rounded-full border border-white/60 px-5 py-2 text-sm font-bold hover:bg-white/10"
            >
              Simular ganancias
            </Link>
          </div>
        </section>
      </PatternZone>

      <MarketDashboard />

      <PatternZone pattern="ssg" label="Catálogo" generatedAt={generatedAt}>
        <section aria-labelledby="catalog-title">
          <h2 id="catalog-title" className="mb-4 text-2xl font-extrabold">
            Productos y guías de cultivo
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.map((product) => (
              <Link
                key={product.id}
                href={`/ssg/${product.slug}`}
                className="rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-3xl">{product.emoji}</p>
                <h3 className="mt-2 text-lg font-extrabold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">{product.description}</p>
                <p className="mt-3 text-xs font-semibold text-brand">Ver guía →</p>
              </Link>
            ))}
          </div>
        </section>
      </PatternZone>

      <section aria-labelledby="patterns-title">
        <h2 id="patterns-title" className="mb-4 text-2xl font-extrabold">
          Qué patrón usa cada pantalla
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {RENDERING_PATTERNS.map((pattern) => (
            <Link
              key={pattern.id}
              href={pattern.href}
              className={`block rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${pattern.accent}`}
            >
              <h3 className="text-xl font-extrabold">
                {pattern.label} <span className="text-sm font-semibold">· {pattern.title}</span>
              </h3>
              <p className="mt-2 text-sm">{pattern.useCase}</p>
              <p className="mt-3 text-xs">
                <strong>Ventaja:</strong> {pattern.advantage}
              </p>
              <p className="mt-1 text-xs">
                <strong>Cuello de botella:</strong> {pattern.bottleneck}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}