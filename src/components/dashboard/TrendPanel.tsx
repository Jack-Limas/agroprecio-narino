'use client';

import { useState } from 'react';
import { TrendChart, type ChartSeries } from '@/components/ui/TrendChart';
import type { ProductOverview } from '@/domain/entities/MarketOverview';
import { formatCOP, formatPercent, formatShortDate } from '@/lib/format';

const PALETTE = ['#0ea5e9', '#f59e0b', '#10b981', '#a855f7', '#ef4444'];

interface TrendPanelProps {
  readonly products: readonly ProductOverview[];
  readonly dates: readonly string[];
}

export function TrendPanel({ products, dates }: TrendPanelProps) {
  const [selected, setSelected] = useState('all');
  const active = products.find((product) => product.productSlug === selected);

  const series: ChartSeries[] = active
    ? [
        {
          label: active.productName,
          color: PALETTE[products.indexOf(active) % PALETTE.length],
          values: active.history,
        },
      ]
    : products.map((product, index) => ({
        label: product.productName,
        color: PALETTE[index % PALETTE.length],
        values: product.history.map((value) => (value / (product.history[0] || 1)) * 100),
      }));

  const tabClass = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-semibold transition ${
      isActive ? 'bg-brand text-on-brand' : 'bg-surface-2 text-muted hover:text-fg'
    }`;

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setSelected('all')} className={tabClass(!active)}>
          Todos (índice 100)
        </button>
        {products.map((product) => (
          <button
            key={product.productSlug}
            type="button"
            onClick={() => setSelected(product.productSlug)}
            className={tabClass(selected === product.productSlug)}
          >
            {product.emoji} {product.productName}
          </button>
        ))}
      </div>

      <TrendChart
        series={series}
        startLabel={dates.length > 0 ? formatShortDate(dates[0]) : ''}
        endLabel={dates.length > 0 ? formatShortDate(dates[dates.length - 1]) : ''}
        formatValue={active ? formatCOP : (value) => `${value.toFixed(0)} pts`}
      />

      {!active && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {products.map((product, index) => (
            <li key={product.productSlug} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
              />
              <span className="font-semibold">{product.productName}</span>
              <span className={product.changePct >= 0 ? 'text-up' : 'text-down'}>
                {formatPercent(product.changePct, true)} hoy
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}