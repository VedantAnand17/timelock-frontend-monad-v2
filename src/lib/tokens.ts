import { Address } from "viem";

export type Token = {
  id: string;
  symbol: string;
  name: string;
  address: string;
  image: string;
  decimals: number;
  displayDecimals: number;
  coingeckoName: string;
};

export const WETH: Token = {
  id: "0",
  symbol: "WETH",
  name: "Wrapped Ether",
  address: "0x4200000000000000000000000000000000000006",
  image: "/tokens/weth.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "ethereum",
};

export const USDC: Token = {
  id: "1",
  symbol: "USDC",
  name: "Circle USD",
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  image: "/tokens/usdc.png",
  decimals: 6,
  displayDecimals: 2,
  coingeckoName: "usd-coin",
};

export const allTokens: Record<Address, Token> = {
  [WETH.address]: WETH,
  [USDC.address]: USDC,
};

export const supportedTokenPairs = [[WETH, USDC]];
