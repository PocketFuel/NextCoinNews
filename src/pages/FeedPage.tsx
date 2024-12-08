import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFeedStore } from '@/lib/store';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

const feedTitles: Record<string, string> = {
  'animal-news': 'Animal News',
  'crypto': 'CoinMarketCap',
  'instagram': 'Instagram',
  'market': 'Market Analysis',
  'news': 'News',
  'search': 'Targeted Search',
  'tiktok': 'TikTok',
  'x-feed': 'X Feed',
  'youtube': 'YouTube',
};

export default function FeedPage() {
  const location = useLocation();
  const feedId = location.pathname.split('/')[1];
  const { feeds, fetchFeeds } = useFeedStore();
  const [hiddenArticles, setHiddenArticles] = useState<Set<string>>(new Set());
  const [showHidden, setShowHidden] = useState(false);

  const feedKey = feedId.replace(/-/g, '');
  const articles = feeds[feedKey] || [];
  
  const visibleArticles = articles.filter(article => 
    showHidden || !hiddenArticles.has(article.link || article.url)
  );

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  const handleHideArticle = (articleId: string) => {
    setHiddenArticles(prev => {
      const newSet = new Set(prev);
      if (prev.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{feedTitles[feedId]}</h1>
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
            {showHidden ? 'Hide Hidden' : `Show Hidden (${hiddenArticles.size})`}
          </Button>
          <Button
            onClick={() => fetchFeeds()}
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-primary-foreground hover:from-yellow-600 hover:to-green-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Feed
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleArticles.map((article) => (
          <ArticleCard
            key={article.url || article.link}
            article={article}
            isHidden={hiddenArticles.has(article.link || article.url)}
            onHide={() => handleHideArticle(article.link || article.url)}
          />
        ))}
      </div>

      {visibleArticles.length === 0 && (
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          No articles to display
        </div>
      )}
    </div>
  );
}