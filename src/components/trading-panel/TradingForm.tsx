import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Input from "@/components/trading-panel/Input";
import { BlueStrokeIcon, FlashIcon, TradeTypeStrokeIcon } from "@/icons";
import DurationSelector from "./DurationSelector";
import TradeExecutionDetails from "./TradeExecutionDetails";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import { useMarketData } from "@/context/MarketDataProvider";
import { LIQUIDITY_HANDLER_ADDRESS_USDC } from "@/lib/contracts";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { TRADE_PREVIEW_ADDRESS } from "@/lib/contracts";
import { TRADE_PREVIEW_ABI } from "@/lib/abis/tradePreviewAbi";
import { formatUnits, parseUnits, erc20Abi } from "viem";
import { Big } from "big.js";
import { TRADE_EXECUTE_ABI } from "@/lib/abis/tradeExecuteAbi";

interface TradePreviewStep {
  amount: bigint;
  liquidity: bigint;
  strike: bigint;
  tickLower: number;
  tickUpper: number;
}

interface TradePreviewResult {
  fullMatch: boolean;
  premiumCost: bigint;
  protocolFee: bigint;
  steps: TradePreviewStep[];
  totalCost: bigint;
}

export default function TradingForm({ isLong }: { isLong: boolean }) {
  const { isPending, writeContract } = useWriteContract();
  const { selectedTokenPair } = useSelectedTokenPair();
  const { address } = useAccount();
  const {
    ttlIV,
    selectedDurationIndex,
    setSelectedDurationIndex,
    optionMarketAddress,
    primePool,
  } = useMarketData();

  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const amount = useStore(form.store, (state) => state.values.amount);
  const scaledAmount = parseUnits(amount, selectedTokenPair[0].decimals);

  const { data, isError, isLoading } = useReadContract({
    address: TRADE_PREVIEW_ADDRESS,
    abi: TRADE_PREVIEW_ABI,
    functionName: "previewTrade",
    args: [
      optionMarketAddress,
      LIQUIDITY_HANDLER_ADDRESS_USDC,
      isLong,
      scaledAmount,
      ttlIV[selectedDurationIndex].ttl,
      0,
    ],
    query: {
      enabled: !!amount && Big(amount).gt(0),
    },
  });

  const tradeData = data as TradePreviewResult;
  const premiumCost = tradeData?.premiumCost;
  const totalCost = tradeData?.totalCost;
  const protocolFee = tradeData?.protocolFee;

  const formatDuration = (ttl: number) => {
    if (ttl < 3600) return `${Math.floor(ttl / 60)}m`;
    if (ttl < 86400) return `${Math.floor(ttl / 3600)}H`;
    return `${Math.floor(ttl / 86400)}D`;
  };

  const durations = ttlIV.map((item) => formatDuration(item.ttl));

  const { writeContract: writeApproval } = useWriteContract();

  const { data: allowance } = useReadContract({
    address: selectedTokenPair[1].address as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address as `0x${string}`, optionMarketAddress as `0x${string}`],
  });

  const executeTrade = async () => {
    if (!amount || Big(amount).eq(0)) return;
    if (
      !tradeData ||
      !tradeData.steps ||
      tradeData.steps.length === 0 ||
      allowance === undefined
    )
      return;

    try {
      if (Big(allowance.toString()).lt(totalCost.toString())) {
        await writeApproval({
          address: selectedTokenPair[1].address as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [optionMarketAddress as `0x${string}`, totalCost as bigint],
        });
      }

      const optionTicks = {
        _handler: LIQUIDITY_HANDLER_ADDRESS_USDC,
        pool: primePool,
        hook: "0x0000000000000000000000000000000000000000",
        tickLower: tradeData.steps[0].tickLower,
        tickUpper: tradeData.steps[0].tickUpper,
        liquidityToUse: tradeData.steps[0].liquidity,
      };

      writeContract({
        address: optionMarketAddress as `0x${string}`,
        abi: TRADE_EXECUTE_ABI,
        functionName: "mintOption",
        args: [
          {
            optionTicks: [optionTicks],
            tickLower: tradeData.steps[0].tickLower,
            tickUpper: tradeData.steps[0].tickUpper,
            ttl: ttlIV[selectedDurationIndex].ttl,
            isCall: isLong,
            maxCostAllowance: tradeData.totalCost,
          },
        ],
      });
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
        executeTrade();
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
        <TradeExecutionDetails
          premiumCost={premiumCost}
          protocolFee={protocolFee}
        />
      </div>
      <div className="mt-5 mb-3 text-sm font-medium text-white">
        You Pay{" "}
        {totalCost
          ? formatUnits(totalCost, selectedTokenPair[1].decimals)
          : "--"}
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
              disabled={
                !canSubmit || isSubmitting || isLoading || isError || isPending
              }
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
