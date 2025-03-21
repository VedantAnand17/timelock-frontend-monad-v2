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
    <div className="border-l flex flex-col grow-1 pr-[24px] border-l-[#1A1A1A] pl-[32px]">
      <div className="pt-6 w-full">
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value as TabValue)}
          className="w-full"
        >
          <TabsList className="p-[6px] h-[54px] bg-[#1a1a1a80] w-full">
            <TabsTrigger
              value={TabValue.LONG}
              className="flex-1 flex text-[#616E85] font-medium data-[state=active]:text-[#19DE92] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#19de920f] dark:data-[state=active]:bg-[#19de920f]"
            >
              {/* TODO: size is not working */}
              <LongIcon width={10} height={10} /> Long
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.SHORT}
              className="flex-1 flex text-[#616E85] font-medium data-[state=active]:text-[#EC5058] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#ea39430f] dark:data-[state=active]:bg-[#ea39430f]"
            >
              <ShortIcon width={10} height={10} /> Short
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full justify-end my-5">
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <SettingsIcon />
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            sideOffset={10}
            className="w-[316px] bg-[#1a1a1a80] border border-[#282324] backdrop-blur-xs flex flex-col gap-1 p-1"
          >
            <SettingsPopoverContent />
          </PopoverContent>
        </Popover>
      </div>
      <TradingForm isLong={tabValue === TabValue.LONG} />
    </div>
  );
}
