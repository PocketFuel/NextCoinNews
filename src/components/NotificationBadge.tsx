import { useNotificationStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  className?: string;
}

export function NotificationBadge({ className }: NotificationBadgeProps) {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  if (unreadCount === 0) return null;

  return (
    <div className={cn(
      "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white",
      className
    )}>
      {unreadCount > 9 ? '9+' : unreadCount}
    </div>
  );
}