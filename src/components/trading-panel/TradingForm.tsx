import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Input from "@/components/trading-panel/Input";
import { FlashIcon } from "@/icons";
import DurationSelector from "./DurationSelector";
import TradeExecutionDetails from "./TradeExecutionDetails";
import { cn } from "@/lib/utils";

export default function TradingForm({ isLong }: { isLong: boolean }) {
  const { selectedTokenPair } = useSelectedTokenPair();

  return (
    <div>
      <div className="text-sm font-medium pb-3">
        {isLong ? "You Long" : "You Short"}
      </div>
      <Input />
      <div className="flex mt-2 mb-6 flex-row gap-1 items-center border border-[#282324] rounded-[8px] w-fit px-2 py-1">
        <FlashIcon />
        <span className="text-sm font-medium text-[#1981F3] bg-[#1a1a1a80]">
          85x Leverage
        </span>
      </div>
      <div className="text-sm font-medium pb-3">For</div>
      <DurationSelector />
      <div className="mt-6">
        <TradeExecutionDetails />
      </div>
      <div className="mt-5 mb-3 text-sm font-medium text-white">
        You Pay 11.5 USDC
      </div>
      <button
        className={cn(
          "w-full cursor-pointer bg-[#19DE92] text-[#0D0D0D] font-medium text-base rounded-[12px] py-3",
          isLong ? "bg-[#19DE92]" : "bg-[#EC5058]"
        )}
      >
        {isLong
          ? "Long " + selectedTokenPair[0].symbol
          : "Short " + selectedTokenPair[0].symbol}
      </button>
      <div className="text-xs pt-3 text-center text-[#9CA3AF]">
        You don&apos;t pay for losses on Timelock <u>How</u>?
      </div>
    </div>
  );
}
