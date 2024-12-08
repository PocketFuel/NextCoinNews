import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MarketMetricProps {
  title: string;
  value: string;
  change: number;
  trend: number[];
}

export function MarketMetric({ title, value, change, trend }: MarketMetricProps) {
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const range = max - min;
  const height = 40;
  const width = 100;
  const padding = 1;

  const points = trend.map((value, i) => {
    const x = (i / (trend.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Card className="flex flex-col bg-card/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base text-muted-foreground">{title}</span>
        <span className={cn(
          "text-sm font-medium",
          change >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
      <div className="mb-4 text-2xl font-bold">{value}</div>
      <div className="h-16 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className={cn(
            "h-full w-full",
            change >= 0 ? "stroke-green-500" : "stroke-red-500"
          )}
        >
          <polyline
            points={points}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </Card>
  );
}