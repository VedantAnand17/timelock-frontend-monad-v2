import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DurationSelector = () => {
  const durations = ["5m", "15m", "1H", "4H", "1D", "3D"];
  const [selectedDurationIndex, setSelectedDurationIndex] = useState("1");

  return (
    <Tabs
      value={selectedDurationIndex}
      onValueChange={(value) => setSelectedDurationIndex(value)}
      className=""
    >
      <TabsList className="p-[5px] h-[46px] w-full bg-[#1a1a1a80] border border-[#282324]">
        {durations.map((duration, index) => (
          <TabsTrigger
            key={index}
            value={index.toString()}
            className="flex text-[#9CA3AF] font-medium data-[state=active]:text-white cursor-pointer flex-row items-center justify-center gap-2 data-[state=active]:bg-[#0D0D0D]"
          >
            {duration}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default DurationSelector;
