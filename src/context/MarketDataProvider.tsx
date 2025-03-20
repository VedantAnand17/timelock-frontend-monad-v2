"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IVDataPoint, PriceData } from "@/lib/api";
import { usePriceQuery } from "@/hooks/usePriceQuery";

interface MarketData {
  ttlIV: IVDataPoint[];
  optionMarketAddress: string;
  primePool: string;
  primePoolPriceData: PriceData | undefined;
  selectedDurationIndex: number;
  setSelectedDurationIndex: Dispatch<SetStateAction<number>>;
}

interface MarketDataProviderProps {
  children: ReactNode;
  ttlIV: MarketData["ttlIV"];
  optionMarketAddress: MarketData["optionMarketAddress"];
  primePool: MarketData["primePool"];
  primePoolPriceData: MarketData["primePoolPriceData"];
}

const MarketDataContext = createContext<MarketData | null>(null);

export function MarketDataProvider({
  children,
  ttlIV,
  optionMarketAddress,
  primePool,
  primePoolPriceData,
}: MarketDataProviderProps) {
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);
  const { data: priceData } = usePriceQuery();
  const updatedPrimePoolPriceData = priceData?.find(
    (price) => price.poolAddress === primePool
  );

  return (
    <MarketDataContext.Provider
      value={{
        ttlIV,
        optionMarketAddress,
        primePool,
        primePoolPriceData: updatedPrimePoolPriceData ?? primePoolPriceData,
        selectedDurationIndex,
        setSelectedDurationIndex,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData() {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error("useIVData must be used within an IVDataProvider");
  }
  return context;
}
