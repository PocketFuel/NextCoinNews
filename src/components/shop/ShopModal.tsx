import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gem, ShoppingCart, Sparkles } from 'lucide-react';
import { useTokenStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PurchaseConfirmation } from './PurchaseConfirmation';

interface GemPack {
  id: string;
  gems: number;
  price: number;
  originalPrice: number;
  bonus?: number;
}

const gemPacks: GemPack[] = [
  { id: 'basic', gems: 1000, price: 5, originalPrice: 10 },
  { id: 'popular', gems: 2500, price: 10, originalPrice: 20, bonus: 500 },
  { id: 'pro', gems: 5000, price: 20, originalPrice: 40, bonus: 1500 },
  { id: 'elite', gems: 10000, price: 37.5, originalPrice: 75, bonus: 4000 },
  { id: 'ultimate', gems: 25000, price: 75, originalPrice: 150, bonus: 12500 },
];

interface ShopModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShopModal({ open, onClose }: ShopModalProps) {
  const [cart, setCart] = useState<GemPack[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState({ previous: 0, new: 0 });
  const { gems, updateGems } = useTokenStore();

  const addToCart = (pack: GemPack) => {
    setCart([...cart, pack]);
  };

  const removeFromCart = (packId: string) => {
    setCart(cart.filter(p => p.id !== packId));
  };

  const getTotalGems = () => {
    return cart.reduce((total, pack) => total + pack.gems + (pack.bonus || 0), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, pack) => total + pack.price, 0);
  };

  const handleCheckout = () => {
    const totalGems = getTotalGems();
    setPurchaseDetails({
      previous: gems,
      new: gems + totalGems
    });
    updateGems(totalGems);
    setCart([]);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[85vh] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gem className="h-5 w-5 text-primary" />
              GEMS Shop
            </DialogTitle>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Special Offer: 50% OFF All Packs!
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Cart Section */}
            {cart.length > 0 && (
              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-3 flex items-center gap-2 font-medium">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </h3>
                <div className="space-y-2">
                  {cart.map((pack) => (
                    <div
                      key={pack.id}
                      className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Gem className="h-4 w-4 text-primary" />
                        <span>
                          {pack.gems.toLocaleString()}
                          {pack.bonus && (
                            <span className="ml-1 text-primary">
                              +{pack.bonus.toLocaleString()}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div>${pack.price}</div>
                          <div className="text-xs text-muted-foreground line-through">
                            ${pack.originalPrice}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(pack.id)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Total:</div>
                    <div className="font-medium">
                      {getTotalGems().toLocaleString()} GEMS
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
                    onClick={handleCheckout}
                  >
                    Checkout ${getTotalPrice()}
                  </Button>
                </div>
              </div>
            )}

            {/* Shop Items */}
            <ScrollArea className="h-[calc(85vh-400px)] pr-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {gemPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className="flex flex-col justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Gem className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {pack.gems.toLocaleString()}
                          </span>
                          {pack.bonus && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                              +{pack.bonus.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-primary">
                            ${pack.price}
                          </span>
                          <span className="text-muted-foreground line-through">
                            ${pack.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
                      onClick={() => addToCart(pack)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <PurchaseConfirmation
        open={showConfirmation}
        onClose={handleConfirmationClose}
        previousBalance={purchaseDetails.previous}
        newBalance={purchaseDetails.new}
      />
    </>
  );
}