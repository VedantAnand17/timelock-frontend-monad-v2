"use client";

// import useGraphData from "@/hooks/useGraphData";
import React, { useState } from "react";
import { TradingView } from "./TradingView";
import Script from "next/script";
import { ResolutionString } from "../../../public/static/charting_library/charting_library";
import { ChartingLibraryWidgetOptions } from "../../../public/static/charting_library/charting_library";

export default function Graph() {
  const [isScriptReady, setIsScriptReady] = useState(false);

  //   const { data, isLoading, error } = useGraphData();
  //   console.log("data", data);

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {(error as Error).message}</div>;

  const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: "WETH",
    interval: "1" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
  };

  return (
    <>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TradingView {...defaultWidgetProps} />}
    </>
  );
}
