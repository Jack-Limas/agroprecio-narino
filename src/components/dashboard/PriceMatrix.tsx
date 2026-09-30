import type { Market } from '@/domain/entities/Market';
import type { PriceQuote } from '@/domain/entities/PriceQuote';
import { formatCOP } from '@/lib/format';

interface PriceMatrixProps {
  readonly quotes: readonly PriceQuote[];
  readonly markets: readonly Market[];
}

export function PriceMatrix({ quotes, markets }: PriceMatrixProps) {
  const prices = new Map(quotes.map((quote) => [`${quote.productSlug}|${quote.city}`, quote.pricePerUnit] as const));
  const rows = Array.from(
    new Map(quotes.map((quote) => [quote.productSlug, quote] as const)).values(),
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-surface-2 text-muted">
            <tr>
              <th className="sticky left-0 bg-surface-2 px-4 py-3">Producto</th>
              {markets.map((market) => (
                <th key={market.id} className="px-4 py-3 text-right">
                  {market.city}
                  <span className="block text-[11px] font-normal">{market.distanceKm} km</span>
                </th>
              ))}
              <th className="px-4 py-3 text-right">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const values = markets.map((market) => prices.get(`${row.productSlug}|${market.city}`) ?? 0);
              const max = Math.max(...values);
              const min = Math.min(...values);
              const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

              return (
                <tr key={row.productSlug} className="border-t border-line">
                  <td className="sticky left-0 bg-surface px-4 py-3 font-semibold">
                    {row.emoji} {row.productName}
                    <span className="ml-1 text-xs font-normal text-muted">/ {row.unit}</span>
                  </td>
                  {values.map((value, index) => (
                    <td
                      key={markets[index].id}
                      className={`px-4 py-3 text-right ${
                        value === max
                          ? 'bg-up/15 font-bold text-up'
                          : value === min
                            ? 'font-semibold text-down'
                            : ''
                      }`}
                    >
                      {formatCOP(value)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right font-semibold">{formatCOP(average)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        Verde: mejor plaza para vender · Rojo: la plaza con el precio más bajo.
      </p>
    </div>
  );
}