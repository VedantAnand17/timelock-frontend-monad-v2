import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Input from "@/components/trading-panel/Input";
import { BlueStrokeIcon, FlashIcon, TradeTypeStrokeIcon } from "@/icons";
import DurationSelector from "./DurationSelector";
import TradeExecutionDetails from "./TradeExecutionDetails";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function TradingForm({ isLong }: { isLong: boolean }) {
  const { selectedTokenPair } = useSelectedTokenPair();
  const durations = ["5m", "15m", "1H", "4H", "1D", "3D"];
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(1);

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      console.log(values.value.amount, durations[selectedDurationIndex]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="relative"
    >
      <TradeTypeStrokeIcon
        isLong={isLong}
        className="absolute top-[10px] -left-[18px]"
      />
      <div className="text-sm font-medium pb-3">
        {isLong ? "You Long" : "You Short"}
      </div>
      <form.Field
        name="amount"
        validators={{
          // TODO: Add validation for max amount and probably use zod
          onChange: ({ value }) =>
            !value
              ? "Amount is required"
              : Number(value) <= 0
              ? "Amount must be greater than 0"
              : undefined,
        }}
      >
        {(field) => <Input field={field} />}
      </form.Field>
      <div className="flex mt-2 mb-6 flex-row gap-1 items-center border border-[#282324] rounded-[8px] w-fit px-2 py-1">
        <FlashIcon />
        <span className="text-sm font-medium text-[#1981F3] bg-[#1a1a1a80]">
          85x Leverage
        </span>
      </div>
      <div className="text-sm font-medium pb-3">For</div>
      <BlueStrokeIcon className="absolute bottom-[96px] -left-[20px]" />
      <DurationSelector
        durations={durations}
        selectedDurationIndex={selectedDurationIndex}
        setSelectedDurationIndex={setSelectedDurationIndex}
      />
      <div className="mt-6">
        <TradeExecutionDetails />
      </div>
      <div className="mt-5 mb-3 text-sm font-medium text-white">
        You Pay 11.5 USDC
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <>
            <button
              className={cn(
                "w-full disabled:opacity-50 cursor-pointer bg-[#19DE92] text-[#0D0D0D] font-medium text-base rounded-[12px] py-3",
                isLong ? "bg-[#19DE92]" : "bg-[#EC5058]"
              )}
              disabled={!canSubmit || isSubmitting}
            >
              {isLong
                ? "Long " + selectedTokenPair[0].symbol
                : "Short " + selectedTokenPair[0].symbol}
            </button>
          </>
        )}
      </form.Subscribe>
      <div className="text-xs pt-3 text-center text-[#9CA3AF]">
        You don&apos;t pay for losses on Timelock <u>How</u>?
      </div>
    </form>
  );
}
