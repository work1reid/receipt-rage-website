import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Receipt Rage — Your supermarket is overcharging you.",
  description: "Scan your grocery receipt. See exactly how much you overpaid. Receipt Rage compares every item against real prices from Woolworths, Coles, and Aldi.",
  openGraph: {
    title: "Receipt Rage — Your supermarket is overcharging you.",
    description: "Scan your receipt. See how much you got ripped off. Share the proof.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
