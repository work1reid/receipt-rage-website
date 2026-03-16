import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Receipt Rage — Are you getting ripped off?",
  description: "Scan your grocery receipt. See if you're getting ripped off. Share your rip-off score. Australia's grocery price gouging detector.",
  openGraph: {
    title: "Receipt Rage — Are you getting ripped off?",
    description: "Scan your grocery receipt. See if you're getting ripped off. Share your rip-off score.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
