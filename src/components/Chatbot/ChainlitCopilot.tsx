"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    chainlit?: {
      toggle: () => void;
      show: () => void;
      hide: () => void;
    };
    mountChainlitWidget: (config: {
      chainlitServer: string;
      theme?: "light" | "dark";
      button?: {
        containerId?: string; // We will mount it to a hidden div
      };
    }) => void;
  }
}

export function ChainlitCopilot() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Use relative path to go through Next.js proxy
    // This avoids CORS issues and works if the backend is on another machine (behind the proxy)
    const SCRIPT_URL = "/copilot/index.js";
    const scriptId = "chainlit-copilot-script";

    const initializeWidget = () => {
      let mountCheckCount = 0;
      const mountCheckInterval = setInterval(() => {
        mountCheckCount++;
        if (window.mountChainlitWidget) {
          clearInterval(mountCheckInterval);
          console.log("mountChainlitWidget found, initializing...");

          try {
            // Mount using the current origin (proxied)
            // Empty string or "." often implies current path, but passing the origin is safer if the widget expects a full URL.
            // However, with the proxy, we want it to treat the Next.js app AS the Chainlit server.
            window.mountChainlitWidget({
              chainlitServer: "", // Browser will resolve endpoints relative to current origin e.g. /copilot/...
              theme: "light",
              button: {
                containerId: "chainlit-hidden-container"
              },
            });

            // Poll for API readiness
            let checkCount = 0;
            const checkInterval = setInterval(() => {
              checkCount++;
              if (window.chainlit) {
                setIsReady(true);
                clearInterval(checkInterval);
              }
              if (checkCount > 200) clearInterval(checkInterval);
            }, 100);

          } catch (err) {
            console.error("Error mounting widget:", err);
          }
        }

        if (mountCheckCount > 200) {
          clearInterval(mountCheckInterval);
        }
      }, 100);
    };

    // If script is already there, just init
    if (document.getElementById(scriptId)) {
      if (window.mountChainlitWidget) initializeWidget();
      return;
    }

    // Load the script
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = initializeWidget;
    script.onerror = () => {
        console.error("Failed to load Chainlit script. Please check if the backend is running and reachable via proxy.");
    };
    document.body.appendChild(script);
  }, []);

  const handleToggle = () => {
    if (window.chainlit) {
      window.chainlit.toggle();
    } else {
      console.warn("Chainlit API not ready yet");
    }
  };

  return (
    <>
      {/* Hidden container for the default widget button */}
      <div id="chainlit-hidden-container" style={{ display: 'none' }} />

      {/* CUSTOM "Ask Dataverse" BUTTON */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #009A5C, #007A48)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 14px rgba(0, 154, 92, 0.4)"
        }}
        aria-label="Ask Dataverse"
        title="Ask Dataverse Copilot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032 1.757c-.502-2.325-2.553-4.004-4.872-4.419-4.156-.742-8.358-.742-12.514 0C5.176 4.263 3.1 6.095 2.633 8.94c-.167 1.012-.132 2.05.104 3.053l-.977 1.758c-.5 1.01.216 2.115 1.259 1.942l3.164-.525c.677.105 1.76.251 2.923.368a4.403 4.403 0 001.077-1.996 16.975 16.975 0 01-3.262-.437c-3-.537-5.116-2.59-5.613-5.592a8.68 8.68 0 011.696-6.852z" />
          <path fillRule="evenodd" d="M12.593 17.962l-2.062.343c-.886.147-1.493 1.09-.99 1.896l.859 1.376c-1.163-.207-1.573-.97-1.47-1.898.118-1.071 1.7-1.298 2.66-.464l.872.486.13-.239zM15 12a3 3 0 11-6 0 3 3 0 016 0zm-1.8-1.8a1.2 1.2 0 10-2.4 0 1.2 1.2 0 002.4 0z" clipRule="evenodd" />
        </svg>
      </button>
    </>
  );
}
