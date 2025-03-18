const optionMarket = "0x1D56d9d8885988cAA4481B4432f9EA1FE29CAEcD";

export interface IVDataPoint {
  ttl: number;
  IV: string;
}

interface MarketResponse {
  market: {
    ttlIV: IVDataPoint[];
    address: string;
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
