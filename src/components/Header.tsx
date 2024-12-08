import { Bell, Menu, Star, MessageSquare, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { NotificationBadge } from './NotificationBadge';
import { GlobalSearch } from './GlobalSearch';

interface HeaderProps {
  className?: string;
  onMenuClick: () => void;
}

export default function Header({ className, onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNotificationClick = () => {
    if (location.pathname === '/notifications') {
      navigate('/');
    } else {
      navigate('/notifications');
    }
  };

  return (
    <header className={`border-b border-border bg-background/80 px-4 backdrop-blur-sm ${className}`}>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="lg:hidden">
            <Logo />
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="mx-4 flex-1 lg:mx-8">
            <GlobalSearch />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate('/favorites')}
          >
            <Star className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate('/leaderboard')}
          >
            <LineChart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate('/blurts')}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4" />
              <NotificationBadge />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}