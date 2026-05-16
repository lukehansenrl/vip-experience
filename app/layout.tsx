import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans, Big_Shoulders } from "next/font/google";
import { MetaPixel } from "./components/MetaPixel";
import "./globals.css";

// Kept for backwards-compatible references on /announce, /promise, etc.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Body font, matching spookyluke.com.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Display font for hero/h1/h2/h3, matching spookyluke.com.
// Google Fonts renamed "Big Shoulders Display" to just "Big Shoulders".
const bigShoulders = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VIP Experience | RL Clubhouse",
  description:
    "Improve your overall Rocket League skill faster through 1:1 pro coaching, custom training routines, and real accountability.",
  openGraph: {
    title: "VIP Experience | RL Clubhouse",
    description:
      "1:1 pro coaching, custom training routines, and real accountability so you actually rank up in 6 weeks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jakarta.variable} ${bigShoulders.variable} antialiased`}
    >
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
