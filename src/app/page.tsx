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
      <main className="min-h-screen bg-[#0D0D0D]" style={{ fontFamily: "var(--font-ibm)" }}>
        <Navbar />
        <div className="flex flex-row max-w-[1440px] mx-auto">
          <div className="flex-1 p-6">
            <SelectedTokenPairDetails />
            <div className="mt-6 relative">
              <div className="h-[500px]">
                <Graph />
              </div>
            </div>
            <div className="mt-6">
              <Tables />
            </div>
          </div>
          <TradingPanel />
        </div>
      </main>
    </MarketDataProvider>
  );
}
