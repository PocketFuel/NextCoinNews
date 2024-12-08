import { useState } from 'react';
import { Eye, EyeOff, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArticleCard } from './ArticleCard';
import { useFeedStore } from '@/lib/store';

interface FeedSectionProps {
  title: string;
  articles: any[];
  feedKey: string;
}

export function FeedSection({ title, articles, feedKey }: FeedSectionProps) {
  const [showHidden, setShowHidden] = useState(false);
  const [hiddenArticles, setHiddenArticles] = useState<Set<string>>(new Set());
  const { fetchFeeds } = useFeedStore();

  // Deduplicate articles based on URL
  const uniqueArticles = articles?.reduce((acc, article) => {
    const url = article.link || article.url;
    if (!acc.some(a => (a.link || a.url) === url)) {
      acc.push(article);
    }
    return acc;
  }, []) || [];

  const visibleArticles = uniqueArticles.filter(article => 
    showHidden || !hiddenArticles.has(article.link || article.url)
  );

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

  // Convert feedKey to URL path
  const getFeedPath = (key: string) => {
    switch (key) {
      case 'animalnews':
        return 'animal-news';
      case 'xfeed':
        return 'x-feed';
      default:
        return key;
    }
  };

  if (!articles?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
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
            variant="outline"
            size="sm"
            onClick={() => fetchFeeds()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
            asChild
          >
            <Link to={`/${getFeedPath(feedKey)}`}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div 
          className="no-scrollbar flex gap-6 overflow-x-auto pb-6"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {visibleArticles.map((article) => (
            <div 
              key={article.link || article.url}
              className="w-[300px] flex-none snap-start sm:w-[320px] md:w-[340px]"
              style={{
                opacity: hiddenArticles.has(article.link || article.url) ? 0.5 : 1,
              }}
            >
              <ArticleCard 
                article={article} 
                isHidden={hiddenArticles.has(article.link || article.url)}
                onHide={() => handleHideArticle(article.link || article.url)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}