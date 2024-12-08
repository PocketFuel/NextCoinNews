import { useState } from 'react';
import { Trophy, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLeaderboardStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const { entries, getTopPerformers, getWeeklyTopPerformers } = useLeaderboardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'weekly'>('all');

  const displayedEntries = (selectedPeriod === 'all' ? getTopPerformers() : getWeeklyTopPerformers())
    .filter(entry => entry.username.toLowerCase().includes(searchQuery.toLowerCase()));

  const stats = {
    totalUsers: entries.length,
    totalPredictions: entries.reduce((sum, entry) => sum + entry.totalTrades, 0),
    avgWinRate: entries.reduce((sum, entry) => sum + entry.winRate, 0) / entries.length,
    totalGems: entries.reduce((sum, entry) => sum + entry.gems, 0),
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center gap-4">
        <Trophy className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">Top performers and their achievements</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Total Users</div>
          <div className="mt-2 text-2xl font-bold">{stats.totalUsers}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Total Predictions</div>
          <div className="mt-2 text-2xl font-bold">{stats.totalPredictions}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Average Win Rate</div>
          <div className="mt-2 text-2xl font-bold">{stats.avgWinRate.toFixed(1)}%</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">Total GEMS</div>
          <div className="mt-2 text-2xl font-bold">{stats.totalGems.toLocaleString()}</div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              <Button
                variant={selectedPeriod === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('all')}
              >
                All Time
              </Button>
              <Button
                variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('weekly')}
              >
                Weekly
              </Button>
            </div>
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>

          <div className="space-y-4">
            {displayedEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    #{index + 1}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {entry.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{entry.username}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{entry.winRate}% Win Rate</span>
                      <span>•</span>
                      <span>{entry.totalTrades} trades</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Best Trade</div>
                    <div className="font-medium text-green-500">
                      +${entry.bestTrade.profit.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {selectedPeriod === 'all' ? 'Total P&L' : 'Weekly P&L'}
                    </div>
                    <div className={cn(
                      "font-medium",
                      selectedPeriod === 'all'
                        ? entry.totalPnl >= 0 ? "text-green-500" : "text-red-500"
                        : entry.weeklyPnl >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {selectedPeriod === 'all' ? (
                        <>
                          {entry.totalPnl >= 0 ? '+' : '-'}$
                          {Math.abs(entry.totalPnl).toLocaleString()}
                        </>
                      ) : (
                        <>
                          {entry.weeklyPnl >= 0 ? '+' : '-'}$
                          {Math.abs(entry.weeklyPnl).toLocaleString()}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">GEMS</div>
                    <div className="text-xl font-bold text-primary">
                      {entry.gems.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}