import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { MarketMetric } from './MarketMetric';
import { FearAndGreedGauge } from './FearAndGreedGauge';
import { DominanceChart } from './DominanceChart';
import { getFearAndGreedIndex, getMarketMetrics } from '@/lib/api/coinmarketcap';
import { formatCurrency } from '@/lib/utils';

export function MarketSentiment() {
  const [fearAndGreed, setFearAndGreed] = useState({ value: 84, classification: 'Extreme Greed' });
  const [metrics, setMetrics] = useState({
    marketCap: { value: 3.4e12, change: 2.36 },
    volume: { value: 166.9e9, change: 3.14 },
    btcDominance: 56.77,
    ethDominance: 12.76
  });

  useEffect(() => {
    async function fetchData() {
      const [fng, marketMetrics] = await Promise.all([
        getFearAndGreedIndex(),
        getMarketMetrics()
      ]);
      
      setFearAndGreed(fng);
      setMetrics(marketMetrics);
    }

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <TrendingUp className="h-5 w-5 text-primary" />
        Market Metrics
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <MarketMetric
          title="Market Cap"
          value={formatCurrency(metrics.marketCap.value)}
          change={metrics.marketCap.change}
          trend={[64, 68, 70, 73, 72, 75, 78, 80, 82, 85]}
        />
        <MarketMetric
          title="Volume"
          value={formatCurrency(metrics.volume.value)}
          change={metrics.volume.change}
          trend={[45, 52, 45, 58, 54, 48, 52, 50, 48, 46]}
        />
        <FearAndGreedGauge 
          value={fearAndGreed.value} 
          label={fearAndGreed.classification} 
        />
        <DominanceChart
          data={[
            { symbol: "BTC", value: metrics.btcDominance },
            { symbol: "ETH", value: metrics.ethDominance },
          ]}
        />
      </div>
    </div>
  );
}