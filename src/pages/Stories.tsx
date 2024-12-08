import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { RefreshCw, ExternalLink, Newspaper } from 'lucide-react';
import { useFeedStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { groupSimilarArticles } from '@/lib/utils/groupArticles';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function Stories() {
  const { feeds, fetchFeeds } = useFeedStore();

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  const storiesBySection = useMemo(() => {
    const result: Record<string, ReturnType<typeof groupSimilarArticles>> = {};
    
    sections.forEach(({ key }) => {
      const sectionArticles = feeds[key] || [];
      result[key] = groupSimilarArticles(sectionArticles);
    });

    return result;
  }, [feeds]);

  const formatUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      if (hostname.length > 30) {
        return hostname.slice(0, 30) + '-\n' + hostname.slice(30);
      }
      return hostname;
    } catch {
      return url;
    }
  };

  const StoryCard = ({ story }: { story: any }) => {
    const hasMultipleArticles = story.articles.length > 1;
    
    return (
      <Card className="w-[300px] flex-none snap-start overflow-hidden sm:w-[350px] md:w-[400px]">
        <Accordion type="single" collapsible>
          <AccordionItem value="articles" className="border-none">
            <AccordionTrigger 
              className="px-6 py-4 hover:no-underline [&>svg]:hidden"
              disabled={!hasMultipleArticles}
            >
              <div className="flex flex-1 flex-col items-start text-left">
                <h2 className="text-lg font-semibold">{story.title}</h2>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {format(story.timestamp, 'MMM d, yyyy h:mm a')}
                  </span>
                  {hasMultipleArticles && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-primary">
                        {story.articles.length} related articles
                      </span>
                    </>
                  )}
                </div>
              </div>
            </AccordionTrigger>

            {hasMultipleArticles && (
              <AccordionContent>
                <div className="border-t border-border bg-muted/50 px-6 py-4">
                  <div className="space-y-4">
                    {story.articles.map((article: any) => (
                      <a
                        key={article.link}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium group-hover:text-primary">
                                {article.title}
                              </h3>
                              <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            {article.description && (
                              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                {article.description.replace(/<[^>]*>/g, '')}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="break-words">{formatUrl(article.link)}</span>
                            {article.pubDate && (
                              <>
                                <span>•</span>
                                <span>{format(new Date(article.pubDate), 'MMM d, yyyy h:mm a')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      </Card>
    );
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center gap-4">
        <Newspaper className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Stories</h1>
          <p className="text-muted-foreground">Latest news and updates</p>
        </div>
        <Button
          onClick={() => fetchFeeds()}
          className="ml-auto bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Stories
        </Button>
      </div>

      <div className="space-y-8">
        {sections.map(({ key, title }) => {
          const stories = storiesBySection[key] || [];
          if (stories.length === 0) return null;

          return (
            <section key={key} className="space-y-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              
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
                  {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}