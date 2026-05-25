"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import Link from "next/link";

// Helper Web Audio API for typing sound
const playTick = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore if audio fails
  }
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  
  // GANTI TANGGAL ULANG TAHUN DI SINI (Format: DDMMYYYY)
  const CORRECT_PIN = "09012003"; 

  const handlePin = (num: string) => {
    if (pin.length < CORRECT_PIN.length) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === CORRECT_PIN.length) {
        if (newPin === CORRECT_PIN) {
          setIsAuthenticated(true);
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 800);
        }
      }
    }
  };

  const [typedText, setTypedText] = useState("");
  const fullText = "Aku punya sesuatu buat kamu...";

  useEffect(() => {
    if (!isAuthenticated) return;
    
    let currentText = "";
    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          currentText += fullText[currentIndex];
          setTypedText(currentText);
          playTick();
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 90);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(startDelay);
  }, [isAuthenticated]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-8 relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full max-w-xs flex flex-col items-center"
          >
            <div className="bg-primary/20 p-4 rounded-full mb-6">
              {error ? <Lock className="w-8 h-8 text-red-400" /> : <Unlock className="w-8 h-8 text-pink-400" />}
            </div>
            <h2 className="text-xl font-bold text-white mb-2 text-center">Masukkan Password</h2>
            <p className="text-pink-200/60 text-sm mb-8 text-center">Petunjuk: Tanggal ulang tahun aku (DDMMYY)</p>
            
            <div className="flex gap-3 mb-8">
              {Array.from({ length: CORRECT_PIN.length }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    pin.length > i ? "bg-primary shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "bg-white/20"
                  } ${error ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : ""}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (btn === "C") setPin("");
                    else if (btn === "⌫") setPin(pin.slice(0, -1));
                    else handlePin(btn.toString());
                  }}
                  className="h-16 rounded-full glass flex items-center justify-center text-xl font-medium hover:bg-white/10 active:scale-95 transition-all text-pink-100"
                >
                  {btn}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="z-10 w-full max-w-sm md:max-w-md glass-card flex flex-col items-center text-center px-6 py-10 md:px-10 md:py-12 space-y-6 relative overflow-hidden"
          >
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
        )}
      </AnimatePresence>
    </main>
  );
}
