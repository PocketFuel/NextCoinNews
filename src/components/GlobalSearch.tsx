import { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TokenIcon } from '@/components/tokens/TokenIcon';
import { useFeedStore } from '@/lib/store';
import { tokens } from '@/lib/tokens/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SearchResult {
  type: 'token' | 'article';
  title: string;
  subtitle?: string;
  link: string;
  icon?: React.ComponentType<{ className?: string }>;
  symbol?: string;
  image?: string;
  date?: string;
  source?: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { feeds } = useFeedStore();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search tokens
    const tokenResults = tokens
      .filter(token => 
        token.symbol.toLowerCase().includes(searchQuery) || 
        token.name.toLowerCase().includes(searchQuery)
      )
      .map(token => ({
        type: 'token' as const,
        title: token.symbol,
        subtitle: token.name,
        link: `/token/${token.symbol.toLowerCase()}`,
        icon: token.icon,
        symbol: token.symbol
      }));
    searchResults.push(...tokenResults);

    // Search articles
    const allArticles = Object.values(feeds).flat();
    const uniqueArticles = new Map();
    
    allArticles.forEach(article => {
      const url = article.link || article.url;
      if (!uniqueArticles.has(url) && 
          (article.title?.toLowerCase().includes(searchQuery) ||
           article.description?.toLowerCase().includes(searchQuery))) {
        uniqueArticles.set(url, {
          type: 'article' as const,
          title: article.title,
          subtitle: article.description?.replace(/<[^>]*>/g, '').slice(0, 100) + '...',
          link: url,
          image: article.image,
          date: article.pubDate || article.date_published,
          source: new URL(url).hostname.replace('www.', '')
        });
      }
    });

    searchResults.push(...Array.from(uniqueArticles.values()).slice(0, 5));
    setResults(searchResults);
  }, [query, feeds]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'token') {
      navigate(result.link);
    } else {
      window.open(result.link, '_blank');
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tokens, news..."
          className="h-8 w-[200px] lg:w-[300px]"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-50" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute left-0 right-0 z-50 mt-2 max-h-[400px] overflow-auto p-2">
            {results.map((result, index) => (
              <button
                key={index}
                className="flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-muted"
                onClick={() => handleSelect(result)}
              >
                {result.type === 'token' ? (
                  <TokenIcon 
                    symbol={result.symbol!} 
                    icon={result.icon}
                    size="sm"
                  />
                ) : result.image && (
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={result.image}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="flex-1 font-medium line-clamp-1">{result.title}</span>
                    {result.type === 'article' && (
                      <ExternalLink className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  {result.subtitle && (
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {result.subtitle}
                    </div>
                  )}
                  {result.type === 'article' && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{result.source}</span>
                      {result.date && (
                        <>
                          <span>•</span>
                          <span>{format(new Date(result.date), 'MMM d, yyyy')}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}