"use client";

import { ConnectKitButton } from "connectkit";
import { truncateAddress } from "@/lib/helper";

const ConnectButton = () => {
  // TODO: Style later
  return (
    <div className="min-h-[42px] w-[138px]">
      <ConnectKitButton.Custom>
        {({ isConnected, show, address }) => (
          <button
            onClick={show}
            className="w-[138px] h-[42px] whitespace-nowrap rounded-full bg-white px-4 py-2 text-[#0D0D0D] font-semibold text-sm cursor-pointer"
          >
            {isConnected && address
              ? truncateAddress(address)
              : "Connect Wallet"}
          </button>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default ConnectButton;
