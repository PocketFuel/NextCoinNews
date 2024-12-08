import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ArticleCardBackProps {
  article: any;
  onClose: () => void;
}

export function ArticleCardBack({ article, onClose }: ArticleCardBackProps) {
  return (
    <Card className="absolute inset-0 flex h-full flex-col bg-black/40 p-6 rotate-y-180 backface-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-white/5"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 flex-col">
        <h3 className="mb-4 text-lg font-semibold text-white">Summary</h3>
        <p className="text-sm text-gray-400">
          {article.description?.replace(/<[^>]*>/g, '').slice(0, 280)}...
        </p>
      </div>
    </Card>
  );
}