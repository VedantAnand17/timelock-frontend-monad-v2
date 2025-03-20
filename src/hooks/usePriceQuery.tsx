import { useQuery } from "@tanstack/react-query";
import { getPriceData, PriceData } from "@/lib/api";

export function usePriceQuery() {
  return useQuery<PriceData[]>({
    queryKey: ["prices"],
    queryFn: getPriceData,
    refetchInterval: 5000,
    retry: false,
  });
}
