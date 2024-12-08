import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FearAndGreedGaugeProps {
  value: number;
  label: string;
}

export function FearAndGreedGauge({ value, label }: FearAndGreedGaugeProps) {
  // Calculate rotation based on value (0-100)
  const rotation = -90 + (value / 100) * 180;

  // Determine color segments with padding
  const segments = [
    { color: '#ef4444', label: 'Extreme Fear' },   // Red
    { color: '#f97316', label: 'Fear' },           // Orange
    { color: '#eab308', label: 'Neutral' },        // Yellow
    { color: '#84cc16', label: 'Greed' },          // Light Green
    { color: '#22c55e', label: 'Extreme Greed' }   // Green
  ];

  return (
    <Card className="flex flex-col bg-card/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base text-muted-foreground">Fear & Greed</span>
        <span className="text-lg font-bold text-yellow-500">{value}</span>
      </div>
      
      <div className="relative h-[120px]">
        <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 160 160" className="h-full w-full">
            {/* Gauge segments with padding */}
            {segments.map((segment, index) => {
              const startAngle = -180 + (index * 36);
              const endAngle = -180 + ((index + 1) * 36) - 2; // 2 degrees padding
              const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
              
              const startX = 80 + 70 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 80 + 70 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 80 + 70 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 80 + 70 * Math.sin((endAngle * Math.PI) / 180);

              return (
                <path
                  key={index}
                  d={`M ${startX} ${startY} A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  className={cn(
                    "transition-opacity",
                    value >= index * 20 && value <= (index + 1) * 20 ? "opacity-100" : "opacity-30"
                  )}
                />
              );
            })}

            {/* Needle */}
            <g transform={`rotate(${rotation}, 80, 80)`}>
              <line
                x1="80"
                y1="80"
                x2="80"
                y2="20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="80" cy="80" r="4" fill="white" />
            </g>
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
      </div>
    </Card>
  );
}