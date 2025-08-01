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
    <div className="mb-4">
      <Tabs
        value={selectedDurationIndex.toString()}
        onValueChange={(value) => setSelectedDurationIndex(Number(value))}
        className="w-full"
      >
        <TabsList className="p-1 h-10 w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
          {durations.map((duration, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="flex-1 text-[#9CA3AF] font-medium data-[state=active]:text-white cursor-pointer flex-row items-center justify-center data-[state=active]:bg-[#0D0D0D] rounded-md transition-all text-sm"
            >
              {duration}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DurationSelector;
