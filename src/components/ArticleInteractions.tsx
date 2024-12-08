import { useState } from 'react';
import { Search, MessageSquare, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCommentStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ArticleInteractionsProps {
  articleId: string;
}

export function ArticleInteractions({ articleId }: ArticleInteractionsProps) {
  const [showComments, setShowComments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commentText, setCommentText] = useState('');
  const { addComment, getComments } = useCommentStore();
  const comments = getComments(articleId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(articleId, commentText.trim());
      setCommentText('');
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="space-y-4">
      <div className="flex h-10 items-center gap-4 border-t border-border pt-4">
        <form onSubmit={handleSearch} className="flex flex-1">
          <div className="relative flex w-full">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tokens..."
              className="h-10 pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 h-10 w-10"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <Button
          variant={comments.length > 0 ? "gradient" : "outline"}
          size="icon"
          className={cn(
            "h-10 w-10 shrink-0",
            comments.length > 0 && "bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
          )}
          onClick={toggleComments}
        >
          {showComments ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showComments && (
        <div className="space-y-4">
          <form 
            onSubmit={handleComment}
            className="flex items-center gap-4"
          >
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="h-10"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="h-10 shrink-0 bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600"
            >
              Comment
            </Button>
          </form>

          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-border bg-muted/50 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">{comment.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}