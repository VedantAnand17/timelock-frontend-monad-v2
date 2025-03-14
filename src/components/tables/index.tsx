"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BTC, ETH, SOL } from "@/lib/tokens";
import columns, { Position } from "./Columns";

const dummyData: Position[] = [
  {
    id: "1",
    isLong: true,
    token: ETH,
    size: "1 ETH",
    currentPrice: "2500 USDC",
    pnlValue: "+273 USDC",
    pnlPercentage: "16.6%",
    paidPrice: "11.5 USDC",
    expiryTime: "5h 59m 6s",
  },
  {
    id: "2",
    isLong: false,
    token: BTC,
    size: "0.05 BTC",
    currentPrice: "42000 USDC",
    pnlValue: "-120 USDC",
    pnlPercentage: "8.2%",
    paidPrice: "43.2 USDC",
    expiryTime: "2h 30m 15s",
  },
  {
    id: "3",
    isLong: true,
    token: SOL,
    size: "10 SOL",
    currentPrice: "150 USDC",
    pnlValue: "+45 USDC",
    pnlPercentage: "3.1%",
    paidPrice: "14.7 USDC",
    expiryTime: "12h 45m 30s",
  },
];

export default function Tables() {
  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-[#1A1A1A] rounded-md mt-4 relative">
      <div className="flex flex-row items-center border-b border-[#1A1A1A] gap-6 pl-6 ">
        <span className="text-sm font-semibold border-b border-b-white py-4">
          Positions
        </span>
        <span className="text-sm font-semibold text-[#9CA3AF] pointer-events-none">
          History
        </span>
      </div>

      <div className="overflow-x-auto overflow-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#1A1A1A]">
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`py-4 text-left text-sm text-[#9CA3AF] ${
                      index === 0 ? "pl-6" : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="font-semibold text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
