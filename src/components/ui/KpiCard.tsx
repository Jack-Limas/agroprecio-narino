type Tone = 'neutral' | 'up' | 'down';

interface KpiCardProps {
  readonly label: string;
  readonly value: string;
  readonly hint?: string;
  readonly tone?: Tone;
}

const TONE_CLASS: Record<Tone, string> = {
  neutral: 'text-muted',
  up: 'text-up',
  down: 'text-down',
};

export function KpiCard({ label, value, hint, tone = 'neutral' }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 text-xl font-extrabold">{value}</p>
      {hint && <p className={`mt-1 text-xs font-semibold ${TONE_CLASS[tone]}`}>{hint}</p>}
    </div>
  );
}