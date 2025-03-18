"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IVDataPoint } from "@/lib/api";

interface MarketData {
  ttlIV: IVDataPoint[];
  optionMarketAddress: string;
  primePool: string;
  selectedDurationIndex: number;
  setSelectedDurationIndex: Dispatch<SetStateAction<number>>;
}

interface MarketDataProviderProps {
  children: ReactNode;
  ttlIV: MarketData["ttlIV"];
  optionMarketAddress: MarketData["optionMarketAddress"];
  primePool: MarketData["primePool"];
}

const MarketDataContext = createContext<MarketData | null>(null);

export function MarketDataProvider({
  children,
  ttlIV,
  optionMarketAddress,
  primePool,
}: MarketDataProviderProps) {
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);
  return (
    <MarketDataContext.Provider
      value={{
        ttlIV,
        optionMarketAddress,
        primePool,
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
