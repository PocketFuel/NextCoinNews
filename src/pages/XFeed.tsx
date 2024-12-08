import { useEffect, useState } from 'react';
import { Eye, EyeOff, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XFeedCard } from '@/components/XFeedCard';
import { TokenBanner } from '@/components/TokenBanner';

export default function XFeed() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [hiddenTweets, setHiddenTweets] = useState<Set<string>>(new Set());

  const fetchTweets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://rss.app/feeds/v1.1/_dBVHpAr8JnfItN5b.json');
      const data = await response.json();
      setTweets(data.items);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const visibleTweets = tweets.filter(tweet => 
    showHidden || !hiddenTweets.has(tweet.id)
  );

  const handleHideTweet = (tweetId: string) => {
    setHiddenTweets(prev => {
      const newSet = new Set(prev);
      if (prev.has(tweetId)) {
        newSet.delete(tweetId);
      } else {
        newSet.add(tweetId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <div className="flex items-center gap-4 pt-8">
        <MessageCircle className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">X Feed</h1>
          <p className="text-muted-foreground">Latest updates from X</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHidden(!showHidden)}
            className="flex items-center gap-2"
          >
            {showHidden ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {showHidden ? 'Hide Hidden' : `Show Hidden (${hiddenTweets.size})`}
          </Button>
          <Button
            onClick={fetchTweets}
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Feed
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTweets.map((tweet) => (
          <XFeedCard
            key={tweet.id}
            tweet={tweet}
            isHidden={hiddenTweets.has(tweet.id)}
            onHide={() => handleHideTweet(tweet.id)}
          />
        ))}
      </div>

      {visibleTweets.length === 0 && (
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          No tweets to display
        </div>
      )}
    </div>
  );
}