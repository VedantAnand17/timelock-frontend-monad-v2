import Navbar from "../components/navbar";
import SelectedTokenPairDetails from "@/components/SelectedTokenPairDetails";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <SelectedTokenPairDetails />
      </div>
    </main>
  );
}
