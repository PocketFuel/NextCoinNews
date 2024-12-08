import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface PredictionModalProps {
  open: boolean;
  onClose: () => void;
  token: {
    symbol: string;
    price: string;
  };
  type: 'long' | 'short';
  gems: number;
}

export function PredictionModal({ open, onClose, token, type, gems }: PredictionModalProps) {
  // Previous state and handlers remain the same...

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-x-0 bottom-0 top-auto mx-0 rounded-b-none rounded-t-xl p-0 sm:relative sm:mx-auto sm:max-w-lg sm:rounded-lg sm:p-6 md:p-8">
        {/* Previous modal content remains exactly the same... */}
      </DialogContent>
    </Dialog>
  );
}