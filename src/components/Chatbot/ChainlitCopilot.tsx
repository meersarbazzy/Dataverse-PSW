"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const CHAINLIT_APP_URL = process.env.NEXT_PUBLIC_CHAINLIT_URL || "http://localhost:8000";

export function ChainlitCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  // Drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Keyboard Shortcuts & Click Outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl + / (standard help shortcut)
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // If clicking outside the chat window and NOT on the toggle button
      if (
        isOpen &&
        windowRef.current &&
        !windowRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('button[aria-label="Ask Dataverse"]')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Drag Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Optional: Add boundary checks here to prevent losing the window
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag via header
    setIsDragging(true);
    // Calculate offset from current position
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Reset position if needed, or keep memory (currently keeps memory)
  };

  const themeParam = resolvedTheme === "dark" ? "dark" : "light";
  // Append theme to URL
  const iframeSrc = `${CHAINLIT_APP_URL}?theme=${themeParam}`;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Iframe Chat Window - Copilot Style */}
      <div
        ref={windowRef}
        className={`fixed z-[9999] w-[450px] h-[650px] rounded-2xl shadow-2xl transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden flex flex-col border ${isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none translate-y-12"
          }`}
        style={{
          // Positioning: Fixed at bottom-right + dynamic drag offset
          right: "24px",
          bottom: "96px",
          transform: `translate(${position.x}px, ${position.y}px)`,

          // Glassmorphism
          background: isDark ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)",
          boxShadow: isDark
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset"
        }}
      >
        {/* Header - Draggable Area */}
        <div
          onMouseDown={handleMouseDown}
          className={`flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm cursor-grab active:cursor-grabbing select-none ${isDark ? "border-white/10 bg-white/5" : "border-gray-200/50 bg-white/50"
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <div>
              <h3 className={`font-bold text-base leading-tight ${isDark ? "text-white" : "text-gray-800"}`}>Dataverse Copilot</h3>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-green-500">Online</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-full transition-all duration-200 ${isDark ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-600 hover:bg-black/5"
              }`}
            aria-label="Close Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 w-full relative ${isDark ? "bg-black/20" : "bg-white/30"}`}>
          <iframe
            src={iframeSrc}
            className="absolute inset-0 w-full h-full border-none"
            title="Chainlit Chatbot"
            allow="microphone"
          />
        </div>
      </div>

      {/* CUSTOM "Ask Dataverse" BUTTON */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none px-6 py-3"
        style={{
          background: "linear-gradient(135deg, #009A5C, #007A48)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 14px rgba(0, 154, 92, 0.4)"
        }}
        aria-label="Ask Dataverse"
        title="Ask Dataverse Copilot (Ctrl + /)"
      >
        <span className="text-white font-semibold text-lg tracking-wide">
          Ask Dataverse
        </span>
      </button>
    </>
  );
}
