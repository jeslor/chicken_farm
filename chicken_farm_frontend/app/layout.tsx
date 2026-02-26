import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmFlock – Chicken Manager",
  description: "Manage your chicken flock with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased farm-bg min-h-screen`}
      >
        <Navbar />
        <div className="pb-16">{children}</div>
        <footer className="text-center text-amber-400 text-sm py-6">
          🌾 FarmFlock &mdash; Keep your flock happy &amp; healthy
        </footer>
      </body>
    </html>
  );
}
