import { CMC_API_KEY } from '@/lib/constants';

const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/v3';

const headers = {
  'X-CMC_PRO_API_KEY': CMC_API_KEY,
  'Accept': 'application/json'
};

export async function getFearAndGreedIndex() {
  try {
    const response = await fetch(`${CMC_BASE_URL}/fear-and-greed/latest`, { headers });
    const data = await response.json();
    return {
      value: data.data.value,
      classification: data.data.value_classification
    };
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return { value: 84, classification: 'Extreme Greed' }; // Fallback value
  }
}

export async function getMarketMetrics() {
  try {
    const response = await fetch(`${CMC_BASE_URL}/global-metrics/quotes/latest`, { headers });
    const data = await response.json();
    
    return {
      marketCap: {
        value: data.data.quote.USD.total_market_cap,
        change: data.data.quote.USD.total_market_cap_yesterday_percentage_change
      },
      volume: {
        value: data.data.quote.USD.total_volume_24h,
        change: data.data.quote.USD.total_volume_24h_yesterday_percentage_change
      },
      btcDominance: data.data.btc_dominance,
      ethDominance: data.data.eth_dominance
    };
  } catch (error) {
    console.error('Error fetching market metrics:', error);
    // Fallback values
    return {
      marketCap: { value: 3.4e12, change: 2.36 },
      volume: { value: 166.9e9, change: 3.14 },
      btcDominance: 56.77,
      ethDominance: 12.76
    };
  }
}