import { useQuery } from "@tanstack/react-query";

interface IVDataResponse {
  market: string;
  optionPricing: string;
  ivUpdates: {
    timestamp: number;
    ttlIV: {
      ttl: number;
      IV: string;
    }[];
  }[];
}

export const useIvData = (market: string, ttl: string) => {
  return useQuery<IVDataResponse>({
    queryKey: ["ivs", market],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-ivs?market=${market}&limit=40&ttl=${ttl}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch IV data");
      }
      return response.json();
    },
    enabled: !!market && !!ttl,
  });
};
