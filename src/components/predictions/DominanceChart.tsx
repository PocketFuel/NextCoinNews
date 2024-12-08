import { Card } from '@/components/ui/card';

interface DominanceChartProps {
  data: Array<{
    symbol: string;
    value: number;
  }>;
}

export function DominanceChart({ data }: DominanceChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const others = 100 - total;

  return (
    <Card className="flex flex-col bg-card/50 p-4">
      <span className="mb-4 text-base text-muted-foreground">Dominance</span>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.symbol} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card">
              <span className="text-sm font-semibold">{item.symbol}</span>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-green-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-16 text-right font-medium">{item.value}%</span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-medium text-muted-foreground">Other</span>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-muted-foreground/20"
                style={{ width: `${others}%` }}
              />
            </div>
            <span className="w-16 text-right font-medium">{others.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}