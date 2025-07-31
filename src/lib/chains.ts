import { base } from "viem/chains";
import { RPC_URL } from "./rpcs";
import { MONAD_RPC_URL } from "./rpcs";

// TODO: Fix chain, rpc and block explorer urls
export const virtualBase = {
  ...base,
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      ...base.rpcUrls.default,
      http: [RPC_URL],
    },
  },
  blockExplorers: {
    ...base.blockExplorers,
    default: {
      ...base.blockExplorers.default,
      name: "TenderlyScan",
      url: "https://virtual.base.rpc.tenderly.co/48eff710-fa31-470a-b5e6-232b1048f13e",
      apiUrl: "https://api.basescan.org/api",
    },
  },
};

export const monad = {
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL] },
    public: { http: [process.env.NEXT_PUBLIC_RPC_URL] },
  },
  blockExplorers: {
    default: { name: "MonVision", url: "https://testnet.monadexplorer.com", },
  },
  testnet: true,
};
