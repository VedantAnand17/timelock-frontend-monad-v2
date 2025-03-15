import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function TradeExecutionDetails() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer text-[#9CA3AF] text-sm font-medium border border-[#282324] rounded-md px-4 bg-[#1a1a1a80]">
          Show Details
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <TradeExecutionDetailsItem
            title="Premium"
            value="10 USDC"
            className="pt-3 pb-[10px]"
          />
          <TradeExecutionDetailsItem
            title="Protocol Fees"
            value="1 USDC"
            className="pb-[10px]"
          />
          <TradeExecutionDetailsItem
            title="Reserve Fees"
            value="0.5 USDC"
            className="pb-[10px]"
          />
          <div className="w-full mt-5 h-[1px] bg-[#282324]"></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const TradeExecutionDetailsItem = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-2",
        className
      )}
    >
      <span className="text-[#9CA3AF] text-sm">{title}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
};
