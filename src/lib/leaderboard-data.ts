export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar?: string;
  gems: number;
  rank: number;
  winRate: number;
  totalTrades: number;
  totalPnl: number;
  weeklyPnl: number;
  bestTrade: {
    token: string;
    profit: number;
    date: string;
  };
}

export const leaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'PumpMaster',
    gems: 25000,
    rank: 1,
    winRate: 78.5,
    totalTrades: 345,
    totalPnl: 156000,
    weeklyPnl: 12500,
    bestTrade: {
      token: 'PEPE',
      profit: 15000,
      date: '2024-02-15'
    }
  },
  {
    id: '2',
    username: 'CryptoWhale',
    gems: 22000,
    rank: 2,
    winRate: 75.2,
    totalTrades: 289,
    totalPnl: 142000,
    weeklyPnl: 11200,
    bestTrade: {
      token: 'DOGE',
      profit: 13500,
      date: '2024-02-14'
    }
  },
  {
    id: '3',
    username: 'TokenNinja',
    gems: 19500,
    rank: 3,
    winRate: 72.8,
    totalTrades: 267,
    totalPnl: 128000,
    weeklyPnl: 9800,
    bestTrade: {
      token: 'SHIB',
      profit: 12000,
      date: '2024-02-13'
    }
  },
  {
    id: '4',
    username: 'DiamondHands',
    gems: 18200,
    rank: 4,
    winRate: 71.5,
    totalTrades: 256,
    totalPnl: 115000,
    weeklyPnl: 8900,
    bestTrade: {
      token: 'FLOKI',
      profit: 11000,
      date: '2024-02-12'
    }
  },
  {
    id: '5',
    username: 'MoonShot',
    gems: 16800,
    rank: 5,
    winRate: 69.9,
    totalTrades: 245,
    totalPnl: 98000,
    weeklyPnl: 7500,
    bestTrade: {
      token: 'BONK',
      profit: 9500,
      date: '2024-02-11'
    }
  },
  {
    id: '6',
    username: 'WhaleAlert',
    gems: 15500,
    rank: 6,
    winRate: 68.7,
    totalTrades: 234,
    totalPnl: 85000,
    weeklyPnl: 6800,
    bestTrade: {
      token: 'WIF',
      profit: 8500,
      date: '2024-02-10'
    }
  },
  {
    id: '7',
    username: 'BlockExplorer',
    gems: 14200,
    rank: 7,
    winRate: 67.4,
    totalTrades: 223,
    totalPnl: 72000,
    weeklyPnl: 5900,
    bestTrade: {
      token: 'MYRO',
      profit: 7500,
      date: '2024-02-09'
    }
  },
  {
    id: '8',
    username: 'HashRate',
    gems: 13100,
    rank: 8,
    winRate: 66.2,
    totalTrades: 212,
    totalPnl: 65000,
    weeklyPnl: 5200,
    bestTrade: {
      token: 'SATS',
      profit: 6800,
      date: '2024-02-08'
    }
  },
  {
    id: '9',
    username: 'Satoshi',
    gems: 12000,
    rank: 9,
    winRate: 65.1,
    totalTrades: 201,
    totalPnl: 58000,
    weeklyPnl: 4600,
    bestTrade: {
      token: 'MEME',
      profit: 6200,
      date: '2024-02-07'
    }
  },
  {
    id: '10',
    username: 'Nakamoto',
    gems: 11000,
    rank: 10,
    winRate: 64.3,
    totalTrades: 198,
    totalPnl: 52000,
    weeklyPnl: 4100,
    bestTrade: {
      token: 'WOJAK',
      profit: 5500,
      date: '2024-02-06'
    }
  }
];