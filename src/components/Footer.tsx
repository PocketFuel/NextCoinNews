import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              Your trusted source for news and market insights.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/predictions" className="hover:text-primary">Predictions</Link></li>
              <li><Link to="/favorites" className="hover:text-primary">Favorites</Link></li>
              <li><Link to="/blurts" className="hover:text-primary">Blurts</Link></li>
              <li><Link to="/leaderboard" className="hover:text-primary">Leaderboard</Link></li>
              <li><Link to="/team" className="hover:text-primary">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Feeds</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/x-feed" className="hover:text-primary">X Feed</Link></li>
              <li><Link to="/search" className="hover:text-primary">Targeted Search</Link></li>
              <li><Link to="/news" className="hover:text-primary">News</Link></li>
              <li><Link to="/market" className="hover:text-primary">Market Analysis</Link></li>
              <li><Link to="/nft-art" className="hover:text-primary">NFT/Art</Link></li>
              <li><Link to="/tiktok" className="hover:text-primary">TikTok</Link></li>
              <li><Link to="/youtube" className="hover:text-primary">YouTube</Link></li>
              <li><Link to="/instagram" className="hover:text-primary">Instagram</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} NextCoinNews.com. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Discord</a>
            <a href="#" className="hover:text-primary">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}