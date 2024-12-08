import { TokenBanner } from '@/components/TokenBanner';
import { MarketSentiment } from '@/components/predictions/MarketSentiment';
import { GroupSentiment } from '@/components/predictions/GroupSentiment';

export default function Predictions() {
  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Market Sentiment</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MarketSentiment />
        <GroupSentiment />
      </div>
    </div>
  );
}