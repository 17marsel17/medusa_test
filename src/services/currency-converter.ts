interface CacheEntry {
  rate: number;
  timestamp: number;
}

export class CurrencyConverterService {
  private apiKey = process.env.EXCHANGE_RATE_API_KEY || 'YOUR-API-KEY';
  private cache = new Map<string, CacheEntry>();
  private cacheExpiry = 60 * 60 * 1000; // 1 hour

  private getCacheKey(from: string, to: string): string {
    return `${from}-${to}`;
  }

  private async getExchangeRate(from: string, to: string): Promise<number> {
    const cacheKey = this.getCacheKey(from, to);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.rate;
    }

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${from}/${to}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    if (data.result === 'error') {
      throw new Error(`API Error: ${data['error-type']}`);
    }

    this.cache.set(cacheKey, {
      rate: data.conversion_rate,
      timestamp: Date.now()
    });

    return data.conversion_rate;
  }

  async convertCurrency(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getExchangeRate(from, to);
    return amount * rate;
  }
}