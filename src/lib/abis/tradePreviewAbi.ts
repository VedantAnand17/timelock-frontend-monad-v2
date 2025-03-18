export const TRADE_PREVIEW_ABI = [
  {
    type: "function",
    name: "previewTrade",
    inputs: [
      {
        name: "optionMarket",
        type: "address",
        internalType: "contract IOptionMarket",
      },
      {
        name: "liquidityHandler",
        type: "address",
        internalType: "contract IHandler",
      },
      { name: "isCall", type: "bool", internalType: "bool" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "ttl", type: "uint256", internalType: "uint256" },
      { name: "maxCost", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "result",
        type: "tuple",
        internalType: "struct TradePreview.TradePreviewResult",
        components: [
          {
            name: "steps",
            type: "tuple[]",
            internalType: "struct TradePreview.TradeStep[]",
            components: [
              {
                name: "tickLower",
                type: "int24",
                internalType: "int24",
              },
              {
                name: "tickUpper",
                type: "int24",
                internalType: "int24",
              },
              {
                name: "strike",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "liquidity",
                type: "uint128",
                internalType: "uint128",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "premiumCost",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "protocolFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalCost",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "fullMatch", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  { type: "error", name: "T", inputs: [] },
];
