import { formatPercent } from '@/lib/format';

export function ChangeBadge({ value }: { readonly value: number }) {
  const up = value >= 0;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
        up ? 'bg-up/15 text-up' : 'bg-down/15 text-down'
      }`}
    >
      {up ? '▲' : '▼'} {formatPercent(Math.abs(value))}
    </span>
  );
}