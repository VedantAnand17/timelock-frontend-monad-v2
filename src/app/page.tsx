import TokenPairSelector from "@/components/TokenPairSelector";
import Navbar from "../components/navbar";
import SelectedTokenPairDetails from "@/components/SelectedTokenPairDetails";
import Tables from "@/components/tables";
import TradingPanel from "@/components/trading-panel/TradingPanel";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className=" max-w-[1440px] flex flex-row gap-6 mx-auto border-t border-t-[#1A1A1A]">
        <div className="pt-6 max-w-[1054px]">
          <SelectedTokenPairDetails />
          {/* TODO: check border color and corners */}
          <div className="border border-[#1A1A1A] p-4 rounded-md mt-4 relative">
            <div className="mb-4 bg-black h-[430px] flex items-center justify-center">
              Graph here
            </div>
            <TokenPairSelector />
            {/* TODO: fix this gradient properly */}
            {/* <Gradient /> */}
          </div>
          <div className="mb-20">
            <Tables />
          </div>
        </div>
        <TradingPanel />
      </div>
    </main>
  );
}
