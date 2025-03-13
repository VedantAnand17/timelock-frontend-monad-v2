import { createColumnHelper } from "@tanstack/react-table";
import { LongIcon } from "@/icons";
import { ShortIcon } from "@/icons";
import Image from "next/image";
import { Token } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export type Position = {
  id: string;
  isLong: boolean;
  token: Token;
  size: string;
  currentPrice: string;
  pnlValue: string;
  pnlPercentage: string;
  paidPrice: string;
  expiryTime: string;
};

const columnHelper = createColumnHelper<Position>();

const columns = [
  columnHelper.accessor("isLong", {
    header: "Position",
    cell: (info) => (
      <div className="pl-6 py-2">
        <div className="flex items-center flex-row gap-2 border px-[12px] py-[6px] rounded-md w-fit border-[#1A1A1A]">
          {info.getValue() ? <LongIcon /> : <ShortIcon />}
          <div className="flex flex-col gap-[2px]">
            <div className="flex flex-row gap-1 items-center">
              <Image
                src={info.row.original.token.image}
                alt={info.row.original.token.symbol}
                width={12}
                height={12}
              />
              <span className="text-sm">{info.row.original.token.symbol}</span>
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
  columnHelper.accessor("size", {
    header: "Size",
  }),
  columnHelper.accessor("currentPrice", {
    header: "Current Price",
  }),
  columnHelper.accessor("pnlValue", {
    header: "PnL",
    cell: (info) => (
      <div className="flex flex-row items-center gap-1 text-[13px]">
        <span className="text-[#19DE92]">{info.getValue()}</span>
        <span className="text-[#19DE92]">
          ({info.row.original.pnlPercentage})
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("paidPrice", {
    header: "You Paid",
  }),
  columnHelper.accessor("expiryTime", {
    header: "Expiry",
    cell: (info) => (
      <div className="text-[11px] text-white/[0.5] flex flex-col gap-1">
        <span>{info.getValue()}</span>
        <div className="w-[130px] h-[10px] bg-[#1A1A1A] rounded-md relative">
          <div
            className={cn(
              "absolute top-0 left-0 h-full  rounded-md",
              info.row.original.isLong
                ? "w-[60%] bg-[#EC5058]"
                : "w-[40%] bg-[#19DE92]"
            )}
          ></div>
        </div>
      </div>
    ),
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
