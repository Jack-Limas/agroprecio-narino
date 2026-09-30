export interface ChartSeries {
  readonly label: string;
  readonly color: string;
  readonly values: readonly number[];
}

interface TrendChartProps {
  readonly series: readonly ChartSeries[];
  readonly startLabel: string;
  readonly endLabel: string;
  readonly formatValue: (value: number) => string;
}

const WIDTH = 600;
const HEIGHT = 200;

export function TrendChart({ series, startLabel, endLabel, formatValue }: TrendChartProps) {
  const all = series.flatMap((item) => item.values);
  if (all.length === 0) return null;

  const min = Math.min(...all);
  const max = Math.max(...all);
  const span = max - min || 1;

  const toPoints = (values: readonly number[]) =>
    values
      .map((value, index) => {
        const x = values.length === 1 ? WIDTH / 2 : (index / (values.length - 1)) * WIDTH;
        const y = HEIGHT - ((value - min) / span) * (HEIGHT - 16) - 8;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div>
      <div className="flex justify-between text-xs text-muted">
        <span>Máx. {formatValue(max)}</span>
        <span>Mín. {formatValue(min)}</span>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="mt-1 h-56 w-full text-line"
        role="img"
        aria-label="Tendencia de precios"
      >
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={0}
            x2={WIDTH}
            y1={HEIGHT * fraction}
            y2={HEIGHT * fraction}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {series.map((item) => (
          <polyline
            key={item.label}
            points={toPoints(item.values)}
            fill="none"
            stroke={item.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="flex justify-between text-xs text-muted">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}