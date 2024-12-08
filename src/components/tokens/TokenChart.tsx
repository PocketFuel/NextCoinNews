import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface TokenChartProps {
  data: number[];
}

export function TokenChart({ data }: TokenChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, i) => {
      const x = (i / (data.length - 1)) * canvas.width;
      const y = canvas.height - ((value - min) / range) * canvas.height;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data]);

  return (
    <div className="h-[400px] w-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="h-full w-full"
      />
    </div>
  );
}