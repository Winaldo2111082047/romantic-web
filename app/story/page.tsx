"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

// ─── Data Slide ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    text: "Aku cuma mau bilang...",
    sub: "",
    emoji: "💭",
    color: "from-[#1a0010] to-[#0d0005]",
  },
  {
    id: 2,
    text: "Terima kasih udah hadir di hidup aku.",
    sub: "Kamu bukan kebetulan. Kamu adalah jawaban.",
    emoji: "🌹",
    color: "from-[#200010] to-[#0a0005]",
  },
  {
    id: 3,
    text: "Semua terasa lebih indah sejak kenal kamu.",
    sub: "Warna dunia berubah. Jadi lebih cerah.",
    emoji: "🌸",
    color: "from-[#1a0015] to-[#050005]",
  },
  {
    id: 4,
    text: "Dan aku masih mau terus sama kamu.",
    sub: "Hari ini, besok, dan seterusnya.",
    emoji: "❤️",
    color: "from-[#250008] to-[#0a0002]",
  },
];

// ─── Floating Particle ───────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const PARTICLE_EMOJIS = ["✨", "🌸", "💫", "⭐", "💕", "🌟"];

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initial: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
    }));
    setParticles(initial);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-60px] select-none"
          style={{ left: `${p.x}%`, fontSize: `${p.size}px`, opacity: 0.25 }}
          animate={{ y: "-110vh", x: [0, 30, -20, 10, 0], opacity: [0.25, 0.4, 0.1, 0.3, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated Text ───────────────────────────────────────────────────────────
function AnimatedText({ text, key: _key }: { text: string; key: string }) {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="flex flex-wrap justify-center gap-x-3 gap-y-1"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{ textShadow: "0 0 30px rgba(236,72,153,0.6)" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function StoryPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const isLast = current === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push("/forever");
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const slide = slides[current];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${slide.id}`}
          className={`fixed inset-0 bg-gradient-to-b ${slide.color} z-[-1]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Radial pink glow */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Mute button dikelola oleh global MusicPlayer */}

      {/* Slide indicator dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? "w-6 h-2 bg-primary shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Main slide content */}
      <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-screen text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-${slide.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Emoji */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-6xl md:text-8xl"
            >
              {slide.emoji}
            </motion.div>

            {/* Main text (animated word by word) */}
            <AnimatedText text={slide.text} key={`text-${slide.id}`} />

            {/* Subtext */}
            {slide.sub && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-2xl text-pink-200/70 font-light tracking-wide max-w-xl"
              >
                {slide.sub}
              </motion.p>
            )}

            {/* Next / Lanjut button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              onClick={handleNext}
              className="mt-8 flex flex-col items-center gap-2 group"
            >
              {isLast ? (
                <span className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 to-primary text-white font-bold text-lg shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300">
                  Ada yang ingin aku tanyakan... 💍
                </span>
              ) : (
                <>
                  <span className="text-pink-300/60 text-sm tracking-widest uppercase">Selanjutnya</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="bg-black/30 backdrop-blur-md border border-pink-500/30 p-3 rounded-full group-hover:border-pink-500/70 group-hover:bg-black/50 transition-all"
                  >
                    <ChevronDown className="w-6 h-6 text-pink-400" />
                  </motion.div>
                </>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }}
      />
    </main>
  );
}
