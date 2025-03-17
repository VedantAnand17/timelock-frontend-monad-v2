import { NextResponse } from "next/server";

const NETWORK_ID = "base";
const POOL_ADDRESS = "0xd0b53D9277642d899DF5C87A3966A349A798F224";
const TIMEFRAME = "day";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const resolution = searchParams.get("resolution");
    const symbol = searchParams.get("symbol");

    const networkId = NETWORK_ID;
    const poolAddress = POOL_ADDRESS;
    const timeframe = TIMEFRAME;

    if (!from || !to || !resolution || !symbol) {
      return new Response(`Pass from, to, resolution, and symbol`, {
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

    const response = await fetch(
      `https://pro-api.coingecko.com/api/v3/onchain/networks/${networkId}/pools/${poolAddress}/ohlcv/${timeframe}?token=quote`,
      {
        headers: {
          accept: "application/json",
          "x-cg-pro-api-key": process.env.COINGECKO_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = (await response.json()).data.attributes.ohlcv_list;
    console.log("data", data);

    // Filter data between from and to timestamps
    const fromTimestamp = parseInt(from);
    const toTimestamp = parseInt(to);

    const filteredData = data.filter((item: number[]) => {
      const timestamp = item[0];
      return timestamp >= fromTimestamp && timestamp < toTimestamp;
    });

    let status = "ok";
    if (filteredData.length === 0) {
      status = "no_data";
    }

    const t = [];
    const o = [];
    const h = [];
    const l = [];
    const c = [];

    for (const _data of filteredData) {
      t.push(_data[0]);
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
