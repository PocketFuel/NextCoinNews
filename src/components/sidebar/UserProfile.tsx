import { Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/store';

export function UserProfile({ onClose }: { onClose?: () => void }) {
  const { user } = useAuthStore();

  return (
    <div className="border-t border-border p-4 space-y-4">
      <div className="flex items-center gap-3 px-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{user?.username}</span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium',
              isActive
                ? 'bg-gradient-to-r from-yellow-500/10 to-green-500/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )
          }
          onClick={onClose}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </NavLink>
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}