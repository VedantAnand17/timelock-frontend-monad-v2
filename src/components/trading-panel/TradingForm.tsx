import Input from "@/components/trading-panel/Input";
import { FlashIcon } from "@/icons";

export default function TradingForm({ isLong }: { isLong: boolean }) {
  return (
    <div>
      <div className="text-sm font-medium pb-3">
        {isLong ? "You Long" : "You Short"}
      </div>
      <Input />
      <div className="flex mt-2 flex-row gap-1 items-center border border-[#282324] rounded-[8px] w-fit px-2 py-1">
        <FlashIcon />
        <span className="text-sm font-medium text-[#1981F3] bg-[#1a1a1a80]">
          85x Leverage
        </span>
      </div>
    </div>
  );
}
