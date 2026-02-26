import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Techlinx Workspace",
  description: "Premium SaaS admin dashboard UI"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} min-h-screen font-sans antialiased`}>{children}</body>
    </html>
  );
}
