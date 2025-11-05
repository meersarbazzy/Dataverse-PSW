"use client";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import { StreamlitChatWidget } from "@/components/Chatbot/StreamlitChatWidget";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>Dataverse</title>
        <meta name="description" content="Dataverse Hub" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body
        className={`bg-white dark:bg-black ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Header />
          {children}
          
          
          <StreamlitChatWidget />
        </Providers>
      </body>
    </html>
  );
}