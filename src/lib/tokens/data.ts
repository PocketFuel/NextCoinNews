import { generateChartData } from '@/lib/utils';
import * as Icons from './icons';

export interface Token {
  symbol: string;
  name: string;
  price: string;
  priceChange: number;
  marketCap: string;
  volume: string;
  chartData: number[];
  icon: React.ComponentType<{ className?: string }>;
}

export const tokens: Token[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$43,567.82',
    priceChange: 2.5,
    marketCap: '$845.2B',
    volume: '$24.1B',
    chartData: generateChartData(50, 2.5),
    icon: Icons.BTC
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,245.16',
    priceChange: 3.8,
    marketCap: '$269.8B',
    volume: '$12.3B',
    chartData: generateChartData(50, 3.8),
    icon: Icons.ETH
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: '$1.00',
    priceChange: 0.01,
    marketCap: '$95.2B',
    volume: '$42.1B',
    chartData: generateChartData(50, 0.01),
    icon: Icons.USDT
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: '$312.45',
    priceChange: -1.2,
    marketCap: '$47.8B',
    volume: '$8.3B',
    chartData: generateChartData(50, -1.2),
    icon: Icons.BNB
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$63.45',
    priceChange: 5.2,
    marketCap: '$27.1B',
    volume: '$2.8B',
    chartData: generateChartData(50, 5.2),
    icon: Icons.SOL
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: '$0.62',
    priceChange: 1.8,
    marketCap: '$33.9B',
    volume: '$2.1B',
    chartData: generateChartData(50, 1.8),
    icon: Icons.XRP
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: '$1.00',
    priceChange: 0.00,
    marketCap: '$24.8B',
    volume: '$3.1B',
    chartData: generateChartData(50, 0),
    icon: Icons.USDC
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: '$0.51',
    priceChange: 1.5,
    marketCap: '$18.2B',
    volume: '$1.5B',
    chartData: generateChartData(50, 1.5),
    icon: Icons.ADA
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: '$35.24',
    priceChange: 3.7,
    marketCap: '$12.9B',
    volume: '$1.8B',
    chartData: generateChartData(50, 3.7),
    icon: Icons.AVAX
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: '$0.087',
    priceChange: -2.5,
    marketCap: '$12.4B',
    volume: '$1.2B',
    chartData: generateChartData(50, -2.5),
    icon: Icons.DOGE
  }
];

// Helper function to get token by symbol
export function getTokenBySymbol(symbol: string): Token | undefined {
  return tokens.find(t => t.symbol.toLowerCase() === symbol.toLowerCase());
}