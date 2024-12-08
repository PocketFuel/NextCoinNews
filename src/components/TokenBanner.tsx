import { useRef, useState } from 'react';
import { TokenCard } from './tokens/TokenCard';
import { tokens } from '@/lib/tokens';
import { Button } from '@/components/ui/button';
import { Settings, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { EditFeedsModal } from './feeds/EditFeedsModal';
import { GemBalance } from './GemBalance';
import { ShopModal } from './shop/ShopModal';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export function TokenBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEditFeeds, setShowEditFeeds] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Hide Market Overview on specific pages
  const shouldHide = [
    '/notifications', 
    '/blurts', 
    '/favorites',
    '/predictions',
    '/pump-vision',
    '/team',
    '/settings',
    '/disclaimer',
    '/terms',
    '/privacy',
    '/nft-art'
  ].includes(location.pathname);

  if (shouldHide) return null;

  return (
    <div className={cn(
      "w-full bg-background pt-6 transition-all duration-400 ease-in-out",
      isCollapsed ? "h-0 overflow-hidden" : "h-auto"
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Market Overview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditFeeds(true)}
              className="hidden items-center gap-2 sm:flex"
            >
              <Settings className="h-4 w-4" />
              Edit Feeds
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEditFeeds(true)}
              className="h-8 w-8 sm:hidden"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowShop(true)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <GemBalance />
          </div>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <div 
            ref={containerRef}
            className="no-scrollbar flex gap-4 overflow-x-auto pb-6"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {tokens.map((token, index) => (
              <TokenCard key={token.symbol} token={token} index={index} />
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        {isCollapsed ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      <EditFeedsModal 
        open={showEditFeeds}
        onClose={() => setShowEditFeeds(false)}
      />

      <ShopModal 
        open={showShop}
        onClose={() => setShowShop(false)}
      />
    </div>
  );
}