import { useEffect, useState } from 'react';
import { Eye, EyeOff, RefreshCw, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/ArticleCard';
import { TokenBanner } from '@/components/TokenBanner';
import { useFeedStore } from '@/lib/store';

export default function NFTArt() {
  const { feeds, fetchFeeds } = useFeedStore();
  const [hiddenArticles, setHiddenArticles] = useState<Set<string>>(new Set());
  const [showHidden, setShowHidden] = useState(false);

  const articles = feeds.nftart || [];
  
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
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <div className="flex items-center gap-4 pt-8">
        <Palette className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">NFT & Art</h1>
          <p className="text-muted-foreground">Latest updates from the NFT and digital art world</p>
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
            {showHidden ? 'Hide Hidden' : `Show Hidden (${hiddenArticles.size})`}
          </Button>
          <Button
            onClick={() => fetchFeeds()}
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Feed
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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