import { useMemo } from 'react';
import { useFeedStore } from '@/lib/store';
import { ArticleCard } from '@/components/ArticleCard';
import { TokenBanner } from '@/components/TokenBanner';

export default function Favorites() {
  const { feeds, favorites } = useFeedStore();
  
  const favoriteArticles = useMemo(() => {
    const allArticles = Object.values(feeds).flat();
    return allArticles.filter((article) => 
      favorites.includes(article.url || article.link)
    );
  }, [feeds, favorites]);

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Favorites</h1>
      </div>

      {favoriteArticles.length === 0 ? (
        <div className="flex h-96 items-center justify-center text-muted-foreground">
          No favorite articles yet
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteArticles.map((article) => (
            <ArticleCard
              key={article.url || article.link}
              article={article}
              isHidden={false}
              onHide={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}