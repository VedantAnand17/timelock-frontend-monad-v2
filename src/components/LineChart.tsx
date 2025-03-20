"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChart({
  data,
  width = "100%",
  height = "100%",
}: {
  data:
    | {
        timestamp: number;
        value: string | undefined;
      }[]
    | undefined;
  width?: string;
  height?: string;
}) {
  const formattedData =
    data?.map((item) => ({
      timestamp: item.timestamp,
      value: item.value ? parseFloat(item.value) : null,
    })) || [];

  return (
    <ResponsiveContainer width={width} height={height} aspect={undefined}>
      <RechartsLineChart
        data={formattedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <defs>
          <linearGradient id="blueYellowGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#19DE9280" />
            <stop offset="20%" stopColor="#19DE9280" />
            <stop offset="30%" stopColor="#19DE9280" />
            <stop offset="50%" stopColor="#19DE9280" />
            <stop offset="100%" stopColor="#19DE9280" />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          type="number"
          hide={true}
          domain={["dataMin", "dataMax"]}
        />
        <YAxis domain={["auto", "auto"]} hide={true} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#blueYellowGradient)"
          strokeWidth={1}
          dot={false}
          activeDot={false}
          isAnimationActive={true}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
