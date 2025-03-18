"use client";

import { ChevronDown } from "@/icons";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Image from "next/image";
import LineChart from "./LineChart";
import { useMarketData } from "@/context/MarketDataProvider";

export default function SelectedTokenPairDetails() {
  const { selectedTokenPair } = useSelectedTokenPair();
  const { ttlIV, selectedDurationIndex } = useMarketData();
  const selectedDurationIv = ttlIV[selectedDurationIndex].IV;

  return (
    <div className="flex flex-row justify-between">
      <div className="bg-[#0D0D0D] p-4 rounded-xl">
        <div className="flex flex-row items-center p-3 py-[8px] gap-[6px] bg-[#1A1A1A] rounded-xl w-fit">
          <Image
            src={selectedTokenPair[0].image}
            alt={selectedTokenPair[0].symbol}
            width={20}
            height={20}
          />
          <span className="font-semibold mt-[2px]">
            {selectedTokenPair[0].symbol} / {selectedTokenPair[1].symbol}
          </span>
        </div>
        <div className="flex flex-row items-center mt-3 gap-3">
          <span className="text-white text-[30px] font-medium">$2,735.56</span>
          <div className="px-3 py-[8px] bg-[#1A1A1A] rounded-[6px]">
            {selectedTokenPair[1].symbol}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-end">
        {/* TODO: Later only send numbers so neg pos can be checked  */}
        <StatsCard title="TVL" value="$1.94M" percentage="10.50%" />
        <StatsCard title="Volume(24H)" value="$3.4M" percentage="8.50%" />
        <div className="px-4 py-3 bg-[#0d0d0d] flex flex-row items-center gap-5 h-fit rounded-xl">
          <span className="text-[#616E85] text-xs font-medium">IV</span>
          <div className="flex flex-row items-center justify-between gap-1">
            <span className="">{selectedDurationIv}</span>
            <div className="w-[200px] h-[38px]">
              <LineChart />
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
}: {
  title: string;
  value: string;
  percentage: string;
}) => {
  return (
    <div className="px-4 py-3 bg-[#0d0d0d] flex flex-col gap-2 h-fit rounded-xl">
      <span className="text-[#616E85] text-xs font-medium">{title}</span>
      <div className="flex flex-row items-center justify-between gap-10">
        <span className="">{value}</span>
        <div className="text-[#EC5058] text-xs font-semibold flex flex-row items-center">
          <ChevronDown /> {percentage}
        </div>
      </div>
    </div>
  );
};
