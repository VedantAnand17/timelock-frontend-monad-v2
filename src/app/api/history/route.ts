// import Big from "big.js";
import { NextResponse } from "next/server";

const POOL_ADDRESS = "0xd0b53D9277642d899DF5C87A3966A349A798F224";
const TIMEFRAME_MAP = {
  1: "1m",
  5: "1m",
  15: "1m",
  60: "1h",
  "1D": "1d",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return new Response(`Pass from and to parameters`, { status: 400 });
    }

    const resolution = searchParams.get("resolution");
    const symbol = searchParams.get("symbol");

    if (!resolution || !symbol) {
      return new Response(`Pass resolution and symbol`, {
        status: 400,
      });
    }

    if (symbol !== "WBTC") {
      return NextResponse.json({ s: "no_data" });
    }

    const timeframe = TIMEFRAME_MAP[resolution as keyof typeof TIMEFRAME_MAP];

    if (!timeframe) {
      return NextResponse.json(
        {
          error: "Missing required parameters: timeframe",
        },
        { status: 400 }
      );
    }

    const validTimeframes = ["1m", "1h", "1d"];
    if (!validTimeframes.includes(timeframe)) {
      return NextResponse.json(
        { error: "Invalid timeframe. Must be one of: day, hour, minute" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OHLC_BACKEND}/ohlc/${POOL_ADDRESS}?from=${from}&to=${to}&interval=${timeframe}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = (await response.json()).data;

    let status = "ok";
    if (data.length === 0) {
      status = "no_data";
    }

    const t = [];
    const o = [];
    const h = [];
    const l = [];
    const c = [];
    // const v = [];

    for (const _data of data) {
      t.push(_data[0]);
      o.push(_data[1]);
      h.push(_data[2]);
      l.push(_data[3]);
      c.push(_data[4]);
      // v.push(Big(_data[6]).div(1e6));
    }

    const barsRes = {
      t: t,
      o: o,
      h: h,
      l: l,
      c: c,
      // v: v,
      s: status,
    };

    return NextResponse.json(barsRes);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}
