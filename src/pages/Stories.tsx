import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useFeedStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { groupSimilarArticles } from '@/lib/utils/groupArticles';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Stories() {
  const { feeds, fetchFeeds } = useFeedStore();

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  const stories = useMemo(() => {
    const allArticles = Object.values(feeds).flat();
    return groupSimilarArticles(allArticles);
  }, [feeds]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stories</h1>
        <Button
          onClick={() => fetchFeeds()}
          className="bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Stories
        </Button>
      </div>

      <div className="grid gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <div className="border-b border-border bg-muted/50 p-6">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <div className="mt-2 text-sm text-muted-foreground">
                {format(story.timestamp, 'MMM d, yyyy h:mm a')}
              </div>
            </div>

            <ScrollArea className="max-h-[400px]">
              <div className="grid gap-4 p-6">
                {story.articles.map((article) => (
                  <a
                    key={article.link}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    {article.image && (
                      <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={article.image}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium group-hover:text-primary">
                          {article.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      {article.description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {article.description.replace(/<[^>]*>/g, '')}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{new URL(article.link).hostname.replace('www.', '')}</span>
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
            </ScrollArea>
          </Card>
        ))}
      </div>
    </div>
  );
}