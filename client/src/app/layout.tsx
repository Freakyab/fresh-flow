import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider/provider";
import ReduxProvider from "./provider/reduxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";
import Navbar from "@/components/navbar.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Flow",
  description: "Made with react, redux, and next.js",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <Navbar />
            {children}
            <SpeedInsights />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
