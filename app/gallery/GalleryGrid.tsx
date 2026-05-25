"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

interface Upload {
  id: string;
  imageUrl: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GalleryGrid({ uploads }: { uploads: Upload[] }) {
  if (uploads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="text-6xl mb-4">📷</div>
        <p className="text-gray-400 text-lg">Belum ada foto yang diupload.</p>
        <p className="text-gray-600 text-sm mt-2">Foto yang dikirim akan muncul di sini.</p>
      </motion.div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {uploads.map((upload, index) => (
        <motion.div
          key={upload.id}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.07 }}
          className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-pink-500/10 bg-black/20 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <Image
              src={upload.imageUrl}
              alt={`Foto ${index + 1}`}
              width={600}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                <p className="text-white text-xs font-medium leading-tight">
                  {formatDate(upload.createdAt)}
                </p>
              </div>
            </div>

            {/* Always visible subtle gradient at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Date badge always visible */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 group-hover:opacity-0 transition-opacity duration-300">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400 flex-shrink-0" />
              <p className="text-pink-200/70 text-[10px] truncate">
                {formatDate(upload.createdAt)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
