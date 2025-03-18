"use client";
import { memo, useEffect, useRef } from "react";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  widget,
} from "../../../public/static/charting_library";

export const TradingView = memo(() => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window || !chartContainerRef.current) return;
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: "WETH",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        "/api",
        undefined,
        {
          expectedOrder: "latestLast",
        }
      ),
      interval: "15" as ResolutionString,
      container: chartContainerRef.current,
      library_path: "/static/charting_library/",
      locale: "en",
      overrides: {
        "linetoolghostfeed.candleStyle.downColor": "#CD2B31",
        "linetoolghostfeed.candleStyle.upColor": "#99D52A",
      },
      disabled_features: [
        "volume_force_overlay",
        "use_localstorage_for_settings",
        "adaptive_logo",
        "charting_library_debug_mode",
        "symbol_search_hot_key",
        "save_shortcut",
        "header_symbol_search",
        "header_compare",
        "header_settings",
        "header_quick_search",
      ],
      enabled_features: [],
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      theme: "dark",
      custom_font_family: "Giest",
      debug: false,
      time_scale: {
        min_bar_spacing: 30,
      },
      loading_screen: {
        backgroundColor: "#0D0D0D",
        foregroundColor: "#fff",
      },
      autosize: true,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.applyOverrides({
      "mainSeriesProperties.visible": true,
      // candle
      "mainSeriesProperties.candleStyle.downColor": "#CD2B31",
      "mainSeriesProperties.candleStyle.upColor": "#99D52A",
      "mainSeriesProperties.candleStyle.wickColor": "#99D52A",
      "mainSeriesProperties.candleStyle.wickDownColor": "#CD2B31",
      "mainSeriesProperties.candleStyle.borderUpColor": "#99D52A",
      "mainSeriesProperties.candleStyle.borderDownColor": "#CD2B31",
      // hollow candles
      "mainSeriesProperties.hollowCandleStyle.upColor": "#99D52A",
      "mainSeriesProperties.hollowCandleStyle.downColor": "#CD2B31",
      // bar
      "mainSeriesProperties.barStyle.downColor": "#CD2B31",
      "mainSeriesProperties.barStyle.upColor": "#99D52A",
      // line
      "mainSeriesProperties.lineStyle.color": "#FF7009",
      // line with markers
      "mainSeriesProperties.lineWithMarkersStyle.color": "#FF7009",
      // columns
      "mainSeriesProperties.columnStyle.upColor": "#99D52A",
      "mainSeriesProperties.columnStyle.downColor": "#CD2B31",
      // area style
      "mainSeriesProperties.areaStyle.linecolor": "#FF7009",
      "mainSeriesProperties.areaStyle.color1": "#FF7009", // Change the first color of the gradient
      "mainSeriesProperties.areaStyle.color2": "#FF7009",
      // stepLine
      // HLC
      "mainSeriesProperties.hlcAreaStyle.highLineColor": "#FF7009",
      "mainSeriesProperties.hlcAreaStyle.closeLineColor": "#FF7009",
      // base lint
      "mainSeriesProperties.baselineStyle.topLineColor": "#99D52A",
      "mainSeriesProperties.baselineStyle.bottomLineColor": "#CD2B31",
      // heikin aishi
      "mainSeriesProperties.haStyle.downColor": "#CD2B31",
      "mainSeriesProperties.haStyle.upColor": "#99D52A",
      "mainSeriesProperties.haStyle.wickColor": "#99D52A",
      "mainSeriesProperties.haStyle.wickDownColor": "#CD2B31",
      "mainSeriesProperties.haStyle.borderUpColor": "#99D52A",
      "mainSeriesProperties.haStyle.borderDownColor": "#CD2B31",
      // high low
      "mainSeriesProperties.hiloStyle.color": "#FF7009",
      "mainSeriesProperties.hiloStyle.labelColor": "#FF7009",
      "mainSeriesProperties.hiloStyle.borderColor": "#FF7009",
      // Panel
      "paneProperties.background": "#0D0D0D",
      "paneProperties.backgroundType": "solid",
    });

    tvWidget.onChartReady(() => {});

    return () => {
      tvWidget.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="h-full w-full" />;
});

TradingView.displayName = "TradingView";
