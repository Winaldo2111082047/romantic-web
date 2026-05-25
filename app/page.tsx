"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Aku punya sesuatu buat kamu...";

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          currentText += fullText[currentIndex];
          setTypedText(currentText);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 90);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-8 relative overflow-x-hidden">
      <div className="z-10 flex flex-col items-center w-full max-w-sm md:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="glass-card w-full flex flex-col items-center text-center px-6 py-10 md:px-10 md:py-12 space-y-6 relative overflow-hidden"
        >
          {/* Glow accent */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-primary z-10 leading-tight"
          >
            Hai Cantik ❤️
          </motion.h1>

          <div className="min-h-[32px] flex items-center justify-center z-10 w-full">
            <p className="text-base md:text-lg text-pink-100 font-medium tracking-wide text-center">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-5 bg-pink-400 ml-0.5 translate-y-0.5 align-middle"
              />
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
            className="w-full pt-4 z-10"
          >
            <Link href="/upload" className="w-full block">
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-primary text-white font-bold text-lg active:scale-[0.97] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 min-h-[56px]">
                Masuk ✨
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
