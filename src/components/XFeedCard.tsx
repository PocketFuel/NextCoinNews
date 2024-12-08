import { formatDistanceToNow, parseISO } from 'date-fns';
import { MessageSquare, Repeat2, Heart, Share } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArticleInteractions } from './ArticleInteractions';

interface XFeedCardProps {
  tweet: any;
  isHidden?: boolean;
  onHide: () => void;
}

export function XFeedCard({ tweet, isHidden, onHide }: XFeedCardProps) {
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string) => {
    try {
      // Try to parse the ISO date string
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      // Fallback to a generic timestamp if parsing fails
      return 'recently';
    }
  };

  return (
    <Card className="group relative h-full transform overflow-hidden bg-card transition-all duration-300 hover:bg-card/80 hover:shadow-lg">
      <div className="flex h-full flex-col p-4">
        <div className="mb-3 flex items-center gap-3">
          {tweet.image && (
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={tweet.image}
                alt={tweet.creator || 'Profile'}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-semibold">{tweet.creator || 'Anonymous'}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(tweet.pubDate)}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm">{stripHtml(tweet.description)}</p>
          {tweet.media && tweet.media.content && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <img
                src={tweet.media.content}
                alt="Tweet media"
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className="mt-auto flex justify-between border-t border-border pt-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span className="text-xs">24</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Repeat2 className="mr-1 h-4 w-4" />
            <span className="text-xs">12</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Heart className="mr-1 h-4 w-4" />
            <span className="text-xs">148</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share className="mr-1 h-4 w-4" />
          </Button>
        </div>

        <ArticleInteractions articleId={tweet.id} />
      </div>
    </Card>
  );
}