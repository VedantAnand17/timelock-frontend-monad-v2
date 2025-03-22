"use client";

import { FaucetIcon } from "@/icons";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const FaucetButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();

  const handleClick = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mint tokens");
      }

      toast.success("Tokens minted successfully");
    } catch (error: unknown) {
      console.error("Faucet error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to mint tokens";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isConnected && (
      <button
        className={cn(
          "text-sm font-medium px-3 py-3 rounded-full bg-[#131313]",
          "cursor-pointer hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={isLoading || !address}
        onClick={handleClick}
      >
        <div className="flex flex-row items-center gap-2">
          <FaucetIcon />
          {isLoading ? "Minting..." : "Mint"}
        </div>
      </button>
    )
  );
};

export default FaucetButton;
