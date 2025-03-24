// import TokenPairSelector from "@/components/TokenPairSelector";
import Navbar from "../components/navbar";
import SelectedTokenPairDetails from "@/components/SelectedTokenPairDetails";
import Tables from "@/components/tables";
import TradingPanel from "@/components/trading-panel/TradingPanel";
import Graph from "@/components/graph";
import { getMarketIvData, getPriceData } from "@/lib/api";
import { MarketDataProvider } from "@/context/MarketDataProvider";

export default async function Home() {
  const [market, priceData] = await Promise.all([
    getMarketIvData(),
    getPriceData(),
  ]);
  const ttlIV = [...market.market.ttlIV].sort((a, b) => a.ttl - b.ttl);
  const primePoolPriceData = priceData.find(
    (price) => price.poolAddress === market.market.primePool
  );

  return (
    <MarketDataProvider
      ttlIV={ttlIV}
      optionMarketAddress={market.market.address}
      primePool={market.market.primePool}
      primePoolPriceData={primePoolPriceData}
    >
      <main style={{ fontFamily: "var(--font-ibm)" }}>
        <Navbar />
        <div className=" max-w-[1440px] flex flex-row mx-auto border-t border-t-[#1A1A1A]">
          <div
            className="pt-6 pl-6 w-full max-w-[1054px] pr-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(11, 74, 143, 0.06) 0%, rgba(0, 0, 0, 0.00) 100%), #0D0D0D",
            }}
          >
            <SelectedTokenPairDetails />
            {/* TODO: check border color and corners */}
            <div className="border border-[#1A1A1A] p-[12px] pb-[0px] rounded-md mt-4 relative">
              <div className="mb-4 h-[500px] flex items-center justify-center">
                <Graph />
              </div>
              {/* <TokenPairSelector /> */}
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
    </MarketDataProvider>
  );
}
