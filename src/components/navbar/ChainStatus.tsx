"use client";

import { UnsupportedIcon } from "@/icons";
import { monad } from "@/lib/chains";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useSwitchChain } from "wagmi";
import Image from "next/image";
import { useState, useEffect } from "react";

const ChainStatus = () => {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const [isMounted, setIsMounted] = useState(false);
  const isChainSupported = chainId === monad.id;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSwitchToMonad = () => {
    if (!isChainSupported && isConnected) {
      switchChain({ chainId: monad.id });
    }
  };

  // Prevent hydration mismatch by rendering a consistent initial state
  if (!isMounted) {
    return (
      <div className="text-sm font-medium px-3 py-3 rounded-full bg-[#131313]">
        <div className="flex flex-row items-center gap-2">
          <div className="w-4 h-4 bg-[#9CA3AF] rounded-full"></div>
          Monad
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-sm font-medium px-3 py-3 rounded-full bg-[#131313]",
        !isConnected || isChainSupported
          ? ""
          : "cursor-pointer hover:bg-[#1a1a1a]"
      )}
      onClick={handleSwitchToMonad}
    >
      {!isConnected || isChainSupported ? (
        <div className="flex flex-row items-center gap-2">
          <div className="w-4 h-4 bg-[#19DE92] rounded-full"></div>
          Monad
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
