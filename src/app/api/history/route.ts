import { NextResponse } from "next/server";

const NETWORK_ID = "base";
const POOL_ADDRESS = "0xd0b53D9277642d899DF5C87A3966A349A798F224";
const TIMEFRAME = "minute";

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

    const networkId = NETWORK_ID;
    const poolAddress = POOL_ADDRESS;
    const timeframe = TIMEFRAME;

    if (!resolution || !symbol) {
      return new Response(`Pass resolution and symbol`, {
        status: 400,
      });
    }

    if (!networkId || !poolAddress || !timeframe) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: networkId, poolAddress, timeframe",
        },
        { status: 400 }
      );
    }

    const validTimeframes = ["day", "hour", "minute"];
    if (!validTimeframes.includes(timeframe)) {
      return NextResponse.json(
        { error: "Invalid timeframe. Must be one of: day, hour, minute" },
        { status: 400 }
      );
    }

    // const response = await fetch(
    //   `https://pro-api.coingecko.com/api/v3/onchain/networks/${networkId}/pools/${poolAddress}/ohlcv/${timeframe}?token=quote&before_timestamp=${to}&limit=${limit}`,
    //   {
    //     headers: {
    //       accept: "application/json",
    //       "x-cg-pro-api-key": process.env.COINGECKO_API_KEY || "",
    //     },
    //   }
    // );

    const response = await fetch(
      `${process.env.OHLC_BACKEND}/ohlc/${poolAddress}?from=${from}&to=${to}&interval=${timeframe}`,
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

    for (const _data of data) {
      t.push(_data[0] * 1000);
      o.push(_data[1]);
      h.push(_data[2]);
      l.push(_data[3]);
      c.push(_data[4]);
    }

    const barsRes = {
      t: t.reverse(),
      o: o,
      h: h,
      l: l,
      c: c,
      s: status,
    };

    return NextResponse.json(barsRes);
  } catch (error) {
    console.error("Error fetching CoinGecko data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
