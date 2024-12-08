import { NavLink } from 'react-router-dom';
import { Users, Star, MessageSquare, Home, LineChart, Trophy, Coins, Eye, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Stories', href: '/stories', icon: Newspaper },
  { name: 'Market Sentiment', href: '/predictions', icon: LineChart },
  { name: 'Tokens', href: '/tokens', icon: Coins },
  { name: 'Pump Vision', href: '/pump-vision', icon: Eye },
  { name: 'Favorites', href: '/favorites', icon: Star },
  { name: 'Blurts', href: '/blurts', icon: MessageSquare },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Team', href: '/team', icon: Users },
];

const feeds = [
  { name: 'X Feed', href: '/x-feed' },
  { name: 'Targeted Search', href: '/search' },
  { name: 'News', href: '/news' },
  { name: 'Market Analysis', href: '/market' },
  { name: 'NFT/Art', href: '/nft-art' },
  { name: 'TikTok', href: '/tiktok' },
  { name: 'YouTube', href: '/youtube' },
  { name: 'Instagram', href: '/instagram' },
];

interface NavigationProps {
  onClose?: () => void;
}

export default function Navigation({ onClose }: NavigationProps) {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto p-4">
      <div className="space-y-1">
        {mainNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
            onClick={onClose}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="space-y-1">
        <div className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Feeds
        </div>
        {feeds.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gradient-to-r from-yellow-500/10 to-green-500/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
            onClick={onClose}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}