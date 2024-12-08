import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tokens } from '@/lib/tokens';

export default function Tokens() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tokens</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Holders</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTokens.map((token, index) => (
              <TableRow 
                key={token.symbol}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/token/${token.symbol.toLowerCase()}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Star className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10">
                      <div className="flex h-full w-full items-center justify-center text-xs font-medium">
                        {token.symbol}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {token.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{token.price}</TableCell>
                <TableCell className={token.priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {token.priceChange > 0 ? '+' : ''}{token.priceChange}%
                </TableCell>
                <TableCell>{token.marketCap}</TableCell>
                <TableCell>{token.volume}</TableCell>
                <TableCell>245,789</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      Long
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    >
                      Short
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}