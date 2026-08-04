import { type Viewport } from "next";
import { DM_Serif_Display, Lora, Roboto_Mono } from "next/font/google";
import PortfolioLayoutShell from "@/components/PortfolioLayoutShell";
import { cn } from "@/lib/utils";
import { getPortfolioLayoutData } from "@/lib/portfolioLayoutData";
import { getPortfolioMetadata } from "@/lib/portfolioMetadata";

import "../globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--dm-serif-display",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--lora",
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--roboto",
});

export const generateMetadata = getPortfolioMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config, pages, posts, structuredData } =
    await getPortfolioLayoutData();

  return (
    <html
      lang="de"
      className={cn(lora.variable, roboto.variable, dmSerif.variable)}
      suppressHydrationWarning
    >
      <PortfolioLayoutShell
        config={config}
        pages={pages}
        posts={posts}
        structuredData={structuredData}
      >
        {children}
      </PortfolioLayoutShell>
    </html>
  );
}
