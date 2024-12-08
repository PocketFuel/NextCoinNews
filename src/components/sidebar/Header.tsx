import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  onClose?: () => void;
}

export function Header({ onClose }: HeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-border px-6">
      <NavLink to="/">
        <Logo />
      </NavLink>
      {onClose && (
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}