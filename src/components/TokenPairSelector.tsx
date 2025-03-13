"use client";

import { ChevronDown } from "@/icons";
import { supportedTokenPairs, Token } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Image from "next/image";

export default function TokenPairSelector() {
  return (
    <div className="flex flex-row gap-3 overflow-x-auto relative">
      {supportedTokenPairs.map((tokenPair) => (
        <TokenPairCard
          key={tokenPair[0].address}
          tokenPairDetails={tokenPair}
        />
      ))}
    </div>
  );
}

const TokenPairCard = ({ tokenPairDetails }: { tokenPairDetails: Token[] }) => {
  const { selectedTokenPair, setSelectedTokenPair } = useSelectedTokenPair();
  const isSelected =
    selectedTokenPair[0].address === tokenPairDetails[0].address;

  return (
    <button
      onClick={() => setSelectedTokenPair(tokenPairDetails)}
      className={cn(
        "border border-[#1A1A1A] rounded-[10px] gap-3 flex flex-col p-4 bg-[#0D0D0D] cursor-pointer",
        isSelected && "border-[#ffffff0f] bg-[#a6b0c31a]",
      )}
    >
      <div className="flex flex-row items-center gap-12">
        <div className="flex flex-row items-center gap-[6px]">
          <Image
            src={tokenPairDetails[0].image}
            alt={tokenPairDetails[0].symbol}
            width={14}
            height={14}
          />
          <span className="text-[#9CA3AF] text-sm whitespace-nowrap">
            {tokenPairDetails[0].symbol} / {tokenPairDetails[1].symbol}
          </span>
        </div>
        <div className="text-[#EC5058] text-xs flex flex-row items-center gap-1">
          <ChevronDown />
          8.50%
        </div>
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <span className="font-medium">$329.84</span>
        <span className="text-[#9CA3AF] text-xs">
          {tokenPairDetails[1].symbol}
        </span>
      </div>
    </button>
  );
};
