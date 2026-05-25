"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Camera, UploadCloud, X, Loader2 } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setErrorMsg("Hanya file gambar yang diperbolehkan ya! 🥺");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("Ukuran gambar terlalu besar (Maks 5MB) 😢");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) { setErrorMsg("Pilih foto dulu dong... 🥺"); return; }
    setIsLoading(true);
    setErrorMsg("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal mengunggah foto.");
      router.push("/journey");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 relative overflow-x-hidden">
      <div className="z-10 w-full max-w-sm md:max-w-lg">
        {/* Back button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors bg-black/30 px-4 py-2.5 rounded-full border border-pink-500/30 backdrop-blur-md text-sm min-h-[44px]"
          >
            &larr; Kembali
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card w-full flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.12)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/8 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="bg-primary/20 p-4 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-pink-500/25 rounded-full blur-md animate-pulse" />
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-pink-300 relative z-10" />
          </div>

          <h2 className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-primary mb-1">
            Sebelum lanjut...
          </h2>
          <p className="text-pink-100/75 mb-6 text-base md:text-lg">kirim pap dulu 😋</p>

          {/* Upload Area */}
          <div
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className={`w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
              preview
                ? "border-primary/50 aspect-square md:aspect-video"
                : "border-primary/30 aspect-square md:aspect-video hover:border-primary/60 hover:bg-black/15"
            }`}
          >
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  className="absolute inset-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium bg-black/60 px-4 py-2 rounded-full text-sm">Ganti Foto</p>
                  </div>
                  {!isLoading && (
                    <button
                      onClick={handleClear}
                      className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 active:bg-red-600 text-white p-2.5 rounded-full transition-all shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-6 gap-3"
                >
                  <UploadCloud className="w-10 h-10 text-pink-400/60 group-hover:text-pink-400 group-active:text-pink-400 transition-colors" />
                  <p className="text-gray-300 font-medium text-sm md:text-base">Ketuk untuk mengambil foto</p>
                  <p className="text-gray-500 text-xs">Hanya Kamera (Live Pap) 📸 • Maks 5MB</p>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="user"
              className="hidden"
            />
          </div>

          {/* Error */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-4 bg-red-500/10 px-4 py-2.5 rounded-xl border border-red-500/20 w-full text-center"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <button
            onClick={handleUpload}
            disabled={!preview || isLoading}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 min-h-[56px] ${
              !preview
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-600 to-primary text-white shadow-[0_0_20px_rgba(236,72,153,0.35)] active:scale-[0.97] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : (
              "Lanjut ✨"
            )}
          </button>
        </motion.div>
      </div>
    </main>
  );
}
