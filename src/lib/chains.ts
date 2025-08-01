import { defineChain } from "viem";
import { RPC_URL } from "./rpcs";

export const monad = defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 10143,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL || "https://testnet-rpc.monad.xyz"] },
    public: { http: [process.env.NEXT_PUBLIC_RPC_URL || "https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { 
      name: "MonVision", 
      url: "https://testnet.monadexplorer.com",
      apiUrl: "https://testnet.monadexplorer.com/api"
    },
  },
  testnet: true,
});

// For backward compatibility
export const virtualBase = monad;
