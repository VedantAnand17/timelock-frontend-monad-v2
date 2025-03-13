import TokenPairSelector from "@/components/TokenPairSelector";
import Navbar from "../components/navbar";
import SelectedTokenPairDetails from "@/components/SelectedTokenPairDetails";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-6 max-w-[1440px] mx-auto">
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
      </div>
    </main>
  );
}
