import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

interface ExerciseParams {
  optionId: string;
  swapper: string[];
  swapData: string[];
  liquidityToExercise: string[];
}

export interface Position {
  optionMarket: string;
  callAsset: string;
  putAsset: string;
  isCall: boolean;
  value: string;
  expiry: number;
  createdAt: number;
  paid: string;
  amount: string;
  liquidityValues: string[];
  exerciseParams: ExerciseParams;
}

export function usePositionsTableData() {
  const { address } = useAccount();
  const chainId = useChainId();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return useQuery({
    queryKey: ["positions", address, chainId],
    queryFn: async () => {
      if (!address || !chainId) return null;

      const response = await fetch(
        `${apiUrl}/get-positions?address=${address}&chainId=${chainId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as { positions: Position[] };
    },
    enabled: !!address,
    refetchInterval: 5000,
  });
}
