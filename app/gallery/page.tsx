import { Camera, Heart } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import GalleryGrid from "./GalleryGrid";

// Server Component — fetch data langsung dari DB
async function getUploads() {
  try {
    const uploads = await prisma.upload.findMany({
      orderBy: { createdAt: "desc" },
    });
    return uploads.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const uploads = await getUploads();

  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          background:
            "radial-gradient(ellipse at top, #1a0010 0%, #0a0005 50%, #050002 100%)",
        }}
      />
      {/* Pink glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-600/8 rounded-full blur-[120px] pointer-events-none z-[-1]" />

      <div className="max-w-7xl mx-auto px-4 py-10 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <Link
              href="/"
              className="text-pink-400 hover:text-pink-300 transition-colors text-sm flex items-center gap-1 mb-3"
            >
              &larr; Kembali ke Beranda
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <Camera className="text-primary w-8 h-8" />
              Galeri Kenangan 📸
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Semua foto yang pernah dikirim, tersimpan di sini.
            </p>
          </div>

          {/* Stats card */}
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md border border-pink-500/20 px-6 py-3 rounded-2xl">
            <div className="bg-primary/20 p-2 rounded-full">
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">{uploads.length}</p>
              <p className="text-gray-400 text-xs">Kenangan tersimpan</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent mb-10" />

        {/* Gallery Grid */}
        <GalleryGrid uploads={uploads} />
      </div>
    </main>
  );
}
