"use client";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* --- Favicon Links --- */}
        <title>Dataverse</title>
        <meta name="description" content="Dataverse Hub" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* --- End Favicon Links --- */}
      </head>

      <body
        className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}