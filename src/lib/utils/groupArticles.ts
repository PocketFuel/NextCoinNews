import { levenshtein } from './levenshtein';

interface Article {
  title: string;
  description?: string;
  link: string;
  image?: string;
  pubDate?: string;
  source?: string;
  [key: string]: any;
}

interface Story {
  id: string;
  title: string;
  articles: Article[];
  timestamp: Date;
}

export function groupSimilarArticles(articles: Article[]): Story[] {
  const stories: Story[] = [];
  const processedArticles = new Set<string>();

  // Sort articles by date, newest first
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.pubDate || 0);
    const dateB = new Date(b.pubDate || 0);
    return dateB.getTime() - dateA.getTime();
  });

  sortedArticles.forEach((article) => {
    const url = article.link;
    if (processedArticles.has(url)) return;

    // Find similar articles
    const similarArticles = sortedArticles.filter((other) => {
      const otherUrl = other.link;
      if (processedArticles.has(otherUrl)) return false;
      
      const titleSimilarity = levenshtein(
        article.title.toLowerCase(),
        other.title.toLowerCase()
      );

      // Consider articles similar if their titles are at least 60% similar
      return titleSimilarity >= 0.6;
    });

    if (similarArticles.length > 0) {
      // Mark all similar articles as processed
      similarArticles.forEach((similar) => {
        processedArticles.add(similar.link);
      });

      // Create a new story group
      stories.push({
        id: Math.random().toString(36).slice(2),
        title: article.title,
        articles: similarArticles,
        timestamp: new Date(article.pubDate || 0)
      });
    }
  });

  return stories;
}