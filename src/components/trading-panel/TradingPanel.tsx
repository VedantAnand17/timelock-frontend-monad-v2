"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LongIcon, SettingsIcon, ShortIcon } from "@/icons";
import { useState } from "react";
import TradingForm from "./TradingForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsPopoverContent } from "./Settings";

enum TabValue {
  LONG = "long",
  SHORT = "short",
}

export default function TradingPanel() {
  const [tabValue, setTabValue] = useState(TabValue.LONG);

  return (
    <div className="w-[386px] bg-[#0D0D0D] p-6 border-l border-[#1A1A1A] flex flex-col">
      <div className="flex justify-end mb-4">
        <Popover>
          <PopoverTrigger className="cursor-pointer p-2 hover:bg-[#1A1A1A] rounded">
            <SettingsIcon />
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="w-[316px] bg-[#1A1A1A] border border-[#2A2A2A] backdrop-blur-sm"
          >
            <SettingsPopoverContent />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="mb-6">
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value as TabValue)}
          className="w-full"
        >
          <TabsList className="p-1 h-12 bg-[#1A1A1A] w-full border border-[#2A2A2A] rounded-lg">
            <TabsTrigger
              value={TabValue.LONG}
              className="flex-1 flex text-[#9CA3AF] font-medium data-[state=active]:text-[#19DE92] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#0D0D0D] rounded-md transition-all"
            >
              <LongIcon width={16} height={16} /> Long
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.SHORT}
              className="flex-1 flex text-[#9CA3AF] font-medium data-[state=active]:text-[#EC5058] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#0D0D0D] rounded-md transition-all"
            >
              <ShortIcon width={16} height={16} /> Short
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TradingForm isLong={tabValue === TabValue.LONG} />
    </div>
  );
}
