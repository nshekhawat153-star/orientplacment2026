import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Legal recruiters for small and mid-size law firms | Orion",
  description:
    "Screened attorneys and paralegals for small and mid-size law firms. See candidates for your seat today. No retainer, and no fee unless you hire.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#08142A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerifDisplay.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body className="clean" suppressHydrationWarning>
        <SiteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
