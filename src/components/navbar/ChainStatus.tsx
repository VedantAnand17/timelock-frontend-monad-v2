import { UnsupportedIcon } from "@/icons";

import { virtualBase } from "@/lib/chains";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useSwitchChain } from "wagmi";
import Image from "next/image";

const ChainStatus = () => {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const isChainSupported = chainId === virtualBase.chainId;

  const handleSwitchToBase = () => {
    if (!isChainSupported && isConnected) {
      switchChain({ chainId: virtualBase.chainId });
    }
  };

  return (
    <div
      className={cn(
        "text-sm font-medium px-3 py-3 rounded-full bg-[#131313]",
        !isConnected || isChainSupported
          ? ""
          : "cursor-pointer hover:bg-[#1a1a1a]"
      )}
      onClick={handleSwitchToBase}
    >
      {!isConnected || isChainSupported ? (
        <div className="flex flex-row items-center gap-2">
          <Image src="/tokens/base.png" alt="base" width={16} height={16} />
          Base
        </div>
      ) : (
        <div className="flex flex-row items-center gap-[6px]">
          <UnsupportedIcon />
          Unsupported
        </div>
      )}
    </div>
  );
};

export default ChainStatus;
