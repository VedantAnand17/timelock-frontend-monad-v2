export async function GET() {
  const symbolInfo = {
    symbol: ["WBTC"],
    description: ["WBTC/USDC"],
    "exchange-listed": "Monad",
    "exchange-traded": "Uniswap-V3", 
    minmovement: 1,
    minmovement2: 0,
    pricescale: [100], // 2 decimal places for WBTC price
    "has-dwm": true,
    "has-intraday": true,
    "has-no-volume": false, // We have volume data
    type: ["crypto"],
    ticker: ["WBTC"],
    timezone: "Etc/UTC",
    "session-regular": "0000-2400:1234567", // 24/7 trading
    "supported-resolutions": ["1", "5", "15", "30", "60", "240", "1D"],
    "intraday-multipliers": ["1", "5", "15", "30", "60", "240"],
    "has-weekly-and-monthly": true,
  };

  return Response.json(symbolInfo);
}