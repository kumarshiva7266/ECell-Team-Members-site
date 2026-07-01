import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Cell | Crew United — Meet the Team",
  description: "Meet the passionate innovators, entrepreneurs, and leaders of our Entrepreneurship Cell — building the future one startup at a time.",
  keywords: ["E-Cell", "Entrepreneurship", "Startup", "Team", "College", "Innovation"],
  openGraph: {
    title: "E-Cell | Crew United",
    description: "Collaborate · Innovate · Inspire · Grow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-[#030303] text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
