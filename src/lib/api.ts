const optionMarket = process.env.NEXT_PUBLIC_OPTION_MARKET_ADDRESS;

export interface IVDataPoint {
  ttl: number;
  IV: string;
}

interface MarketResponse {
  market: {
    ttlIV: IVDataPoint[];
    address: string;
    primePool: string;
  };
}

export async function getMarketIvData(): Promise<MarketResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/get-market/${optionMarket}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching markets:", error);
    throw error;
  }
}

export interface PriceData {
  currentPrice: number;
  percentChange: number;
  poolAddress: string;
  timestamp: number;
}

export async function getPriceData(): Promise<PriceData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_OHLC_BACKEND;

  try {
    const response = await fetch(`${apiUrl}/prices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
}
