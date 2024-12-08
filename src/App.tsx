import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Stories from '@/pages/Stories';
import Predictions from '@/pages/Predictions';
import Tokens from '@/pages/Tokens';
import Token from '@/pages/Token';
import Feed from '@/pages/Feed';
import Blurts from '@/pages/Blurts';
import Team from '@/pages/Team';
import Settings from '@/pages/Settings';
import Notifications from '@/pages/Notifications';
import Favorites from '@/pages/Favorites';
import FeedPage from '@/pages/FeedPage';
import XFeed from '@/pages/XFeed';
import Leaderboard from '@/pages/Leaderboard';
import Disclaimer from '@/pages/Disclaimer';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import PumpVision from '@/pages/PumpVision';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="stories" element={<Stories />} />
            <Route path="predictions" element={<Predictions />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="token/:symbol" element={<Token />} />
            <Route path="pump-vision" element={<PumpVision />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="feed" element={<Feed />} />
            <Route path="blurts" element={<Blurts />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="animal-news" element={<FeedPage />} />
            <Route path="crypto" element={<FeedPage />} />
            <Route path="instagram" element={<FeedPage />} />
            <Route path="market" element={<FeedPage />} />
            <Route path="news" element={<FeedPage />} />
            <Route path="search" element={<FeedPage />} />
            <Route path="tiktok" element={<FeedPage />} />
            <Route path="x-feed" element={<XFeed />} />
            <Route path="youtube" element={<FeedPage />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}