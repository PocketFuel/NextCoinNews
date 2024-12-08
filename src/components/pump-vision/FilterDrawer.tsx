import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PumpVisionLogo } from './PumpVisionLogo';
import { Moon, Users, RotateCcw } from "lucide-react";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  section: string;
}

export function FilterDrawer({ open, onClose, section }: FilterDrawerProps) {
  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'new':
        return 'New Creations';
      case 'graduate':
        return 'About to Graduate';
      case 'graduated':
        return 'Graduated';
      default:
        return '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4 pb-4">
          <SheetTitle className="flex items-center gap-2">
            {getSectionTitle(section)} Filter
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PumpVisionLogo size={16} />
                <Label>Pump.fun Tokens</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <Label>Moonshot Tokens</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <Label>Top 10 Holders</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label>With at least 1 social</Label>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>B.Curve %</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="30" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dev holding %</Label>
                <Input type="number" placeholder="Min" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="4.9" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Holders</Label>
                <Input type="number" placeholder="12" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="Max" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Liquidity</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input type="number" placeholder="Min" className="pl-6" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input type="number" placeholder="Max" className="pl-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Volume</Label>
                <Input type="number" placeholder="700" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="Max" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Market Cap</Label>
                <Input type="number" placeholder="Min" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="11000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Token Age (mins)</Label>
                <Input type="number" placeholder="Min" />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Input type="number" placeholder="30" />
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex border-t border-border bg-background p-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button className="ml-2 flex-1 bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600">
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}