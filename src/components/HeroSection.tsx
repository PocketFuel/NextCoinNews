import { Card } from '@/components/ui/card';
import { ArticleAge } from './ArticleAge';
import { Clock, User, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface HeroArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
  views?: number;
  id?: string;
  guid?: string;
  creator?: string;
}

interface HeroSectionProps {
  articles: HeroArticle[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  if (!articles.length) return null;

  // Deduplicate articles based on URL and hostname
  const uniqueArticles = articles.reduce((acc, article) => {
    const url = article.link || article.guid;
    const hostname = new URL(url).hostname;
    const key = `${hostname}:${article.title}`;
    
    if (!acc.some(a => {
      const aUrl = a.link || a.guid;
      const aHostname = new URL(aUrl).hostname;
      return `${aHostname}:${a.title}` === key;
    })) {
      acc.push(article);
    }
    return acc;
  }, [] as HeroArticle[]);

  // Sort articles by date, most recent first
  const sortedArticles = uniqueArticles
    .sort((a, b) => {
      const dateA = new Date(a.pubDate || a.date_published || 0);
      const dateB = new Date(b.pubDate || b.date_published || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5); // Only show top 5 articles

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const ArticleMetadata = ({ article, className = "" }: { article: HeroArticle; className?: string }) => {
    const pubDate = new Date(article.pubDate || article.date_published || 0);
    const hostname = new URL(article.link).hostname.replace('www.', '');
    
    return (
      <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
        <div className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          <span>{hostname}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{format(pubDate, 'MMM d, yyyy h:mm a')}</span>
        </div>
        {article.creator && (
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{article.creator}</span>
          </div>
        )}
      </div>
    );
  };

  return (
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
        {sortedArticles.map((article) => {
          const key = article.id || article.guid || article.link;
          const hasImage = article.image && !article.image.includes('undefined');
          
          return (
            <Card 
              key={key}
              className="w-[300px] flex-none overflow-hidden snap-start sm:w-[350px] md:w-[400px]"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col"
              >
                {hasImage && (
                  <div className="aspect-video w-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <ArticleMetadata article={article} className="text-muted-foreground" />
                    <ArticleAge date={article.pubDate} className="mb-2 mt-2 inline-block" />
                    <h3 className="line-clamp-2 text-base font-semibold group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {stripHtml(article.description)}
                    </p>
                  </div>
                </div>
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}