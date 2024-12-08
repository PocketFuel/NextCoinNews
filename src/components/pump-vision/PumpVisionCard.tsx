import { cn } from '@/lib/utils';
import { Copy, MessageSquare, Globe } from 'lucide-react';

interface TokenStats {
  volume: string;
  marketCap: string;
  holders: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

interface TokenCardProps {
  symbol: string;
  name: string;
  time: string;
  redPercent: number;
  greenPercent: number;
  bluePercent: number;
  stats: TokenStats;
}

export function PumpVisionCard({
  symbol,
  name,
  time,
  redPercent,
  greenPercent,
  bluePercent,
  stats
}: TokenCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-sm font-semibold">{symbol[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{symbol}</span>
              <span className="text-sm text-muted-foreground">({name})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>{time}</span>
              <div className="flex items-center gap-1">
                <span className="text-red-500">{redPercent}%</span>
                <span className="text-green-500">{greenPercent}%</span>
                <span className="text-blue-500">{bluePercent}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            $5
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <div>
          <span>V: {stats.volume}</span>
          <span className="mx-2">•</span>
          <span>MC: {stats.marketCap}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>{stats.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Copy className="h-3 w-3" />
            <span>{stats.shares}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>{stats.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}