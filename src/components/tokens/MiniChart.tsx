import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
  className?: string;
  onClick?: () => void;
}

export function MiniChart({ data, isPositive, className, onClick }: MiniChartProps) {
  const points = useMemo(() => {
    if (!data.length) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const height = 20;
    const width = 60;
    const step = width / (data.length - 1);

    return data
      .map((value, i) => {
        const x = i * step;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }, [data]);

  return (
    <div 
      className={cn(
        "relative h-5 w-24 cursor-pointer transition-opacity hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 60 20"
        className={cn(
          "h-full w-full",
          isPositive ? "stroke-green-500" : "stroke-red-500"
        )}
      >
        <polyline
          points={points}
          fill="none"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}