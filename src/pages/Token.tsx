import { useParams } from 'react-router-dom';
import { tokens } from '@/lib/tokens';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TokenChart } from '@/components/tokens/TokenChart';
import { PredictionForm } from '@/components/tokens/PredictionForm';

export default function Token() {
  const { symbol } = useParams();
  const token = tokens.find(t => t.symbol.toLowerCase() === symbol?.toLowerCase());

  if (!token) {
    return <div>Token not found</div>;
  }

  const metrics = {
    holders: 245789,
    holdersChange: 2.5,
    avgHoldingTime: '6.2 months',
    topHolderBalance: '12.5M',
    top10Holders: '32.4%',
    uniqueHolders: '245,789',
    totalHolders: '1,245,789'
  };

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <span className="text-lg font-semibold">{token.symbol}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{token.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium">{token.price}</span>
            <span className={cn(
              "text-sm font-medium",
              token.priceChange >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {token.priceChange > 0 ? '+' : ''}{token.priceChange}%
            </span>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-xl font-medium">{token.marketCap}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Volume (24h)</div>
            <div className="text-xl font-medium">{token.volume}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Holders</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-medium">
                {metrics.totalHolders}
              </span>
              <span className={cn(
                "text-sm font-medium",
                metrics.holdersChange >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {metrics.holdersChange > 0 ? '+' : ''}{metrics.holdersChange}%
              </span>
            </div>
          </div>
        </div>

        <TokenChart data={token.chartData} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <Card className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5 text-primary" />
            Holder Analytics
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Avg. Holding Time</div>
              <div className="text-2xl font-medium">{metrics.avgHoldingTime}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Top Holder Balance</div>
              <div className="text-2xl font-medium">{metrics.topHolderBalance}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Top 10 Holders %</div>
              <div className="text-2xl font-medium">{metrics.top10Holders}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Unique Holders</div>
              <div className="text-2xl font-medium">{metrics.uniqueHolders}</div>
            </div>
          </div>
        </Card>

        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
          <PredictionForm token={token} />
        </div>
      </div>
    </div>
  );
}