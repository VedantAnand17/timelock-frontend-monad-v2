"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan 22", value: 1000 },
  { month: "Feb 22", value: 1800 },
  { month: "Mar 22", value: 1400 },
  { month: "Apr 22", value: 2300 },
  { month: "May 22", value: 2100 },
  { month: "Jun 22", value: 3400 },
  { month: "Jul 22", value: 2800 },
  { month: "Aug 22", value: 3900 },
  { month: "Sep 22", value: 5200 },
  { month: "Oct 22", value: 4700 },
  { month: "Nov 22", value: 6100 },
  { month: "Dec 22", value: 5800 },
  { month: "Jan 23", value: 7400 },
  { month: "Feb 23", value: 6900 },
  { month: "Mar 23", value: 8500 },
  { month: "Apr 23", value: 7800 },
  { month: "May 23", value: 9200 },
  { month: "Jun 23", value: 8900 },
  { month: "Jul 23", value: 10500 },
  { month: "Aug 23", value: 9800 },
  { month: "Sep 23", value: 11400 },
  { month: "Oct 23", value: 12800 },
  { month: "Nov 23", value: 11900 },
  { month: "Dec 23", value: 13500 },
];

export default function LineChart({
  width = "100%",
  height = "100%",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart
        data={data}
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
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#blueYellowGradient)"
          strokeWidth={1}
          dot={false}
          activeDot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
