"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function FaucetButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

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
    <button
      onClick={handleClick}
      disabled={isLoading || !address}
      className="absolute right-10 bottom-10 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 active:bg-gray-600 transition-colors shadow-lg shadow-black/25 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Minting..." : "Faucet"}
    </button>
  );
}
