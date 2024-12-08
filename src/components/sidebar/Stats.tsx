import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLeaderboardStore, useAuthStore } from '@/lib/store';
import { useState } from 'react';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import { Link } from 'react-router-dom';

export function Stats() {
  const userRank = useLeaderboardStore(state => state.getUserRank('2'));
  const { user } = useAuthStore();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <>
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/leaderboard" 
            className="flex items-center gap-2 hover:text-primary"
          >
            <Trophy className="h-4 w-4 text-primary" />
            <span className="font-medium">#{userRank}</span>
          </Link>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <LeaderboardModal 
        open={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
      />
    </>
  );
}