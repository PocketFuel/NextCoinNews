import { cn } from '@/lib/utils';
import { Header } from './sidebar/Header';
import { Stats } from './sidebar/Stats';
import Navigation from './sidebar/Navigation';
import { UserProfile } from './sidebar/UserProfile';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-background border-r border-border")}>
      <Header onClose={onClose} />
      <Stats />
      <Navigation onClose={onClose} />
      <UserProfile onClose={onClose} />
    </div>
  );
}