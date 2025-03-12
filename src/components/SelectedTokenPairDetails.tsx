"use client";

import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Image from "next/image";

export default function SelectedTokenPairDetails() {
  const { selectedTokenPair } = useSelectedTokenPair();

  return (
    <div className="flex flex-row justify-between">
      <div className="bg-[#0D0D0D] p-4">
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
    </div>
  );
}
