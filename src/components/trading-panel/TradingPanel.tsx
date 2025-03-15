"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LongIcon, SettingsIcon, ShortIcon } from "@/icons";
import { useState } from "react";
import TradingForm from "./TradingForm";

enum TabValue {
  LONG = "long",
  SHORT = "short",
}

export default function TradingPanel() {
  const [tabValue, setTabValue] = useState(TabValue.LONG);

  return (
    <div className="border-l border-l-[#1A1A1A] pl-[32px] pr-[24px]">
      <div className="pt-6">
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value as TabValue)}
          className=""
        >
          <TabsList className="p-[6px] h-[54px] bg-[#1a1a1a80]">
            <TabsTrigger
              value={TabValue.LONG}
              className="flex text-[#616E85] font-medium px-[40px] data-[state=active]:text-[#19DE92] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#19de920f] dark:data-[state=active]:bg-[#19de920f]"
            >
              {/* TODO: size is not working */}
              <LongIcon width={10} height={10} /> Long
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.SHORT}
              className="flex text-[#616E85] font-medium px-[36px] data-[state=active]:text-[#EC5058] cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#ea39430f] dark:data-[state=active]:bg-[#ea39430f]"
            >
              <ShortIcon width={10} height={10} /> Short
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full justify-end my-5">
        <button className="cursor-pointer">
          <SettingsIcon />
        </button>
      </div>
      <TradingForm isLong={tabValue === TabValue.LONG} />
    </div>
  );
}
