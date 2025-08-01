import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatTokenDisplayCondensed } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import { formatUnits } from "viem";
import { ChevronDown } from "@/icons";

export default function TradeExecutionDetails({
  premiumCost,
  protocolFee,
}: {
  premiumCost: bigint;
  protocolFee: bigint;
}) {
  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="cursor-pointer text-[#9CA3AF] text-sm font-medium hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-2">
              <span>Show Details</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-0">
            <div className="space-y-3">
              <TradeExecutionDetailsItem
                title="Premium"
                value={premiumCost}
              />
              <TradeExecutionDetailsItem
                title="Protocol Fees"
                value={protocolFee}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const TradeExecutionDetailsItem = ({
  title,
  value,
}: {
  title: string;
  value: bigint;
}) => {
  const { selectedTokenPair } = useSelectedTokenPair();

  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-[#9CA3AF] text-sm">{title}</span>
      <span className="text-white text-sm font-medium">
        {value
          ? formatTokenDisplayCondensed(
              formatUnits(value, selectedTokenPair[1].decimals),
              selectedTokenPair[1].decimals
            )
          : "--"}{" "}
        {selectedTokenPair[1].symbol}
      </span>
    </div>
  );
};
