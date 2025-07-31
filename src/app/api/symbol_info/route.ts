export async function GET() {
  const symbolInfo = {
    symbol: ["WBTC"],
    description: [""],
    "exchange-listed": "",
    "exchange-traded": "",
    minmovement: 1,
    minmovement2: 0,
    pricescale: [1000],
    "has-dwm": true,
    "has-intraday": true,
    type: ["crypto"],
    ticker: ["WBTC"],
    timezone: "Etc/UTC",
    "session-regular": "0000-2400:1234567",
  };

  return Response.json(symbolInfo);
}
