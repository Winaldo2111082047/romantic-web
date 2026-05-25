"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ── Confetti ──────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#ec4899","#f9a8d4","#fbbf24","#34d399","#60a5fa","#a78bfa","#fb7185","#ffffff"];

function Confetti() {
  const pieces = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 9 + 5,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2.5 + 2,
    rotate: Math.random() * 720 - 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-[-16px] rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ y: -16, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: p.rotate, x: [0, Math.random() * 80 - 40] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ForeverPage() {
  const [answered, setAnswered] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const moveNoButton = useCallback(() => {
    const maxX = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.28, 130) : 110;
    const maxY = typeof window !== "undefined" ? Math.min(window.innerHeight * 0.18, 90) : 70;
    setNoPos({ x: (Math.random() * 2 - 1) * maxX, y: (Math.random() * 2 - 1) * maxY });
    setNoCount((c) => c + 1);
  }, []);

  const handleYes = () => {
    setAnswered(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const noLabels = ["NO 😈", "Jangan! 😤", "Hei! 🫣", "Coba lagi? 😏", "Ga bisa! 😂", "Hampir! 😋"];
  const currentNoLabel = noLabels[Math.min(noCount, noLabels.length - 1)];

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-8 overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={answered ? "bg-yes" : "bg-q"}
          className="fixed inset-0 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: answered
              ? "radial-gradient(ellipse at center, #3d0020 0%, #1a000e 50%, #050002 100%)"
              : "radial-gradient(ellipse at center, #200010 0%, #0d0005 60%, #050002 100%)",
          }}
        />
      </AnimatePresence>

      {/* Pink glow */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] z-[-1] pointer-events-none"
        animate={{
          width: answered ? 500 : 350,
          height: answered ? 500 : 350,
          backgroundColor: answered ? "rgba(236,72,153,0.18)" : "rgba(236,72,153,0.1)",
        }}
        transition={{ duration: 1.5 }}
      />

      {showConfetti && <Confetti />}

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="z-10 flex flex-col items-center text-center gap-8 w-full max-w-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl"
            >
              💍
            </motion.div>

            <h1
              className="text-2xl md:text-4xl font-bold text-white leading-snug px-2"
              style={{ textShadow: "0 0 25px rgba(236,72,153,0.7)" }}
            >
              Will You Stay With Me Forever? ❤️
            </h1>

            {noCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-300/60 text-sm -mt-4"
              >
                {noCount === 1 && "Ups, tombol itu suka kabur 😋"}
                {noCount === 2 && "Masa iya mau pilih yang itu? 😤"}
                {noCount >= 3 && "Yakin masih mau nekat? 😂"}
              </motion.p>
            )}

            {/* Buttons */}
            <div className="relative w-full h-32 flex items-center justify-center">
              {/* YES — always accessible, left side */}
              <motion.button
                onClick={handleYes}
                whileTap={{ scale: 0.94 }}
                className="absolute left-0 z-20 px-7 py-4 text-lg md:text-xl rounded-2xl font-bold text-white bg-gradient-to-r from-pink-600 to-primary shadow-[0_0_20px_rgba(236,72,153,0.5)] min-h-[56px]"
              >
                YES ❤️
              </motion.button>

              {/* NO — runs away on touch */}
              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 280, damping: 14 }}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                onPointerDown={(e) => { e.preventDefault(); moveNoButton(); }}
                className="absolute right-0 z-10 px-7 py-4 text-lg md:text-xl rounded-2xl font-bold text-gray-400 bg-gray-800/80 border border-gray-700 min-h-[56px] touch-none select-none"
              >
                {currentNoLabel}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
            className="z-20 flex flex-col items-center text-center gap-6 glass-card max-w-sm w-full mx-4 py-10 px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="text-6xl md:text-7xl mb-2"
            >
              ❤️
            </motion.div>

            {/* Foto Dia (Placeholder) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.5)] mx-auto mb-2"
            >
              {/* GANTI FOTO DI SINI: Simpan foto bernama "foto-dia.jpg" di folder public/ */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/foto-dia.jpg" 
                alt="My Love" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback jika foto belum ditambahkan
                  e.currentTarget.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80";
                }}
              />
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-primary to-pink-400 leading-tight">
              I Love You More Than Yesterday ❤️
            </h2>

            <p className="text-pink-200/75 text-sm md:text-base leading-relaxed">
              Makasih ya udah bilang iya. Aku akan selalu jaga kamu dan momen ini selamanya. 🌹
            </p>

            <div className="flex gap-3 text-3xl">
              {["💕","🌸","✨","🌹","💫"].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
