import { useState } from 'react';
import { Gem } from 'lucide-react';
import { useTokenStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ShopModal } from './shop/ShopModal';

interface GemBalanceProps {
  className?: string;
  showIcon?: boolean;
}

export function GemBalance({ className, showIcon = true }: GemBalanceProps) {
  const { gems } = useTokenStore();
  const [showShop, setShowShop] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className={`flex items-center gap-2 ${className}`}
        onClick={() => setShowShop(true)}
      >
        {showIcon && <Gem className="h-4 w-4 text-primary" />}
        <span className="font-medium">{gems.toLocaleString()}</span>
      </Button>

      <ShopModal 
        open={showShop}
        onClose={() => setShowShop(false)}
      />
    </>
  );
}