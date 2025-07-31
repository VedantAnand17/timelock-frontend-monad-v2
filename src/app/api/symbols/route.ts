import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ s: "error", errmsg: "No symbol provided" }, { status: 400 });
  }

  if (symbol !== "WBTC") {
    return NextResponse.json({ s: "error", errmsg: "Unknown symbol" });
  }

  const symbolInfo = {
    name: "WBTC",
    ticker: "WBTC",
    description: "WBTC/USDC",
    type: "crypto",
    session: "0000-2400:1234567",
    timezone: "Etc/UTC",
    exchange: "",
    minmov: 1,
    pricescale: 100,
    has_intraday: true,
    has_no_volume: true,
    has_weekly_and_monthly: false,
    supported_resolutions: ["1", "5", "15", "60", "1D"],
    volume_precision: 2,
    data_status: "streaming",
  };

  return NextResponse.json(symbolInfo);
} 