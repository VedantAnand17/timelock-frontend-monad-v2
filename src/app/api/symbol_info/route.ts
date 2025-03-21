export async function GET() {
  const symbolInfo = {
    symbol: ["WETH"],
    description: [""],
    "exchange-listed": "",
    "exchange-traded": "",
    minmovement: 1,
    minmovement2: 0,
    pricescale: [1000],
    "has-dwm": true,
    "has-intraday": true,
    type: ["stock"],
    ticker: ["WETH"],
    timezone: "America/New_York",
    "session-regular": "0000-2359",
  };

  return Response.json(symbolInfo);
}
