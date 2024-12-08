import { cn } from '@/lib/utils';

interface PumpVisionLogoProps {
  className?: string;
  size?: number;
}

export function PumpVisionLogo({ className, size = 24 }: PumpVisionLogoProps) {
  return (
    <img 
      src="https://pump.fun/_next/image?url=%2Flogo.png&w=64&q=75"
      width={size}
      height={size}
      alt="Pump.fun"
      className={cn("rounded-full", className)}
    />
  );
}