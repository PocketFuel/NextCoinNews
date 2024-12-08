import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface PredictionFormProps {
  token: {
    symbol: string;
    name: string;
    price: string;
  };
}

export function PredictionForm({ token }: PredictionFormProps) {
  const [amount, setAmount] = useState(50);
  const [leverage, setLeverage] = useState(20);
  const [type, setType] = useState<'long' | 'short'>('long');

  const position = amount * leverage;
  const entryPrice = parseFloat(token.price.replace('$', ''));
  const liquidationPrice = type === 'long' 
    ? entryPrice * 0.95 
    : entryPrice * 1.05;

  const leverageMarks = [1.1, 20, 40, 60, 80, 100];

  return (
    <Card className="h-full overflow-auto p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Predict the price of {token.name}
      </h2>

      <div className="space-y-6">
        <div className="flex rounded-full bg-muted p-1">
          <Button
            variant={type === 'long' ? 'default' : 'ghost'}
            className={cn(
              "flex-1",
              type === 'long' && "bg-green-500 text-white hover:bg-green-600"
            )}
            onClick={() => setType('long')}
          >
            Long
          </Button>
          <Button
            variant={type === 'short' ? 'default' : 'ghost'}
            className={cn(
              "flex-1",
              type === 'short' && "bg-red-500 text-white hover:bg-red-600"
            )}
            onClick={() => setType('short')}
          >
            Short
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">You're Paying</h4>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pr-16"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-sm text-muted-foreground">GEMS</span>
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                ${amount.toFixed(2)}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Size of {type === 'long' ? 'Long' : 'Short'}</h4>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary" />
                  <span>{token.symbol}</span>
                </div>
                <span>{(position / entryPrice).toFixed(8)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Leverage</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setLeverage(Math.max(1.1, leverage - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium">{leverage}x</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setLeverage(Math.min(100, leverage + 1))}
                >
                  +
                </Button>
              </div>
              <Slider
                value={[leverage]}
                min={1.1}
                max={100}
                step={0.1}
                onValueChange={([value]) => setLeverage(value)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {leverageMarks.map((mark) => (
                  <span key={mark}>{mark}x</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collateral</span>
              <span>{amount.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size in USD</span>
              <span>{position.toFixed(2)} USD</span>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
          >
            Place Prediction
          </Button>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entry price</span>
              <span>${entryPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Liquidation price</span>
              <span>${liquidationPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Open fee (0.06%)</span>
              <span>{(position * 0.0006).toFixed(4)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price impact (0.01%)</span>
              <span>{(position * 0.0001).toFixed(4)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Borrow rate</span>
              <span>0.0116% / hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available liquidity</span>
              <span>$2,500,000</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}