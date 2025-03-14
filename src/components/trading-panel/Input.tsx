import { preventMinusAndEKey, preventPasteNegative } from "@/lib/helper";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Image from "next/image";

const Input = () => {
  const { selectedTokenPair } = useSelectedTokenPair();

  return (
    <div className="p-[12px_10px_12px_16px] flex gap-1 flex-row rounded-xl border border-[#282324] bg-[#1a1a1a80]">
      <div className="flex flex-col gap-0">
        <input
          type="number"
          placeholder="0"
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
          className="bg-transparent max-w-[136px] outline-none text-white text-[24px] font-medium"
        />
        <span className="text-[#9CA3AF] text-xs font-medium">
          1000 {selectedTokenPair[1].symbol}
        </span>
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="flex items-center gap-[6px] justify-center rounded-md bg-[#0D0D0D] h-[36px] px-[12px]">
          <Image
            src={selectedTokenPair[0].image}
            alt={selectedTokenPair[0].symbol}
            width={18}
            height={18}
          />
          {selectedTokenPair[0].symbol}
        </div>
        <button className="text-sm font-medium mt-2 cursor-pointer">MAX</button>
      </div>
    </div>
  );
};

export default Input;
