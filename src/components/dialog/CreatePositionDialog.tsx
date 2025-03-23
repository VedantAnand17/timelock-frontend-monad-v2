import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { formatTokenDisplayCondensed } from "@/lib/format";
import { Token } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { formatUnits } from "viem";

export function CreatePositionDialog({
  positionSize,
  leverage,
  youPay,
  premiumCost,
  duration,
  callAsset,
  putAsset,
  isOpen,
  setIsOpen,
  onSubmit,
  isLong,
  disabled,
}: {
  positionSize: string;
  leverage: string | null;
  youPay: bigint | undefined;
  premiumCost: bigint | undefined;
  duration: string;
  callAsset: Token;
  putAsset: Token;
  disabled: boolean;
  isLong: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!max-w-[324px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Create a Position</DialogTitle>
          <DialogClose className="cursor-pointer">
            <XIcon className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-[6px] py-2">
          <Stats
            title="Position Size"
            value={positionSize + " " + callAsset.symbol}
          />
          <Stats
            title="Premium"
            value={
              premiumCost
                ? formatTokenDisplayCondensed(
                    formatUnits(premiumCost, putAsset.decimals),
                    putAsset.decimals
                  ) +
                  " " +
                  putAsset.symbol
                : "--"
            }
          />
          <Stats
            title="You Pay"
            value={
              youPay
                ? formatTokenDisplayCondensed(
                    formatUnits(youPay, putAsset.decimals),
                    putAsset.decimals
                  ) +
                  " " +
                  putAsset.symbol
                : "--"
            }
          />
          <Stats title="Leverage" value={leverage ? leverage + "x" : "--"} />
          <Stats title="Duration" value={duration} />
        </div>
        <DialogFooter className="!flex !flex-col !gap-2">
          <button
            className={cn(
              "w-full disabled:opacity-50 cursor-pointer bg-[#19DE92] text-[#0D0D0D] font-medium text-base rounded-[12px] py-3",
              isLong ? "bg-[#19DE92]" : "bg-[#EC5058]"
            )}
            disabled={disabled}
            onClick={onSubmit}
          >
            Confirm
          </button>
          {/* <div className="text-[11px] text-[#616E85] text-center max-w-[200px] flex items-center justify-center mx-auto">
            Trades on Timelock do not go into loss if the price of{" "}
            {callAsset.symbol} goes down
          </div> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Stats = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-[#616E85] text-sm">{title}</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  );
};
