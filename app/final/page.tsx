"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";

export default function FinalPage() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoPosition({ x: newX, y: newY });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!answer ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10 text-center flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
              Mau jadi milikku selamanya? 💍
            </h1>

            <div className="flex gap-8 items-center justify-center relative w-full h-32">
              <button
                onClick={() => setAnswer("yes")}
                className="px-10 py-4 text-2xl rounded-full bg-primary text-white font-bold hover:bg-pink-500 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              >
                Iya! 💖
              </button>

              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="absolute right-[20%] px-10 py-4 text-2xl rounded-full bg-gray-800 text-gray-400 font-bold"
              >
                Tidak
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center glass-card p-12 max-w-xl"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-primary mb-6">
              Aku Tahu! 🎉
            </h2>
            <p className="text-xl text-gray-200">
              Kamu bikin aku jadi orang paling bahagia di dunia. Aku janji akan selalu menjaga setiap momen bersamamu.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
