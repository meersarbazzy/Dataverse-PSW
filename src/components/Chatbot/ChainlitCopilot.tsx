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
        id?: string;
        containerId?: string;
        imageUrl?: string;
        style?: {
          size?: string;
          bgcolor?: string;
          color?: string;
          bgcolorHover?: string;
          borderColor?: string;
          borderWidth?: string;
          fontFamily?: string;
          fontSize?: string;
          fontWeight?: string;
          boxShadow?: string;
        };
      };
    }) => void;
  }
}

const CHAINLIT_APP_URL = process.env.NEXT_PUBLIC_CHAINLIT_URL || "http://localhost:8000";

export function ChainlitCopilot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scriptId = "chainlit-copilot-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `${CHAINLIT_APP_URL}/copilot/index.js`;
    script.async = true;

    script.onload = () => {
      if (window.mountChainlitWidget) {
        window.mountChainlitWidget({
          chainlitServer: CHAINLIT_APP_URL,
          theme: "light",
          button: {
            // We want to hide the default button because we are using our custom one
            // We can try to make it invisible or tiny if there isn't a direct 'hide' option
            // Or typically, sticking it in a hidden container works.
            // For now, let's keep the config but maybe we can override it via CSS or
            // just rely on our custom button overlaying it or being the primary interaction.
            // Actually, if we don't provide a containerId, it appends to body.
            style: {
              bgcolor: "transparent",
              color: "transparent",
              boxShadow: "none",
            }
          },
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  const handleToggle = () => {
    if (window.chainlit) {
      window.chainlit.toggle();
      setIsOpen(!isOpen); // Optimistic toggle
    } else {
      console.warn("Chainlit widget not loaded yet.");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-auto">
      {/* Custom Button restoring the "Ask Dataverse" pill look */}
      <button
        onClick={handleToggle}
        className={`
          relative z-20 flex items-center justify-center rounded-full
          bg-primary/90 px-6 py-4 font-bold text-white
          shadow-[0_0_20px_rgba(0,255,154,0.4)]
          backdrop-blur-sm border border-primary/50
          hover:scale-105 hover:bg-primary hover:shadow-[0_0_30px_rgba(0,255,154,0.6)]
          transition-all duration-300 ease-in-out
        `}
        aria-label="Ask Dataverse"
      >
        {/* Chat Icon */}
        <svg
          className="mr-2 h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
        {/* Label Text */}
        Ask Dataverse
      </button>

      {/* 
        We also need to ensure the default widget button (if it renders) is hidden.
        We can do this via a global style or inline style injection.
      */}
      <style jsx global>{`
        #chainlit-copilot-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
