import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useCommentStore, useFeedStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { ArticleCard } from '@/components/ArticleCard';
import { TokenBanner } from '@/components/TokenBanner';

export default function Blurts() {
  const { comments } = useCommentStore();
  const { feeds } = useFeedStore();

  const timeline = useMemo(() => {
    const allArticles = Object.values(feeds).flat();
    return comments.map(comment => ({
      comment,
      article: allArticles.find(a => a.id === comment.articleId),
      timestamp: comment.timestamp,
    })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [comments, feeds]);

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 pb-4 pt-4 backdrop-blur-sm">
        <TokenBanner />
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blurts Timeline</h1>
      </div>

      <div className="space-y-6">
        {timeline.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No comments yet. Start commenting on articles to see them here!
          </Card>
        ) : (
          timeline.map((item) => (
            <Card key={item.comment.id} className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {item.comment.username}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      commented {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      {item.comment.content}
                    </p>
                  </div>
                </div>

                {item.article && (
                  <div className="w-full lg:w-[400px]">
                    <ArticleCard
                      article={item.article}
                      isHidden={false}
                      onHide={() => {}}
                    />
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}