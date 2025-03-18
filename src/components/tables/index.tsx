"use client";

import { usePositionsTableData } from "@/hooks/usePositionsTableData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import columns from "./Columns";

export default function Tables() {
  const { data: positions } = usePositionsTableData();
  const positionsData = positions?.positions;

  const table = useReactTable({
    data: useMemo(() => {
      if (!positionsData) return [];
      return positionsData;
    }, [positionsData]),
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
                          header.getContext()
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
