import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function GroupSentiment() {
  const data = {
    totalPredictions: 1243,
    longPercentage: 65,
    shortPercentage: 35,
    averageLeverage: 12.4,
    totalValue: '$2.4M',
    winRate: 68,
  };

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Users className="h-5 w-5 text-primary" />
        Group Sentiment
      </h2>

      <Card className="overflow-hidden">
        <div className="flex h-2">
          <div
            className="bg-green-500"
            style={{ width: `${data.longPercentage}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${data.shortPercentage}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
          <div>
            <div className="text-sm text-muted-foreground">Total Predictions</div>
            <div className="text-2xl font-bold">{data.totalPredictions}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Long/Short Ratio</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-500">
                {data.longPercentage}%
              </span>
              <span className="text-2xl font-bold text-red-500">
                {data.shortPercentage}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Avg. Leverage</div>
            <div className="text-2xl font-bold">{data.averageLeverage}x</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-2xl font-bold">{data.totalValue}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-2xl font-bold text-primary">{data.winRate}%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}