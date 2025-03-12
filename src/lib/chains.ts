import { base } from "viem/chains";
import { RPC_URL } from "./rpcs";

// TODO: Fix chain, rpc and block explorer urls
export const virtualBase = {
  ...base,
  chainId: 8450,
  id: 8450,
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
