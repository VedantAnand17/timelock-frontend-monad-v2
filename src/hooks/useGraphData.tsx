import { useQuery } from "@tanstack/react-query";

const NETWORK_ID = "base";
const POOL_ADDRESS = "0xd0b53D9277642d899DF5C87A3966A349A798F224";
const TIMEFRAME = "hour";

interface OHLCVParams {
  networkId: string;
  poolAddress: string;
  timeframe: "day" | "hour" | "minute";
}

const fetchPoolOHLCV = async ({
  networkId,
  poolAddress,
  timeframe,
}: OHLCVParams) => {
  const response = await fetch(
    `/api/history?networkId=${networkId}&poolAddress=${poolAddress}&timeframe=${timeframe}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch data");
  }

  return response.json();
};

const useGraphData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["poolOHLCV", NETWORK_ID, POOL_ADDRESS, TIMEFRAME],
    queryFn: () =>
      fetchPoolOHLCV({
        networkId: NETWORK_ID,
        poolAddress: POOL_ADDRESS,
        timeframe: TIMEFRAME,
      }),
    refetchInterval: 12000,
  });

  return { data, isLoading, error };
};

export default useGraphData;
