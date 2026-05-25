import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/contexts/MusicContext";
import MusicPlayer from "@/components/MusicPlayer";
import GlobalEffects from "@/components/GlobalEffects";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Untukmu — Perjalanan Romantis Kita",
  description: "Tempat spesial untuk kenangan kita berdua",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Cegah zoom manual agar layout tidak rusak
  themeColor: "#050005",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-dvh relative antialiased`}>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0010] via-background to-background" />
        <MusicProvider>
          <LoadingScreen />
          <GlobalEffects />
          {children}
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
