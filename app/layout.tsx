import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Honda Dealer DMS · Demo",
  description: "Multi-branch Honda dealer management system demo with mock data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
