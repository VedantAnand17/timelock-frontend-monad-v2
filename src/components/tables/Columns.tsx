import { createColumnHelper } from "@tanstack/react-table";
import { LongIcon } from "@/icons";
import { ShortIcon } from "@/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Position } from "@/hooks/usePositionsTableData";
import { allTokens } from "@/lib/tokens";
import { formatUnits } from "viem";
import Big from "big.js";

const columnHelper = createColumnHelper<Position>();

const columns = [
  columnHelper.accessor("isCall", {
    header: "Position",
    cell: (info) => (
      <div className="pl-6 py-2">
        <div
          className={cn(
            "flex items-center flex-row gap-2 border px-[12px] py-[6px] rounded-md w-fit border-[#1A1A1A]",
            info.getValue() ? "text-[#16C784]" : "text-[#EC5058]"
          )}
        >
          {info.getValue() ? <LongIcon /> : <ShortIcon />}
          <div className="flex flex-col gap-[2px]">
            <div className="flex flex-row gap-1 items-center">
              <Image
                src={
                  allTokens[
                    info.row.original.callAsset.toLowerCase() as `0x${string}`
                  ].image
                }
                alt={
                  allTokens[
                    info.row.original.callAsset.toLowerCase() as `0x${string}`
                  ].symbol
                }
                width={12}
                height={12}
              />
              <span className="text-sm text-white">
                {
                  allTokens[
                    info.row.original.callAsset.toLowerCase() as `0x${string}`
                  ].symbol
                }
              </span>
            </div>
            <span
              className={`text-[10px] uppercase font-semibold opacity-50 ${
                info.getValue() ? "text-[#19DE92]" : "text-[#EC5058]"
              }`}
            >
              {info.getValue() ? "Long" : "Short"}
            </span>
          </div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Size",
    cell: (info) => {
      const token =
        allTokens[info.row.original.callAsset.toLowerCase() as `0x${string}`];
      const amount = info.getValue()
        ? formatUnits(BigInt(info.getValue()), token.decimals)
        : "";

      return (
        <span className="text-sm text-white font-semibold">
          {Big(amount).toFixed(token.displayDecimals)} {token.symbol}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "currentPrice",
    header: "Current Price",
    cell: () => <span className="text-sm text-white font-semibold">--</span>,
  }),
  columnHelper.accessor("value", {
    header: "PnL",
    cell: (info) => {
      const value = info.getValue();
      const decimals =
        allTokens[info.row.original.putAsset.toLowerCase() as `0x${string}`]
          .decimals;
      return (
        <div className="flex flex-row items-center gap-1 text-[13px]">
          <span
            className={cn(
              "text-[#19DE92]",
              Big(value).lt(0) ? "text-[#EC5058]" : "text-[#19DE92]"
            )}
          >
            {value ? formatUnits(BigInt(value), decimals) : "--"}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("paid", {
    header: "You Paid",
    cell: (info) => {
      const value = info.getValue();
      const decimals =
        allTokens[info.row.original.putAsset.toLowerCase() as `0x${string}`]
          .decimals;
      const symbol =
        allTokens[info.row.original.putAsset.toLowerCase() as `0x${string}`]
          .symbol;
      return (
        <span className="text-sm text-white font-semibold">
          {value ? formatUnits(BigInt(value), decimals) : "--"} {symbol}
        </span>
      );
    },
  }),
  columnHelper.accessor("expiry", {
    header: "Expiry",
    cell: (info) => {
      const expiry = info.getValue();
      const createdAt = info.row.original.createdAt;
      const totalDuration = expiry - createdAt;
      const remaining = expiry - Math.floor(Date.now() / 1000);
      const progressPercentage = Math.max(
        0,
        Math.min(100, (remaining / totalDuration) * 100)
      );

      const hoursRemaining = Math.floor(remaining / 3600);
      const minutesRemaining = Math.floor((remaining % 3600) / 60);

      return (
        <div className="text-[11px] text-white/[0.5] flex flex-col gap-1">
          <span>{`${hoursRemaining}h ${minutesRemaining}m`}</span>
          <div className="w-[130px] h-[10px] bg-[#1A1A1A] rounded-md relative">
            <div
              className={cn(
                "absolute top-0 left-0 h-full rounded-md",
                remaining <= 0
                  ? "w-0 bg-[#EC5058]"
                  : `w-[${progressPercentage}%] bg-[#19DE92]`
              )}
            ></div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <button className="text-[#EC5058] transition-colors cursor-pointer">
        Close
      </button>
    ),
  }),
];

export default columns;
