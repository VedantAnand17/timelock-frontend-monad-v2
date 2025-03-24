"use client";

import { FaucetIcon } from "@/icons";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { FaucetDialog } from "@/components/dialog/FaucetDialog";

const FaucetButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address } = useAccount();

  const handleMint = async () => {
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
      setIsDialogOpen(false);
    } catch (error: unknown) {
      console.error("Faucet error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to mint tokens";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <button
        className={cn(
          "text-sm font-medium px-3 py-3 rounded-full bg-[#131313]",
          "cursor-pointer hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        onClick={handleButtonClick}
      >
        <div className="flex flex-row items-center gap-2">
          <FaucetIcon />
          Mint
        </div>
      </button>

      <FaucetDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onMint={handleMint}
        isLoading={isLoading}
      />
    </>
  );
};

export default FaucetButton;
