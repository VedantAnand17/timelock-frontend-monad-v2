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
  image: "/tokens/btc.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "ethereum",
};

export const USDC: Token = {
  id: "1",
  symbol: "USDC",
  name: "Circle USD",
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  image: "/tokens/btc.png",
  decimals: 6,
  displayDecimals: 2,
  coingeckoName: "usd-coin",
};

export const BASE: Token = {
  id: "2",
  symbol: "BASE",
  name: "Base",
  address: "0xE3B53AF74a4BF62Ae5511055290838050bf764Df",
  image: "/tokens/btc.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "base",
};

export const ETH: Token = {
  id: "3",
  symbol: "ETH",
  name: "Ethereum",
  address: "0x0000000000000000000000000000000000000000",
  image: "/tokens/btc.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "ethereum",
};

export const BTC: Token = {
  id: "4",
  symbol: "BTC",
  name: "Bitcoin",
  address: "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b",
  image: "/tokens/btc.png",
  decimals: 8,
  displayDecimals: 6,
  coingeckoName: "bitcoin",
};

export const SOL: Token = {
  id: "5",
  symbol: "SOL",
  name: "Solana",
  address: "0x2Bd6A9e8D0c44Fb375c820E21F01A4291F5801d6",
  image: "/tokens/btc.png",
  decimals: 9,
  displayDecimals: 4,
  coingeckoName: "solana",
};

export const MATIC: Token = {
  id: "6",
  symbol: "MATIC",
  name: "Polygon",
  address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  image: "/tokens/btc.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "matic-network",
};

export const LINK: Token = {
  id: "7",
  symbol: "LINK",
  name: "Chainlink",
  address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  image: "/tokens/btc.png",
  decimals: 18,
  displayDecimals: 4,
  coingeckoName: "chainlink",
};

export const allTokens: Record<Address, Token> = {
  [WETH.address]: WETH,
  [USDC.address]: USDC,
  [BASE.address]: BASE,
  [ETH.address]: ETH,
  [BTC.address]: BTC,
  [SOL.address]: SOL,
  [MATIC.address]: MATIC,
  [LINK.address]: LINK,
};

export const supportedTokenPairs = [
  [WETH, USDC],
  [BASE, USDC],
  [ETH, USDC],
  [BTC, USDC],
  [SOL, USDC],
  [MATIC, USDC],
  [LINK, USDC],
];
