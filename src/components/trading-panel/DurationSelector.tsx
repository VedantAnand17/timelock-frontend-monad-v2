import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DurationSelector = ({
  durations,
  selectedDurationIndex,
  setSelectedDurationIndex,
}: {
  durations: string[];
  selectedDurationIndex: number;
  setSelectedDurationIndex: (index: number) => void;
}) => {
  return (
    <Tabs
      value={selectedDurationIndex.toString()}
      onValueChange={(value) => setSelectedDurationIndex(Number(value))}
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
