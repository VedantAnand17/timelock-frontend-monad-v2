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
  selectedDurationIndex: number;
  setSelectedDurationIndex: Dispatch<SetStateAction<number>>;
}

interface MarketDataProviderProps {
  children: ReactNode;
  ttlIV: MarketData["ttlIV"];
}

const MarketDataContext = createContext<MarketData | null>(null);

export function MarketDataProvider({
  children,
  ttlIV,
}: MarketDataProviderProps) {
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);
  return (
    <MarketDataContext.Provider
      value={{ ttlIV, selectedDurationIndex, setSelectedDurationIndex }}
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
