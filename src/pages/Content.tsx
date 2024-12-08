import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ExternalLink, Tag, Clock, Filter, SortDesc } from 'lucide-react';
import { useContentStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Content() {
  const { articles, isLoading, error, fetchArticles } = useContentStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const categorizedArticles = useMemo(() => {
    const grouped = articles.reduce((acc, article) => {
      const categories = article.categories || ['Uncategorized'];
      categories.forEach(category => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(article);
      });
      return acc;
    }, {} as Record<string, typeof articles>);

    // Sort articles by date within each category
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => 
        new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
      );
    });

    return grouped;
  }, [articles]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full"
    >
      <Card className="h-full transform overflow-hidden bg-card p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-card/80 hover:shadow-lg">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold group-hover:text-primary">
              {article.title}
            </h3>
            <ExternalLink className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {article.creator && (
              <span className="flex items-center gap-1">
                By {article.creator}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {format(new Date(article.isoDate), 'MMM d, yyyy HH:mm')}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.categories?.map((category) => (
              <div
                key={category}
                className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-green-500/10 px-3 py-1 text-sm text-primary"
              >
                <Tag className="h-3 w-3" />
                {category}
              </div>
            ))}
          </div>

          <div
            className="prose prose-invert max-w-none line-clamp-3 flex-grow text-sm"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </Card>
    </a>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Feed</h1>
        <Button
          onClick={() => fetchArticles()}
          className="bg-gradient-to-r from-yellow-500 to-green-500 text-primary-foreground hover:from-yellow-600 hover:to-green-600"
        >
          Refresh Feed
        </Button>
      </div>

      {Object.entries(categorizedArticles).map(([category, categoryArticles]) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                  <DropdownMenuItem>Last week</DropdownMenuItem>
                  <DropdownMenuItem>Last month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <SortDesc className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Newest first</DropdownMenuItem>
                  <DropdownMenuItem>Oldest first</DropdownMenuItem>
                  <DropdownMenuItem>Most relevant</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="scrollbar-hide -mx-6 flex space-x-6 overflow-x-auto px-6">
            <div className="flex gap-6">
              {categoryArticles.map((article) => (
                <div
                  key={article.link}
                  className="w-[300px] flex-none md:w-[400px] lg:w-[500px]"
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}