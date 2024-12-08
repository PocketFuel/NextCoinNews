import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankBadgeProps {
  rank: number;
  className?: string;
  showIcon?: boolean;
}

export function RankBadge({ rank, className, showIcon = true }: RankBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <Trophy className="h-4 w-4 text-primary" />}
      <span className="font-medium">#{rank}</span>
    </div>
  );
}