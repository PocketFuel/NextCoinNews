import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Gem, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PurchaseConfirmationProps {
  open: boolean;
  onClose: () => void;
  previousBalance: number;
  newBalance: number;
}

export function PurchaseConfirmation({ 
  open, 
  onClose, 
  previousBalance,
  newBalance 
}: PurchaseConfirmationProps) {
  const [currentValue, setCurrentValue] = useState(previousBalance);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const increment = (newBalance - previousBalance) / steps;
      const stepDuration = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          setCurrentValue(newBalance);
          setIsAnimating(false);
          clearInterval(interval);
          setTimeout(onClose, 1000); // Close after 1 second
        } else {
          setCurrentValue(prev => {
            const next = prev + increment;
            // Ease out cubic
            const t = step / steps;
            const progress = 1 - Math.pow(1 - t, 3);
            return previousBalance + (newBalance - previousBalance) * progress;
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [open, previousBalance, newBalance]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-6 py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold">Purchase Complete!</h2>
            <p className="text-muted-foreground">Your GEMS have been added to your balance</p>
          </div>
          <div className="flex items-center gap-2 text-3xl font-bold">
            <Gem className={cn(
              "h-8 w-8 text-primary transition-transform",
              isAnimating && "animate-bounce"
            )} />
            <span>{Math.round(currentValue).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}