import { ChangeBadge } from '@/components/ui/ChangeBadge';
import { Sparkline } from '@/components/ui/Sparkline';
import type { ProductOverview } from '@/domain/entities/MarketOverview';
import { formatCOP } from '@/lib/format';

export function ProductTicker({ products }: { readonly products: readonly ProductOverview[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <article key={product.productSlug} className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-2xl">{product.emoji}</p>
              <h3 className="font-extrabold">{product.productName}</h3>
            </div>
            <ChangeBadge value={product.changePct} />
          </div>
          <p className="mt-2 text-2xl font-extrabold">
            {formatCOP(product.currentAverage)}{' '}
            <span className="text-xs font-semibold text-muted">/ {product.unit}</span>
          </p>
          <Sparkline values={product.history} className={product.changePct >= 0 ? 'text-up' : 'text-down'} />
          <p className="mt-2 text-xs text-muted">
            Mejor plaza: <strong className="text-fg">{product.bestMarket.city}</strong> ·{' '}
            {formatCOP(product.bestMarket.pricePerUnit)}
          </p>
        </article>
      ))}
    </div>
  );
}