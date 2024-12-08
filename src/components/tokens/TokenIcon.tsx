import { cn } from '@/lib/utils';

interface TokenIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const sizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
};

export function TokenIcon({ symbol, size = 'md', className, icon: Icon }: TokenIconProps) {
  if (!Icon) {
    return (
      <div className={cn(
        "flex items-center justify-center rounded-full bg-primary/10",
        sizes[size],
        className
      )}>
        <span className="text-xs font-medium">{symbol}</span>
      </div>
    );
  }

  return (
    <div className={cn(sizes[size], className)}>
      <Icon className="h-full w-full" />
    </div>
  );
}