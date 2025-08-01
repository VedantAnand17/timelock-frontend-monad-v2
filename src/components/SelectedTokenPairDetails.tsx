"use client";

import { ChevronDown } from "@/icons";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Image from "next/image";
import LineChart from "./LineChart";
import { useMarketData } from "@/context/MarketDataProvider";
import Big from "big.js";
import { useIvData } from "@/hooks/useIvData";
import NumberFlow from "@number-flow/react";

export default function SelectedTokenPairDetails() {
  const { selectedTokenPair } = useSelectedTokenPair();
  const { optionMarketAddress } = useMarketData();
  const { ttlIV, selectedDurationIndex, primePoolPriceData } = useMarketData();
  const selectedDurationIv = ttlIV[selectedDurationIndex].IV;
  const {
    data: ivData,
    isLoading,
    error,
  } = useIvData(optionMarketAddress, selectedDurationIv);

  const selectedDurationIvData = ivData?.ivUpdates.map((iv) => ({
    timestamp: iv.timestamp,
    value: iv.ttlIV.find((iv) =>
      Big(iv.ttl).eq(ttlIV[selectedDurationIndex].ttl)
    )?.IV,
  }));

  // Mock data for WBTC price change (replace with real data)
  const priceChange = -8.609;
  const priceChangePercent = -0.23;

  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-row items-center gap-6">
        <div className="flex flex-row items-center gap-3 bg-[#1A1A1A] px-3 py-2 rounded-lg">
          <Image
            src={selectedTokenPair[0].image}
            alt={selectedTokenPair[0].symbol}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-white font-semibold text-sm">
            {selectedTokenPair[0].symbol} / {selectedTokenPair[1].symbol}
          </span>
        </div>
        
        <div className="text-white text-[32px] font-semibold">
          {primePoolPriceData?.currentPrice ? (
            <NumberFlow 
              value={primePoolPriceData?.currentPrice} 
              format={{ 
                style: 'decimal',
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
              }}
            />
          ) : (
            "--"
          )}
        </div>
        
        <div className="text-white text-sm bg-[#1A1A1A] px-2 py-1 rounded">
          {selectedTokenPair[1].symbol}
        </div>
      </div>
      
      <div className="flex flex-row gap-6 items-center">
        <StatsCard title="TVL" value="$120.94M" percentage="10.50%" positive={true} />
        <StatsCard title="Volume(24H)" value="$13.4M" percentage="8.50%" positive={true} />
        <div className="flex flex-row items-center gap-4 bg-[#1A1A1A] px-4 py-3 rounded-lg">
          <span className="text-[#9CA3AF] text-sm font-medium">IV</span>
          <div className="flex flex-row items-center gap-3">
            <span className="text-white text-lg font-medium">
              <NumberFlow value={Number(selectedDurationIv)} />
            </span>
            <div className="w-[120px] h-[30px]">
              {error ? null : isLoading ? (
                <div className="w-full h-full bg-gray-700 animate-pulse rounded" />
              ) : (
                <LineChart data={selectedDurationIvData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({
  title,
  value,
  percentage,
  positive = true,
}: {
  title: string;
  value: string;
  percentage: string;
  positive?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#9CA3AF] text-sm font-medium">{title}</span>
      <div className="flex flex-row items-center gap-2">
        <span className="text-white font-semibold">{value}</span>
        <div className={`text-xs font-semibold flex flex-row items-center ${
          positive ? 'text-[#19DE92]' : 'text-[#EC5058]'
        }`}>
          <ChevronDown className={positive ? 'rotate-180' : ''} width={12} height={12} /> 
          {percentage}
        </div>
      </div>
    </div>
  );
};
