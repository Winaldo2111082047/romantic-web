"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Mempersiapkan sesuatu yang spesial...",
    "Sebentar ya...",
    "Hampir siap ❤️",
  ];

  useEffect(() => {
    // Cycle through texts
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 900);

    // Hide loading screen after 2.8s
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => {
      clearInterval(textTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a0010 0%, #0a0005 50%, #020001 100%)",
          }}
        >
          {/* Glow behind heart */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]" />

          {/* Animated Heart */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1, 1.12, 1],
              rotate: [0, -4, 4, -2, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-7xl md:text-8xl mb-8 relative z-10 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
          >
            ❤️
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-pink-500/50"
          />

          {/* Animated text */}
          <div className="relative z-10 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="text-pink-300/80 text-base md:text-lg font-light tracking-widest text-center"
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Loading dots */}
          <div className="flex gap-2 mt-8 relative z-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-pink-500"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
