"use client";

import { ConnectKitButton } from "connectkit";
import { truncateAddress } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "@/icons";
import { useAccount, useBalance } from "wagmi";
import { USDC } from "@/lib/tokens";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";
import { formatTokenDisplayCondensed } from "@/lib/format";

const ConnectButton = () => {
  const { selectedTokenPair } = useSelectedTokenPair();
  const { isConnected, address } = useAccount();

  const { data: balanceData, isLoading } = useBalance({
    address: address,
    token: USDC.address as `0x${string}`,
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 3000,
    },
  });

  return (
    <div className="flex flex-row items-center bg-[#131313] rounded-full">
      {isConnected && (
        <div className="w-fit flex h-full px-3 pl-5 text-sm">
          {isLoading ? (
            <div className="h-4 w-16 animate-pulse rounded bg-gray-700" />
          ) : (
            `${
              balanceData
                ? formatTokenDisplayCondensed(
                    balanceData.formatted,
                    selectedTokenPair[1].decimals
                  )
                : "--"
            } ${selectedTokenPair[1].symbol}`
          )}
        </div>
      )}
      <div className="min-h-[42px] w-[138px]">
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => (
            <button
              onClick={show}
              className={cn(
                "w-[138px] h-[42px] whitespace-nowrap rounded-full bg-white px-4 py-2 text-[#0D0D0D] font-semibold text-[15px] cursor-pointer",
                isConnected && "text-[#D1D5DA] font-bold bg-white/[0.06]"
              )}
            >
              {isConnected && address ? (
                <div className="flex flex-row items-center gap-2 justify-center">
                  {truncateAddress(address, 4)}
                  <ArrowDownIcon />
                </div>
              ) : (
                "Connect Wallet"
              )}
            </button>
          )}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
};

export default ConnectButton;
