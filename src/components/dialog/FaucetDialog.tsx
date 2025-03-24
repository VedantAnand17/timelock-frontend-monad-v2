import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { X } from "lucide-react";

export function FaucetDialog({
  isOpen,
  setIsOpen,
  onMint,
  isLoading,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onMint: () => void;
  isLoading: boolean;
}) {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="!max-w-[450px] !p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        <DialogTitle className="sr-only">Timelock Faucet</DialogTitle>
        <div className="flex flex-col items-center">
          <Image
            src="/faucet-abstract.png"
            alt="Faucet"
            width={450}
            height={232}
          />
          <div className="text-[40px] pt-[30px] pb-1">Timelock Faucet</div>
          <span className="text-[18px] text-[#A3A3A3] max-w-[300px] text-center">
            Click here to grab some ETH for gas and USDC to kick off your
            trading!
          </span>
          <div className="grid grid-cols-2 gap-[30px] w-full mb-6 px-[40px] pt-[32px]">
            <div className="flex flex-col items-center p-4 bg-[#1a1a1a80] border border-[#282324] rounded-lg">
              <div className="mb-[14px] p-[17px] rounded-[20px] bg-gradient-to-br from-[#262626] to-[#171717]">
                <Image
                  src="/tokens/usdc.png"
                  alt="USDC"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-white text-lg font-medium">1000 USDC</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#1a1a1a80] border border-[#282324] rounded-lg">
              <div className="mb-[14px] p-[17px] rounded-[20px] bg-gradient-to-br from-[#262626] to-[#171717]">
                <Image src="/tokens/eth.png" alt="ETH" width={40} height={40} />
              </div>
              <span className="text-white text-lg font-medium">1 ETH</span>
            </div>
          </div>
        </div>
        <DialogFooter className="px-[40px] pb-[32px]">
          <button
            className={cn(
              "w-full cursor-pointer bg-[#E5E5E5] text-[#0D0D0D] font-medium text-base rounded-[12px] py-3",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={isLoading}
            onClick={() => {
              if (isConnected) {
                onMint();
              } else {
                setOpen(true);
              }
            }}
          >
            {isConnected
              ? isLoading
                ? "Minting..."
                : "Mint"
              : "Connect Wallet"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
