"use client";

import { useState } from "react";

// --- CONFIGURATION ---
const STREAMLIT_APP_URL = process.env.NEXT_PUBLIC_STREAMLIT_URL || "";
// ---------------------

export function StreamlitChatWidget() {
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
                h-[600px] w-[400px] overflow-hidden rounded-lg bg-white shadow-2xl
                transition-all duration-300 ease-in-out dark:bg-gray-900
                ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0 pointer-events-none"
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
                <h3 className="font-bold text-black dark:text-white">
                  Ask Dataverse
                </h3>
                <button
                  onClick={toggleChat}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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

              {/* Streamlit App Iframe */}
              <iframe
                src={STREAMLIT_APP_URL}
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
                bg-primary px-5 py-3 font-semibold
                text-black shadow-lg
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
    </div>
  );
}