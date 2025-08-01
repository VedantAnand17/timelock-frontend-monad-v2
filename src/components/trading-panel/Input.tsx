import { useMarketData } from "@/context/MarketDataProvider";
import { formatTokenDisplayCondensed } from "@/lib/format";
import { preventMinusAndEKey, preventPasteNegative } from "@/lib/helper";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import type { AnyFieldApi } from "@tanstack/react-form";
import Big from "big.js";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const Input = ({
  field,
  setIsMax,
}: {
  field: AnyFieldApi;
  setIsMax: Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedTokenPair } = useSelectedTokenPair();
  const inputRef = useRef<HTMLInputElement>(null);
  const { primePoolPriceData } = useMarketData();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="mb-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-center justify-between">
        <div className="flex-1">
          <input
            type="number"
            ref={inputRef}
            autoComplete="off"
            placeholder="0"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={(e) => {
              if (setIsMax) {
                setIsMax(false);
              }
              field.handleChange(e.target.value);
            }}
            onWheel={(e) => e.preventDefault()}
            onPaste={preventPasteNegative}
            min={0.0}
            step="any"
            onKeyDown={(e) => {
              preventMinusAndEKey(e);
              if (e.key === "ArrowDown") {
                e.preventDefault();
              }
            }}
            className="bg-transparent w-full outline-none text-white text-2xl font-semibold placeholder-[#9CA3AF]"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0D0D0D] px-3 py-2 rounded-lg">
            <Image
              src={selectedTokenPair[0].image}
              alt={selectedTokenPair[0].symbol}
              width={16}
              height={16}
              className="rounded-full"
            />
            <span className="text-white font-medium">{selectedTokenPair[0].symbol}</span>
          </div>
          <button
            type="button"
            className="text-[#19DE92] font-semibold text-sm hover:text-[#15B77E] transition-colors"
            onClick={() => {
              setIsMax(true);
            }}
          >
            MAX
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
