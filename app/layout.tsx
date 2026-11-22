import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { UserProvider } from "@/components/user-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Honda Dealer DMS · Demo",
  description: "Multi-branch Honda dealer management system demo with mock data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
