import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TokenSearchProps {
  initialQuery?: string;
}

export function TokenSearch({ initialQuery = '' }: TokenSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="relative w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tokens..."
        className="w-full pr-10"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}