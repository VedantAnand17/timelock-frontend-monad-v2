import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import Input from "@/components/trading-panel/Input";
import { FlashIcon } from "@/icons";
import DurationSelector from "./DurationSelector";
import TradeExecutionDetails from "./TradeExecutionDetails";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import { useMarketData } from "@/context/MarketDataProvider";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { contracts } from "@/lib/contracts";
import { TRADE_PREVIEW_ABI } from "@/lib/abis/tradePreviewAbi";
import { formatUnits, parseUnits, erc20Abi } from "viem";
import { Big } from "big.js";
import { TRADE_EXECUTE_ABI } from "@/lib/abis/tradeExecuteAbi";
import { formatTokenDisplayCondensed } from "@/lib/format";
import { useEffect, useState } from "react";
import { USDC } from "@/lib/tokens";
import { toast } from "sonner";
import { CreatePositionDialog } from "../dialog/CreatePositionDialog";
import { useSettingsStore } from "@/stores/settingsStore";
import { monad } from "@/lib/chains";
import { useModal } from "connectkit";

const CHAIN_ID = 10143; // Monad testnet

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
  const { isPending, data: hash, writeContract } = useWriteContract();
  const [isOpenCreatePositionDialog, setIsOpenCreatePositionDialog] =
    useState(false);
  const [isMax, setIsMax] = useState(false);
  const { selectedTokenPair } = useSelectedTokenPair();
  const { skipOrderConfirmation } = useSettingsStore();
  const { address, isConnected, chainId } = useAccount();
  const { setOpen } = useModal();
  const isChainSupported = chainId === monad.id;
  const {
    ttlIV,
    selectedDurationIndex,
    setSelectedDurationIndex,
    optionMarketAddress,
    primePool,
    primePoolPriceData,
  } = useMarketData();

  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const amount = useStore(form.store, (state) => state.values.amount);
  const scaledAmount = parseUnits(amount, selectedTokenPair[0].decimals);
  const amountInPutAsset =
    primePoolPriceData?.currentPrice && amount
      ? Big(amount).mul(Big(primePoolPriceData.currentPrice))
      : null;
  const scaledAmountInPutAsset = amountInPutAsset
    ? parseUnits(amountInPutAsset.toString(), selectedTokenPair[1].decimals)
    : null;

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
    token: USDC.address as `0x${string}`,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const args = [
    optionMarketAddress,
    contracts[CHAIN_ID].LIQUIDITY_HANDLER_ADDRESS_USDC,
    isLong,
    isMax
      ? isLong
        ? BigInt("100000000000000000000")
        : BigInt("200000000000")
      : isLong
      ? scaledAmount
      : scaledAmountInPutAsset,
    ttlIV[selectedDurationIndex].ttl,
    isMax ? balanceData?.value : 0,
  ];

  const { data, isError, isLoading } = useReadContract({
    address: contracts[CHAIN_ID].TRADE_PREVIEW_ADDRESS as `0x${string}`,
    abi: TRADE_PREVIEW_ABI,
    functionName: "previewTrade",
    args,
    query: {
      enabled: isMax
        ? true
        : !!amount && Big(amount).gt(0) && !isBalanceLoading,
    },
  });

  const tradeData = data as TradePreviewResult;
  const premiumCost = tradeData?.premiumCost;
  const totalCost = tradeData?.totalCost
    ? (tradeData.totalCost * BigInt(11)) / BigInt(10)
    : undefined;
  const protocolFee = tradeData?.protocolFee;
  const amountFromPreview = tradeData?.steps[0].amount;

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch liquidity data", {
        description: "Please try again later.",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (!isLoading && !isError && amountFromPreview && isMax) {
      form.setFieldValue(
        "amount",
        formatUnits(amountFromPreview, selectedTokenPair[0].decimals)
      );
    }
  }, [amountFromPreview, form, isError, isLoading, isMax, selectedTokenPair]);

  const calculateLeverage = () => {
    if (!tradeData?.steps || !totalCost || !primePoolPriceData) {
      console.log('Missing data for leverage calculation:', {
        hasTradeData: !!tradeData?.steps,
        hasTotalCost: !!totalCost,
        hasPriceData: !!primePoolPriceData
      });
      return null;
    }

    try {
      const totalAmount = formatUnits(
        tradeData.steps[0].amount,
        isLong ? selectedTokenPair[0].decimals : selectedTokenPair[1].decimals
      );

      const costInUSDC = isLong
        ? Big(totalAmount).mul(Big(primePoolPriceData.currentPrice))
        : Big(totalAmount);

      const totalCostInUSDC = formatUnits(
        totalCost,
        selectedTokenPair[1].decimals
      );

      const leverage = costInUSDC.div(totalCostInUSDC);
      
      console.log('Leverage calculation:', {
        totalAmount,
        costInUSDC: costInUSDC.toString(),
        totalCostInUSDC,
        leverage: leverage.toString()
      });

      return leverage.toFixed(2);
    } catch (error) {
      console.error('Error calculating leverage:', error);
      return null;
    }
  };

  const leverageValue = calculateLeverage();

  const formatDuration = (ttl: number) => {
    if (ttl < 3600) return `${Math.floor(ttl / 60)}m`;
    if (ttl < 86400) return `${Math.floor(ttl / 3600)}H`;
    return `${Math.floor(ttl / 86400)}D`;
  };

  const durations = ttlIV.map((item) => formatDuration(item.ttl));

  const { data: approvalHash, writeContract: writeApproval } =
    useWriteContract();

  const { error: approvalError } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });

  const { error: tradeError, data: executedTradeData } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (executedTradeData?.status === "success") {
      form.setFieldValue("amount", "");
      toast.success("Trade Placed");
    }
  }, [executedTradeData, form]);

  useEffect(() => {
    if (approvalError) {
      toast.error("Approval Failed", {
        description: "Please try again later.",
      });
    }
  }, [approvalError]);

  useEffect(() => {
    if (tradeError) {
      toast.error("Trade Could not be executed", {
        description: "Please try again later.",
      });
    }
  }, [tradeError]);

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
      allowance === undefined ||
      !totalCost
    )
      return;

    if (Big(allowance.toString()).lt(totalCost.toString())) {
      await writeApproval({
        address: selectedTokenPair[1].address as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [optionMarketAddress as `0x${string}`, totalCost as bigint],
      });
    }

    const optionTicks = {
      _handler: contracts[CHAIN_ID].LIQUIDITY_HANDLER_ADDRESS_USDC,
      pool: primePool,
      hook: "0x0000000000000000000000000000000000000000",
      tickLower: tradeData.steps[0].tickLower,
      tickUpper: tradeData.steps[0].tickUpper,
      liquidityToUse: tradeData.steps[0].liquidity,
    };

    await writeContract({
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
          maxCostAllowance: totalCost,
        },
      ],
    });

    setIsOpenCreatePositionDialog(false);
  };

  const openCreatePositionDialog = () => {
    setIsOpenCreatePositionDialog(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
          if (!isConnected) {
            setOpen(true);
            return;
          }

          if (skipOrderConfirmation) {
            executeTrade();
          } else {
            if (amount && Big(amount).gt(0)) {
              openCreatePositionDialog();
            }
          }
        }}
        className="relative"
      >
        {/* <TradeTypeStrokeIcon
          isLong={isLong}
          className="absolute top-[10px] -left-[18px]"
        /> */}
        <div className="text-white text-lg font-semibold mb-4">
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
          {(field) => <Input setIsMax={setIsMax} field={field} />}
        </form.Field>
        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm mb-6">
          <span>-- {selectedTokenPair[1].symbol}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 w-fit">
          <FlashIcon />
          <span className="text-sm font-medium text-[#1981F3]">
            {leverageValue ? `${leverageValue}x` : amount && Big(amount).gt(0) ? "Calculating..." : "--"}
          </span>
        </div>
        <div className="text-white text-lg font-semibold mb-4">For</div>
        {/* <BlueStrokeIcon className="absolute bottom-[96px] -left-[20px]" /> */}
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
        <div className="mb-6">
          <div className="text-[#9CA3AF] text-sm mb-2">You Pay -- {selectedTokenPair[1].symbol}</div>
          <div className="bg-[#19DE92] text-[#0D0D0D] text-center py-4 rounded-xl font-semibold text-lg mb-4">
            {isLong ? "Long " + selectedTokenPair[0].symbol : "Short " + selectedTokenPair[0].symbol}
          </div>
          <div className="text-xs text-[#9CA3AF] text-center leading-relaxed">
            The premium you pay on timelock is used to protect your trade from liquidations even if the asset price goes to 0.
          </div>
        </div>

        <CreatePositionDialog
          positionSize={amount}
          leverage={leverageValue}
          youPay={totalCost}
          premiumCost={premiumCost}
          duration={formatDuration(ttlIV[selectedDurationIndex].ttl)}
          callAsset={selectedTokenPair[0]}
          putAsset={selectedTokenPair[1]}
          isLong={isLong}
          isOpen={isOpenCreatePositionDialog}
          setIsOpen={setIsOpenCreatePositionDialog}
          onSubmit={executeTrade}
          disabled={
            isLoading ||
            isError ||
            isPending
          }
        />
      </form>
    </>
  );
}
