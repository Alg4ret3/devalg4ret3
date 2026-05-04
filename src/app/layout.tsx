import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergio Muñoz | Computer Engineer & Full Stack Developer",
  description:
    "Portfolio of Sergio Muñoz, Computer Engineer specialized in React, Node.js and High Performance Animations.",
  openGraph: {
    title: "Sergio Muñoz | Computer Engineer",
    description: "Portfolio specialized in high-performance web development and AI integration.",
    url: "https://sergiomunoz.dev",
    siteName: "Sergio Muñoz Portfolio",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
