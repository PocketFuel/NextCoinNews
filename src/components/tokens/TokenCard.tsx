import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PredictionModal } from './PredictionModal';
import { useTokenStore } from '@/lib/store';
import { MiniChart } from './MiniChart';
import { TokenIcon } from './TokenIcon';
import { useNavigate } from 'react-router-dom';
import type { Token } from '@/lib/tokens/data';

interface TokenCardProps {
  token: Token;
  index: number;
}

export function TokenCard({ token, index }: TokenCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [predictionType, setPredictionType] = useState<'long' | 'short'>('long');
  const { gems } = useTokenStore();
  const navigate = useNavigate();

  const handlePrediction = (type: 'long' | 'short', e: React.MouseEvent) => {
    e.stopPropagation();
    setPredictionType(type);
    setShowModal(true);
  };

  return (
    <>
      <div 
        className="flex min-w-[280px] flex-shrink-0 flex-col justify-center rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-card cursor-pointer"
        onClick={() => navigate(`/token/${token.symbol.toLowerCase()}`)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              #{index + 1}
            </span>
            <TokenIcon symbol={token.symbol} icon={token.icon} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{token.symbol}</span>
                <span className="text-sm text-foreground">{token.price}</span>
                <span className={cn(
                  "text-xs",
                  token.priceChange >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {token.priceChange > 0 ? '+' : ''}{token.priceChange}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>MC: {token.marketCap}</span>
                <span className="text-muted-foreground/50">•</span>
                <span>VOL: {token.volume}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MiniChart 
              data={token.chartData} 
              isPositive={token.priceChange >= 0}
              className="hidden sm:block"
            />
            <div className="flex flex-col gap-1">
              <button
                onClick={(e) => handlePrediction('long', e)}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded transition-colors",
                  token.priceChange >= 0 
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                    : "text-muted-foreground hover:bg-green-500/10 hover:text-green-500"
                )}
              >
                <TrendingUp className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => handlePrediction('short', e)}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded transition-colors",
                  token.priceChange < 0 
                    ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" 
                    : "text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                )}
              >
                <TrendingDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <PredictionModal 
        open={showModal}
        onClose={() => setShowModal(false)}
        token={token}
        type={predictionType}
        gems={gems}
      />
    </>
  );
}