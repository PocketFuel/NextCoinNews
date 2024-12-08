import { useState } from 'react';
import { ExternalLink, Eye, EyeOff, Star, Info, MessageSquare } from 'lucide-react';
import { useFeedStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArticleAge } from './ArticleAge';
import { ArticleCardBack } from './ArticleCardBack';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: any;
  isHidden?: boolean;
  onHide: () => void;
}

export function ArticleCard({ article, isHidden = false, onHide }: ArticleCardProps) {
  const { toggleFavorite, favorites } = useFeedStore();
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const isFavorited = favorites.includes(article.url || article.link);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const hasValidImage = article.image && !article.image.includes('undefined') && !imageError;
  const pubDate = new Date(article.pubDate || article.date_published || 0);
  const hostname = new URL(article.link).hostname.replace('www.', '');

  return (
    <div className="relative h-[500px] perspective-1000">
      <div className={cn(
        "h-full transition-transform duration-500 preserve-3d",
        isFlipped && "rotate-y-180"
      )}>
        {/* Front of card */}
        <Card className="group absolute inset-0 h-full transform overflow-hidden bg-black/40 transition-all duration-300 hover:bg-black/60 hover:shadow-lg backface-hidden">
          <div className="absolute right-2 top-2 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
              onClick={() => toggleFavorite(article.url || article.link)}
            >
              <Star 
                className={cn("h-4 w-4", isFavorited ? "text-yellow-500" : "text-white")} 
                fill={isFavorited ? "currentColor" : "none"} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
              onClick={onHide}
            >
              {isHidden ? (
                <EyeOff className="h-4 w-4 text-white" />
              ) : (
                <Eye className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>

          <div className="flex h-full flex-col">
            {hasValidImage && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2">
                <ArticleAge date={article.pubDate} className="inline-block" />
              </div>

              <a
                href={article.url || article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2"
              >
                <h3 className="line-clamp-2 text-lg font-semibold text-white group-hover:text-primary">
                  {article.title}
                </h3>
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <p className="mt-2 line-clamp-3 flex-grow text-sm text-gray-400">
                {stripHtml(article.description)}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <span>{hostname}</span>
                <span className="text-gray-600">•</span>
                <span>{format(pubDate, 'MMM d, yyyy h:mm a')}</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-4">
                  <Input 
                    placeholder="Search tokens..."
                    className="h-8 w-48 bg-white/5 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-white/5"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg bg-white/5"
                  onClick={() => setIsFlipped(true)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <ArticleCardBack 
          article={article}
          onClose={() => setIsFlipped(false)}
        />
      </div>
    </div>
  );
}