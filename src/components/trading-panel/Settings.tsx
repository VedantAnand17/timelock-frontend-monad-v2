import { ResetIcon } from "@/icons";
import { preventMinusAndEKey } from "@/lib/helper";
import { preventPasteNegative } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/settingsStore";

export const SettingsPopoverContent = () => {
  const {
    slippage,
    maxTicksSlippage,
    skipOrderConfirmation,
    setSlippage: updateSlippage,
    setMaxTicksSlippage: updateMaxTicksSlippage,
    setSkipOrderConfirmation: updateSkipOrderConfirmation,
  } = useSettingsStore();

  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      updateSlippage(value);
    }
  };

  const handleMaxTicksSlippageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (
      value === "" ||
      (parseFloat(value) >= 10 && parseFloat(value) <= 1000)
    ) {
      updateMaxTicksSlippage(value);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-3 bg-[#1A1A1A] rounded-[4px]">
        <span className="text-white text-sm font-medium whitespace-nowrap">
          Max Premium Slippage
        </span>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center gap-2 bg-[#0D0D0D] rounded-xl overflow-hidden h-[36px] pr-3">
            <input
              type="number"
              autoComplete="off"
              value={slippage}
              onChange={handleSlippageChange}
              onWheel={(e) => e.preventDefault()}
              onPaste={preventPasteNegative}
              min={0}
              max={100}
              step="any"
              onKeyDown={(e) => {
                preventMinusAndEKey(e);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              className="bg-transparent outline-none text-white text-sm font-medium w-[50px] text-right selection:bg-transparent"
            />
            <span className="text-sm text-[#9CA3AF]">%</span>
          </div>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => updateSlippage("10")}
          >
            <ResetIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-3 bg-[#1A1A1A] rounded-[4px]">
        <span className="text-white text-sm font-medium whitespace-nowrap">
          Max ticks slippage
        </span>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center gap-2 bg-[#0D0D0D] rounded-xl overflow-hidden h-[36px] pr-3">
            <input
              type="number"
              autoComplete="off"
              value={maxTicksSlippage}
              onChange={handleMaxTicksSlippageChange}
              onWheel={(e) => e.preventDefault()}
              onPaste={preventPasteNegative}
              min={0}
              max={100}
              step="any"
              onKeyDown={(e) => {
                preventMinusAndEKey(e);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              className="bg-transparent outline-none text-white text-sm font-medium w-[50px] text-right"
            />
            <span className="text-sm text-[#9CA3AF]">Ticks</span>
          </div>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => updateMaxTicksSlippage("100")}
          >
            <ResetIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-3 bg-[#1A1A1A] rounded-[4px]">
        <span className="text-white text-sm font-medium whitespace-nowrap">
          Skip Order Confirmation
        </span>
        <div className="flex bg-[#0D0D0D] p-[6px] rounded-[16px] flex-row items-center gap-2">
          <button
            type="button"
            className={cn(
              "cursor-pointer rounded-[12px] px-2 py-[2px]",
              skipOrderConfirmation
                ? "bg-[#19de920f] text-[#19DE92]"
                : "text-[#616E85]"
            )}
            onClick={() => updateSkipOrderConfirmation(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={cn(
              "cursor-pointer rounded-[12px] px-2 py-[2px]",
              !skipOrderConfirmation
                ? "bg-[#19de920f] text-[#19DE92]"
                : "text-[#616E85]"
            )}
            onClick={() => updateSkipOrderConfirmation(false)}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};
