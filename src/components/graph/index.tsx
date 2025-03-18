"use client";

import React, { useState } from "react";
import { TradingView } from "./TradingView";
import Script from "next/script";

export default function Graph() {
  const [isScriptReady, setIsScriptReady] = useState(false);

  return (
    <>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TradingView />}
    </>
  );
}
