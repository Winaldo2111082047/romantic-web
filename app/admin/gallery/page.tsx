"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Image as ImageIcon, Heart } from "lucide-react";

const memories = [
  { id: 1, url: "https://via.placeholder.com/300x400/1a0010/ec4899?text=Kenangan+1", caption: "Perjalanan pertama kita" },
  { id: 2, url: "https://via.placeholder.com/400x300/1a0010/ec4899?text=Kenangan+2", caption: "Kencan ngopi" },
  { id: 3, url: "https://via.placeholder.com/300x300/1a0010/ec4899?text=Kenangan+3", caption: "Hanya kita berdua" },
  { id: 4, url: "https://via.placeholder.com/400x500/1a0010/ec4899?text=Kenangan+4", caption: "Ngobrol sampai larut malam" },
  { id: 5, url: "https://via.placeholder.com/300x200/1a0010/ec4899?text=Kenangan+5", caption: "Senyum itu" },
  { id: 6, url: "https://via.placeholder.com/400x400/1a0010/ec4899?text=Kenangan+6", caption: "Selamanya" },
];

export default function AdminGalleryPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 relative">
      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors block mb-2">
              &larr; Kembali ke Beranda
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ImageIcon className="text-primary" /> Galeri Kenangan 📸
            </h1>
            <p className="text-gray-400 mt-2">Semua momen indah kita dalam satu tempat.</p>
          </div>

          <div className="glass px-6 py-3 rounded-full flex items-center gap-2 border border-primary/30">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="text-white font-medium">{memories.length} Kenangan</span>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid glass-card p-3 group relative overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium text-lg drop-shadow-md">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
