import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIP Experience — RL Clubhouse",
  description:
    "Improve your overall Rocket League skill faster through 1:1 pro coaching, custom training routines, and real accountability.",
  openGraph: {
    title: "VIP Experience — RL Clubhouse",
    description:
      "1:1 pro coaching, custom training routines, and real accountability so you actually get better every month.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
