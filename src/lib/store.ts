import { create } from 'zustand';
import { XMLParser } from 'fast-xml-parser';
import { leaderboardData, type LeaderboardEntry } from './leaderboard-data';

interface TokenState {
  gems: number;
  predictions: Array<{
    id: string;
    token: string;
    type: 'long' | 'short';
    amount: number;
    leverage: number;
    entryPrice: number;
    timestamp: Date;
  }>;
  addPrediction: (prediction: Omit<TokenState['predictions'][0], 'id' | 'timestamp'>) => void;
  updateGems: (amount: number) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  gems: 950,
  predictions: [],
  addPrediction: (prediction) =>
    set((state) => ({
      predictions: [
        ...state.predictions,
        {
          ...prediction,
          id: Math.random().toString(36).slice(2),
          timestamp: new Date(),
        },
      ],
      gems: state.gems - prediction.amount,
    })),
  updateGems: (amount) =>
    set((state) => ({
      gems: state.gems + amount,
    })),
}));

interface AuthState {
  user: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthState['user']>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '2',
    email: 'cryptoking@example.com',
    username: 'CryptoKing',
  },
  isAuthenticated: true,
  login: async (email: string, password: string) => {
    // Mock login
    set({
      user: {
        id: '2',
        email,
        username: 'CryptoKing',
      },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));

interface Comment {
  id: string;
  articleId: string;
  username: string;
  content: string;
  timestamp: Date;
}

interface CommentState {
  comments: Comment[];
  addComment: (articleId: string, content: string) => void;
  getComments: (articleId: string) => Comment[];
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  addComment: (articleId, content) => {
    const comment: Comment = {
      id: Math.random().toString(36).slice(2),
      articleId,
      username: useAuthStore.getState().user?.username || 'Anonymous',
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      comments: [comment, ...state.comments],
    }));

    useNotificationStore.getState().addNotification({
      title: 'New Comment',
      description: `${comment.username} commented: ${content.slice(0, 50)}${content.length > 50 ? '...' : ''}`,
    });
  },
  getComments: (articleId) => {
    return get().comments.filter(comment => comment.articleId === articleId);
  },
}));

interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).slice(2),
          read: false,
          timestamp: new Date(),
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));

interface LeaderboardState {
  entries: LeaderboardEntry[];
  getUserRank: (userId: string) => number;
  getTopPerformers: (limit?: number) => LeaderboardEntry[];
  getWeeklyTopPerformers: (limit?: number) => LeaderboardEntry[];
}

export const useLeaderboardStore = create<LeaderboardState>(() => ({
  entries: leaderboardData,
  getUserRank: (userId) => {
    const entry = leaderboardData.find(e => e.id === userId);
    return entry?.rank || 0;
  },
  getTopPerformers: (limit = 10) => {
    return leaderboardData
      .sort((a, b) => b.totalPnl - a.totalPnl)
      .slice(0, limit);
  },
  getWeeklyTopPerformers: (limit = 10) => {
    return leaderboardData
      .sort((a, b) => b.weeklyPnl - a.weeklyPnl)
      .slice(0, limit);
  }
}));

interface FeedState {
  feeds: {
    [key: string]: any[];
  };
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  fetchFeeds: () => Promise<void>;
  toggleFavorite: (articleId: string) => void;
}

const FEED_URLS = {
  youtube: 'https://rss.app/feeds/_QMNSWWasV0pYiplZ.xml',
  tiktok: 'https://rss.app/feeds/_RzIpPUPxV5agJIii.xml',
  news: 'https://rss.app/feeds/_jczZ1hO4gaPMTWCW.xml',
  xfeed: 'https://rss.app/feeds/_GCTyu2hjdrYeS0ro.xml',
  animalnews: 'https://rss.app/feeds/_TPRWBDHmKVslJDDK.xml',
  crypto: 'https://rss.app/feeds/_Fmld27By0HrCxAVr.xml',
  instagram: 'https://rss.app/feeds/_dHJ74cpg6yd41Cqi.xml',
  search: 'https://rss.app/feeds/_VGJUutruPHhFZoDk.xml',
  market: 'https://rss.app/feeds/_2JHkJmCr5N3R0tin.xml',
  nftart: 'https://rss.app/feeds/_ezgBuUoJshwko2HI.xml',
  trending: 'https://rss.app/feeds/_Hk4ipDrPdyxR5OiK.xml',
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
});

async function fetchFeed(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const data = parser.parse(text);
    
    const channel = data.rss?.channel;
    if (!channel) {
      console.error('Invalid RSS feed structure:', url);
      return [];
    }

    const items = Array.isArray(channel.item) ? channel.item : [channel.item];
    return items.map((item: any) => {
      let imageUrl = null;

      if (item.enclosure?.["@_url"]) {
        imageUrl = item.enclosure["@_url"];
      }
      else if (item["media:content"]?.["@_url"]) {
        imageUrl = item["media:content"]["@_url"];
      }
      else if (item["media:thumbnail"]?.["@_url"]) {
        imageUrl = item["media:thumbnail"]["@_url"];
      }
      else if (item.image) {
        imageUrl = typeof item.image === 'string' ? item.image : item.image.url;
      }
      else if (item.description) {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        }
      }

      return {
        ...item,
        image: imageUrl,
        pubDate: item.pubDate || item.published || new Date().toISOString(),
        link: item.link || item.guid,
        description: item.description || item.summary || '',
        id: item.guid || item.link || Math.random().toString(36).slice(2),
      };
    });
  } catch (error) {
    console.error('Error fetching feed:', url, error);
    return [];
  }
}

export const useFeedStore = create<FeedState>((set) => ({
  feeds: {},
  isLoading: false,
  error: null,
  favorites: [],
  fetchFeeds: async () => {
    set({ isLoading: true, error: null });
    try {
      const feedResults = await Promise.allSettled(
        Object.entries(FEED_URLS).map(async ([key, url]) => {
          const items = await fetchFeed(url);
          return [key, items];
        })
      );

      const feeds = feedResults.reduce((acc, result, index) => {
        const key = Object.keys(FEED_URLS)[index];
        if (result.status === 'fulfilled') {
          acc[key] = result.value[1];
        } else {
          console.error(`Failed to fetch ${key}:`, result.reason);
          acc[key] = [];
        }
        return acc;
      }, {} as Record<string, any[]>);

      set({ feeds, isLoading: false });
    } catch (error) {
      console.error('Feed fetch error:', error);
      set({ 
        error: 'Failed to fetch feeds. Please try again later.',
        isLoading: false 
      });
    }
  },
  toggleFavorite: (articleId) =>
    set((state) => ({
      favorites: state.favorites.includes(articleId)
        ? state.favorites.filter((id) => id !== articleId)
        : [...state.favorites, articleId],
    })),
}));