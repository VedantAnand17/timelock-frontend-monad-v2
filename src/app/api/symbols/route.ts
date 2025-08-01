import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  console.log('📊 Symbols API called for:', symbol);

  if (!symbol) {
    return NextResponse.json({ 
      s: "error", 
      errmsg: "No symbol provided" 
    }, { status: 400 });
  }

  if (symbol !== "WBTC") {
    console.log(`⚠️ Unknown symbol requested: ${symbol}`);
    return NextResponse.json({ 
      s: "error", 
      errmsg: `Unknown symbol: ${symbol}. Only WBTC is supported.` 
    });
  }

  const symbolInfo = {
    name: "WBTC",
    ticker: "WBTC", 
    description: "WBTC/USDC on Monad",
    type: "crypto",
    session: "0000-2400:1234567", // 24/7
    timezone: "Etc/UTC",
    exchange: "Uniswap-V3",
    listed_exchange: "Monad",
    minmov: 1,
    pricescale: 100, // 2 decimal places
    has_intraday: true,
    has_no_volume: false, // We have volume
    has_weekly_and_monthly: false, // Disable to avoid issues
    supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D"],
    intraday_multipliers: ["1", "5", "15", "30", "60", "240"],
    volume_precision: 2,
    data_status: "streaming",
    currency_code: "USDC",
  };

  console.log('✅ Returning symbol info for WBTC:', symbolInfo);
  return NextResponse.json(symbolInfo);
}