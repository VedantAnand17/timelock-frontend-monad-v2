// "use client";
// import { memo, useEffect, useRef, useState } from "react";
// import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";

// import {
//   ChartingLibraryWidgetOptions,
//   ResolutionString,
//   widget,
// } from "../../../public/static/charting_library";

// export const TradingView = memo(() => {
//   const { selectedTokenPair } = useSelectedTokenPair();
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const tvWidgetRef = useRef<any>(null);
//   const [isChartReady, setIsChartReady] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingStep, setLoadingStep] = useState('Initializing...');

//   useEffect(() => {
//     if (!window || !chartContainerRef.current) return;
    
//     setLoadingStep('Checking dependencies...');
    
//     // Check if required globals are available
//     if (!(window as any).Datafeeds) {
//       setError('TradingView Datafeeds not loaded');
//       console.error('❌ TradingView Datafeeds not available');
//       return;
//     }

//     if (!(window as any).TradingView?.widget) {
//       setError('TradingView library not loaded');
//       console.error('❌ TradingView widget not available');
//       return;
//     }

//     console.log('🚀 Initializing TradingView with symbol:', selectedTokenPair[0].symbol);
//     setLoadingStep('Creating widget...');

//     // Add timeout to prevent infinite loading
//     const loadingTimeout = setTimeout(() => {
//       console.error('⏰ TradingView loading timeout');
//       setError('Chart loading timeout - please refresh');
//     }, 30000); // 30 second timeout

//     const widgetOptions: ChartingLibraryWidgetOptions = {
//       symbol: selectedTokenPair[0].symbol,
//       datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
//         "/api",
//         undefined,
//         {
//           expectedOrder: "latestLast",
//         }
//       ),
//       interval: "60" as ResolutionString, // Use 1h interval to match your data
//       container: chartContainerRef.current,
//       library_path: "/static/charting_library/",
//       locale: "en",
//       disabled_features: [
//         "use_localstorage_for_settings",
//         "adaptive_logo", 
//         "charting_library_debug_mode",
//         "symbol_search_hot_key",
//         "save_shortcut",
//         "header_symbol_search",
//         "header_compare", 
//         "header_settings",
//         "header_quick_search",
//         "header_chart_type",
//         "header_resolutions",
//         "header_screenshot",
//         "header_undo_redo",
//         "context_menus",
//         "left_toolbar",
//         "control_bar",
//         "timeframes_toolbar",
//       ],
//       enabled_features: [
//         "hide_left_toolbar_by_default",
//         "move_logo_to_main_pane",
//       ],
//       charts_storage_api_version: "1.1",
//       client_id: "timelock.trade",
//       user_id: "public_user_id",
//       fullscreen: false,
//       theme: "dark",
//       custom_font_family: "var(--font-ibm)",
//       debug: true, // Enable debug mode to see more info
//       custom_css_url: "/static/tradingview.css",
//       time_scale: {
//         min_bar_spacing: 10,
//       },
//       toolbar_bg: "#0D0D0D",
//       loading_screen: {
//         backgroundColor: "#0D0D0D", 
//         foregroundColor: "#fff",
//       },
//       autosize: true,
//       width: "100%",
//       height: "100%",
//       timezone: "Etc/UTC",
//     };

//     try {
//       setLoadingStep('Creating TradingView widget...');
//       tvWidgetRef.current = new (window as any).TradingView.widget(widgetOptions);

//       // Add error event listener
//       tvWidgetRef.current.onError?.((error: any) => {
//         console.error('❌ TradingView widget error:', error);
//         clearTimeout(loadingTimeout);
//         setError(`Chart error: ${error.message || error}`);
//       });

//       setLoadingStep('Waiting for chart ready...');
      
//       tvWidgetRef.current.onChartReady(() => {
//         console.log('✅ TradingView chart ready for', selectedTokenPair[0].symbol);
//         clearTimeout(loadingTimeout);
//         setIsChartReady(true);
//         setError(null);
//         setLoadingStep('Chart loaded!');
        
//         // Apply styling after chart is ready
//         try {
//           tvWidgetRef.current.applyOverrides({
//             "mainSeriesProperties.visible": true,
//             "paneProperties.background": "#0D0D0D",
//             "paneProperties.backgroundType": "solid",
//             "paneProperties.vertGridProperties.color": "#1A1A1A",
//             "paneProperties.horzGridProperties.color": "#1A1A1A",
//             "scalesProperties.textColor": "#9CA3AF",
//             "scalesProperties.backgroundColor": "#0D0D0D",
//             "symbolWatermarkProperties.transparency": 90,
//             "symbolWatermarkProperties.color": "#1A1A1A",
//             "mainSeriesProperties.candleStyle.upColor": "#19DE92",
//             "mainSeriesProperties.candleStyle.downColor": "#EC5058", 
//             "mainSeriesProperties.candleStyle.drawWick": true,
//             "mainSeriesProperties.candleStyle.drawBorder": true,
//             "mainSeriesProperties.candleStyle.borderUpColor": "#19DE92",
//             "mainSeriesProperties.candleStyle.borderDownColor": "#EC5058",
//             "mainSeriesProperties.candleStyle.wickUpColor": "#19DE92",
//             "mainSeriesProperties.candleStyle.wickDownColor": "#EC5058",
//           });
//         } catch (styleError) {
//           console.warn('⚠️ Error applying chart styles:', styleError);
//         }
        
//         // Additional setup after header is ready
//         tvWidgetRef.current.headerReady().then(() => {
//           console.log('✅ TradingView header ready');
          
//           try {
//             const chart = tvWidgetRef.current.chart();
//             if (chart) {
//               chart.executeActionById("chartReset");
//             }
//           } catch (resetError) {
//             console.warn('⚠️ Error resetting chart:', resetError);
//           }
//         }).catch((headerError: any) => {
//           console.warn('⚠️ Header ready error:', headerError);
//         });
//       });

//     } catch (error) {
//       console.error('❌ Error initializing TradingView widget:', error);
//       clearTimeout(loadingTimeout);
//       setError(`Initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }

//     return () => {
//       clearTimeout(loadingTimeout);
//       if (tvWidgetRef.current) {
//         try {
//           tvWidgetRef.current.remove();
//           tvWidgetRef.current = null;
//           setIsChartReady(false);
//           setError(null);
//         } catch (error) {
//           console.error('❌ Error removing TradingView widget:', error);
//         }
//       }
//     };
//   }, [selectedTokenPair]);

//   if (error) {
//     return (
//       <div className="h-full w-full flex items-center justify-center bg-[#0D0D0D] text-white">
//         <div className="text-center p-6">
//           <div className="text-red-500 mb-2">⚠️ Chart Error</div>
//           <div className="text-sm text-gray-400 mb-4">{error}</div>
//           <div className="space-y-2">
//             <button 
//               className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               onClick={() => window.location.reload()}
//             >
//               Reload Page
//             </button>
//             <button 
//               className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//               onClick={() => {
//                 setError(null);
//                 setIsChartReady(false);
//               }}
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full relative">
//       <div ref={chartContainerRef} className="h-full w-full" />
//       {!isChartReady && (
//         <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D] text-white">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
//             <div className="text-sm mb-2">Loading WBTC/USDC chart...</div>
//             <div className="text-xs text-gray-400 mb-2">{loadingStep}</div>
//             <div className="text-xs text-gray-500">
//               Pool: {process.env.NEXT_PUBLIC_WBTC_USDC_POOL?.slice(0, 8)}...
//             </div>
//             {/* Debug info in development */}
//             {process.env.NODE_ENV === 'development' && (
//               <div className="mt-4 text-xs text-gray-600">
//                 <div>Symbol: {selectedTokenPair[0].symbol}</div>
//                 <div>Datafeeds: {(window as any).Datafeeds ? '✅' : '❌'}</div>
//                 <div>TradingView: {(window as any).TradingView ? '✅' : '❌'}</div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

// TradingView.displayName = "TradingView";

"use client";
import { memo, useEffect, useRef, useState } from "react";
import { useSelectedTokenPair } from "@/providers/SelectedTokenPairProvider";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  widget,
} from "../../../public/static/charting_library";

export const TradingView = memo(() => {
  const { selectedTokenPair } = useSelectedTokenPair();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tvWidgetRef = useRef<any>(null);
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    if (!window || !chartContainerRef.current) return;
    
    // Check dependencies
    if (!(window as any).Datafeeds || !(window as any).TradingView?.widget) {
      console.error('TradingView dependencies not loaded');
      return;
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: selectedTokenPair[0].symbol,
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
      disabled_features: [
        "use_localstorage_for_settings",
        "adaptive_logo",
        "header_symbol_search",
        "header_compare",
        "header_settings",
        "header_quick_search",
        "header_screenshot",
        "header_undo_redo",
        "context_menus",
        "left_toolbar",
        "control_bar",
        "timeframes_toolbar",
        "volume_force_overlay",
        "create_volume_indicator_by_default"
      ],
      enabled_features: [
        "hide_left_toolbar_by_default",
        "move_logo_to_main_pane",
        "chart_crosshair_menu",
        "popup_hints"
      ],
      charts_storage_api_version: "1.1",
      client_id: "timelock.trade",
      user_id: "public_user_id",
      fullscreen: false,
      theme: "dark",
      custom_font_family: "var(--font-ibm)",
      toolbar_bg: "#0D0D0D",
      loading_screen: {
        backgroundColor: "#0D0D0D",
        foregroundColor: "#fff",
      },
      autosize: true,
      studies_overrides: {
        "volume.volume.color.0": "#EC5058",
        "volume.volume.color.1": "#19DE92",
        "volume.volume.transparency": 80,
      },
      overrides: {
        // Main chart styling to match the image
        "paneProperties.background": "#0D0D0D",
        "paneProperties.backgroundType": "solid",
        "paneProperties.vertGridProperties.color": "#1A1A1A",
        "paneProperties.vertGridProperties.style": 0,
        "paneProperties.horzGridProperties.color": "#1A1A1A",
        "paneProperties.horzGridProperties.style": 0,
        "scalesProperties.textColor": "#9CA3AF",
        "scalesProperties.backgroundColor": "#0D0D0D",
        "scalesProperties.fontSize": 11,
        
        // Candlestick styling
        "mainSeriesProperties.candleStyle.upColor": "#19DE92",
        "mainSeriesProperties.candleStyle.downColor": "#EC5058",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderUpColor": "#19DE92",
        "mainSeriesProperties.candleStyle.borderDownColor": "#EC5058",
        "mainSeriesProperties.candleStyle.wickUpColor": "#19DE92",
        "mainSeriesProperties.candleStyle.wickDownColor": "#EC5058",
        
        // Remove watermark and clean up
        "symbolWatermarkProperties.transparency": 100,
        
        // Volume styling
        "volume.volume.color.0": "#EC5058",
        "volume.volume.color.1": "#19DE92",
        "volume.volume.transparency": 80,
        
        // Crosshair
        "crossHairProperties.color": "#9CA3AF",
        "crossHairProperties.style": 2,
        "crossHairProperties.transparency": 70,
        
        // Price line
        "mainSeriesProperties.priceLineColor": "#9CA3AF",
        "mainSeriesProperties.priceLineStyle": 2,
        "mainSeriesProperties.priceLineWidth": 1,
      },
      time_scale: {
        min_bar_spacing: 3,
        right_offset: 5,
      },
      timezone: "Etc/UTC",
    };

    try {
      tvWidgetRef.current = new (window as any).TradingView.widget(widgetOptions);

      tvWidgetRef.current.onChartReady(() => {
        setIsChartReady(true);
        
        // Additional customizations after chart is ready
        try {
          const chart = tvWidgetRef.current.chart();
          
          // Set chart type to candlesticks
          chart.setChartType(1);
          
          // Create volume study
          chart.createStudy('Volume', false, false, undefined, {
            'volume.volume.color.0': '#EC5058',
            'volume.volume.color.1': '#19DE92',
            'volume.volume.transparency': 80,
          });
          
        } catch (error) {
          console.warn('Error applying additional chart settings:', error);
        }
      });

    } catch (error) {
      console.error('Error initializing TradingView widget:', error);
    }

    return () => {
      if (tvWidgetRef.current) {
        try {
          tvWidgetRef.current.remove();
          tvWidgetRef.current = null;
          setIsChartReady(false);
        } catch (error) {
          console.error('Error removing TradingView widget:', error);
        }
      }
    };
  }, [selectedTokenPair]);

  return (
    <div className="h-full w-full relative bg-[#0D0D0D]">
      <div ref={chartContainerRef} className="h-full w-full" />
      {!isChartReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D] text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#19DE92] mx-auto mb-4"></div>
            <div className="text-sm text-gray-400">Loading {selectedTokenPair[0].symbol} Chart...</div>
          </div>
        </div>
      )}
    </div>
  );
});

TradingView.displayName = "TradingView";