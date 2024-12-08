import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PumpVisionCard } from '@/components/pump-vision/PumpVisionCard';
import { FilterDrawer } from '@/components/pump-vision/FilterDrawer';
import { PumpVisionLogo } from '@/components/pump-vision/PumpVisionLogo';
import { pumpVisionData } from '@/lib/pump-vision-data';
import { cn } from '@/lib/utils';

export default function PumpVision() {
  const [activeSection, setActiveSection] = useState('new');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="space-y-8 pb-20 pt-12">
      <div className="flex items-center gap-4">
        <PumpVisionLogo size={32} />
        <div>
          <h1 className="text-2xl font-bold">Pump Vision</h1>
          <p className="text-muted-foreground">
            Find the best pump.fun and Moonshot tokens and track latest migrations
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {pumpVisionData.sections.map((section) => (
          <div 
            key={section.id}
            className={cn(
              "space-y-4",
              activeSection !== section.id && "hidden lg:block"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilterOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="grid max-h-[calc(100vh-300px)] gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
              {section.tokens.map((token) => (
                <PumpVisionCard key={`${section.id}-${token.symbol}`} {...token} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-border bg-background/80 p-4 backdrop-blur-sm lg:hidden">
        {pumpVisionData.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "flex flex-col items-center gap-1",
              activeSection === section.id 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="text-xs">{section.title}</span>
          </button>
        ))}
      </div>

      <FilterDrawer 
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        section={activeSection}
      />
    </div>
  );
}