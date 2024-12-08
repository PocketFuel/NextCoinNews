import { useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { useFeedStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/HeroSection';
import { FeedSection } from '@/components/FeedSection';
import { TokenBanner } from '@/components/TokenBanner';

export default function Dashboard() {
  const { feeds, fetchFeeds } = useFeedStore();

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  // Combine all feeds for trending section
  const heroArticles = useMemo(() => {
    const allArticles = Object.values(feeds).flat();
    const uniqueArticles = allArticles.reduce((acc, article) => {
      const url = article.link || article.url;
      if (!acc.some(a => (a.link || a.url) === url)) {
        acc.push(article);
      }
      return acc;
    }, [] as any[]);

    return uniqueArticles
      .sort((a, b) => {
        const dateA = new Date(a.pubDate || a.date_published || 0);
        const dateB = new Date(b.pubDate || b.date_published || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  }, [feeds]);

  const sections = [
    { key: 'xfeed', title: 'X Feed' },
    { key: 'search', title: 'Targeted Search' },
    { key: 'news', title: 'News' },
    { key: 'market', title: 'Market Analysis' },
    { key: 'nftart', title: 'NFT/Art' },
    { key: 'tiktok', title: 'TikTok' },
    { key: 'youtube', title: 'YouTube' },
    { key: 'instagram', title: 'Instagram' },
  ];

  return (
    <div className="container mx-auto space-y-8">
      <div className="sticky top-16 z-30 -mx-4 bg-background px-4 pb-4">
        <TokenBanner />
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Trending Now</h1>
          <Button
            onClick={() => fetchFeeds()}
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
        </div>

        <div className="mb-9">
          <HeroSection articles={heroArticles} />
        </div>

        <div className="grid gap-8">
          {sections.map(({ key, title }) => (
            <FeedSection
              key={key}
              feedKey={key}
              title={title}
              articles={feeds[key] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}