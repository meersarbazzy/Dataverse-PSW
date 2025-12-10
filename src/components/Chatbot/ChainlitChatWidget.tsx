"use client";

import { useState } from "react";

// --- CONFIGURATION ---
const CHAINLIT_APP_URL = process.env.NEXT_PUBLIC_CHAINLIT_URL || "";
// ---------------------

export function ChainlitChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    // 1. New WRAPPER:
    <div className="fixed bottom-8 left-0 right-0 z-50 w-full pointer-events-none">


      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <div className="relative pointer-events-auto">

            {/* Chat Window */}
            <div
              className={`
                absolute bottom-[calc(100%+1rem)] right-0 
                h-[600px] w-[400px] overflow-hidden rounded-2xl 
                glass-panel neon-border shadow-2xl
                transition-all duration-300 ease-in-out
                ${isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0 pointer-events-none"
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-white/10 p-4 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-[#00ff9a] shadow-[0_0_10px_#00ff9a] animate-pulse" />
                  <h3 className="font-bold text-white drop-shadow-md">
                    Ask Dataverse
                  </h3>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:rotate-90"
                  aria-label="Close chat"
                >
                  {/* Close Icon (X) */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Chainlit App Iframe */}
              <iframe
                src={CHAINLIT_APP_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                className="h-full w-full"
              />
            </div>

            {/* Chat Bubble Button */}
            <button
              onClick={toggleChat}
              className={`
                relative z-20 flex items-center justify-center rounded-full
                bg-primary/90 px-6 py-4 font-bold text-white
                shadow-[0_0_20px_rgba(0,255,154,0.4)]
                backdrop-blur-sm border border-primary/50
                hover:scale-105 hover:bg-primary hover:shadow-[0_0_30px_rgba(0,255,154,0.6)]
                transition-all duration-300 ease-in-out
                ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}
              `}
              aria-label="Open chat"
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
          </div>
        </div>
      </div>
    </div >
  );
}
