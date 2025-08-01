// "use client";

// import React, { useState, useEffect } from "react";
// import { TradingView } from "./TradingView";

// export default function Graph() {
//   const [isScriptReady, setIsScriptReady] = useState(false);
//   const [isLibraryReady, setIsLibraryReady] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [loadingStep, setLoadingStep] = useState('Initializing...');
//   const [scriptErrors, setScriptErrors] = useState<string[]>([]);

//   useEffect(() => {
//     setIsMounted(true);
//     setLoadingStep('Checking existing libraries...');
    
//     // Check if libraries are already loaded
//     if (typeof window !== 'undefined') {
//       if ((window as any).TradingView) {
//         console.log('✅ TradingView already loaded');
//         setIsLibraryReady(true);
//       }
//       if ((window as any).Datafeeds) {
//         console.log('✅ Datafeeds already loaded');
//         setIsScriptReady(true);
//       }
      
//       // If both are already loaded, we're done
//       if ((window as any).TradingView && (window as any).Datafeeds) {
//         setLoadingStep('All libraries ready!');
//         return;
//       }
//     }
    
//     // Load scripts manually
//     loadScripts();
//   }, []);

//   const loadScript = (src: string, name: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       // Check if script already exists
//       const existingScript = document.querySelector(`script[src="${src}"]`);
//       if (existingScript) {
//         console.log(`✅ Script already exists: ${name}`);
//         resolve();
//         return;
//       }

//       console.log(`🚀 Loading script: ${name} from ${src}`);
//       const script = document.createElement('script');
//       script.src = src;
//       script.type = 'text/javascript';
      
//       script.onload = () => {
//         console.log(`✅ Script loaded successfully: ${name}`);
//         resolve();
//       };
      
//       script.onerror = (error) => {
//         console.error(`❌ Script failed to load: ${name}`, error);
//         reject(new Error(`Failed to load ${name}`));
//       };
      
//       document.head.appendChild(script);
//     });
//   };

//   const loadScripts = async () => {
//     try {
//       setLoadingStep('Loading TradingView library...');
      
//       // Load TradingView library first
//       await loadScript('/static/charting_library/charting_library.js', 'TradingView Library');
      
//       // Verify TradingView is available
//       if (typeof window !== 'undefined' && (window as any).TradingView) {
//         console.log('✅ TradingView global confirmed');
//         setIsLibraryReady(true);
//       } else {
//         throw new Error('TradingView global not found after loading script');
//       }
      
//       setLoadingStep('Loading datafeed bundle...');
      
//       // Load datafeed bundle
//       await loadScript('/static/datafeeds/udf/dist/bundle.js', 'Datafeed Bundle');
      
//       // Verify Datafeeds is available
//       if (typeof window !== 'undefined' && (window as any).Datafeeds) {
//         console.log('✅ Datafeeds global confirmed');
//         setIsScriptReady(true);
//         setLoadingStep('All libraries loaded successfully!');
//       } else {
//         throw new Error('Datafeeds global not found after loading script');
//       }
      
//     } catch (error) {
//       console.error('❌ Script loading failed:', error);
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//       setScriptErrors(prev => [...prev, errorMessage]);
//       setLoadingStep('Script loading failed');
//     }
//   };

//   // Don't render until mounted to prevent hydration mismatch
//   if (!isMounted) {
//     return (
//       <div className="h-full w-full flex items-center justify-center bg-[#0D0D0D] text-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
//           <p>Initializing Chart...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show errors if any scripts failed to load
//   if (scriptErrors.length > 0) {
//     return (
//       <div className="h-full w-full flex items-center justify-center bg-[#0D0D0D] text-white">
//         <div className="text-center p-6">
//           <div className="text-red-500 mb-4">⚠️ Chart Loading Error</div>
//           <div className="text-sm text-gray-400 mb-4">
//             Failed to load required chart libraries:
//           </div>
//           <ul className="text-xs text-red-400 mb-4 list-disc list-inside">
//             {scriptErrors.map((error, index) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//           <div className="space-y-2">
//             <button 
//               className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               onClick={() => window.location.reload()}
//             >
//               Reload Page
//             </button>
//             <button 
//               className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={() => window.open('/test-static', '_blank')}
//             >
//               Test Static Files
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full">
//       {/* Only render TradingView component when both scripts are ready */}
//       {isScriptReady && isLibraryReady ? (
//         <TradingView />
//       ) : (
//         <div className="h-full w-full flex items-center justify-center bg-[#0D0D0D] text-white">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
//             <div className="text-sm mb-2">Loading Chart Libraries...</div>
//             <div className="text-xs text-gray-400 mb-2">{loadingStep}</div>
//             <div className="text-xs text-gray-500">
//               <div>TradingView: {isLibraryReady ? '✅' : '⏳'}</div>
//               <div>Datafeeds: {isScriptReady ? '✅' : '⏳'}</div>
//             </div>
//             {/* Debug info */}
//             <div className="mt-4 text-xs text-gray-600">
//               <button 
//                 onClick={() => window.open('/test-static', '_blank')}
//                 className="px-3 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600"
//               >
//                 Debug Static Files
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { TradingView } from "./TradingView";

export default function Graph() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isLibraryReady, setIsLibraryReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if libraries are already loaded
    if (typeof window !== 'undefined') {
      if ((window as any).TradingView && (window as any).Datafeeds) {
        setIsLibraryReady(true);
        setIsScriptReady(true);
        return;
      }
    }
    
    loadScripts();
  }, []);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      
      document.head.appendChild(script);
    });
  };

  const loadScripts = async () => {
    try {
      await loadScript('/static/charting_library/charting_library.js');
      
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        setIsLibraryReady(true);
      }
      
      await loadScript('/static/datafeeds/udf/dist/bundle.js');
      
      if (typeof window !== 'undefined' && (window as any).Datafeeds) {
        setIsScriptReady(true);
      }
    } catch (error) {
      console.error('Failed to load chart dependencies:', error);
    }
  };

  // Loading state
  if (!isMounted || !isScriptReady || !isLibraryReady) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0D0D0D] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Loading Chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <TradingView />
      
      {/* Chart Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-xs text-[#9CA3AF] hover:text-white transition-colors">3m</button>
          <button className="px-2 py-1 text-xs text-[#9CA3AF] hover:text-white transition-colors">5d</button>
          <button className="px-2 py-1 text-xs text-[#9CA3AF] hover:text-white transition-colors">1d</button>
          <div className="w-6 h-6 bg-[#1A1A1A] rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3v18l18-9L3 3z" fill="#9CA3AF"/>
            </svg>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
          <span>10:52:56 (UTC)</span>
          <button className="hover:text-white transition-colors">%</button>
          <button className="hover:text-white transition-colors">log</button>
          <button className="text-[#19DE92] hover:text-[#15B77E] transition-colors">auto</button>
        </div>
      </div>
    </div>
  );
}