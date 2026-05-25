"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

// Fake chat messages
const CHAT_MESSAGES = [
  { id: 1, sender: "me", text: "Hey...", delay: 1000 },
  { id: 2, sender: "me", text: "Inget nggak pertama kali kita ngobrol?", delay: 3000 },
  { id: 3, sender: "you", text: "Hmm, iya inget dong wkwk", delay: 5500 },
  { id: 4, sender: "me", text: "Gak nyangka ya bisa sejauh ini ❤️", delay: 7500 },
];

export default function JourneyPage() {
  const [messages, setMessages] = useState<typeof CHAT_MESSAGES>([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show chat messages one by one
    const timers = CHAT_MESSAGES.map((msg) =>
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, msg.delay)
    );

    // Show countdown after chat finishes
    const countdownTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 10000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(countdownTimer);
    };
  }, []);

  useEffect(() => {
    // Auto scroll chat
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simple countdown logic (Menuju Matcha Date)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  
  useEffect(() => {
    if (!showCountdown) return;
    // TANGGAL MATCHA DATE
    // 23 Mei 2026 (Bulan di JS indexnya mulai dari 0, atau format string 'YYYY-MM-DD')
    const matchaDate = new Date("2026-05-23T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - matchaDate; // Sekarang menghitung waktu SEJAK tanggal tersebut (Count-Up)

      if (distance < 0) {
        // Jika karena alasan tertentu tanggalnya di masa depan
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0010] to-[#050005] z-[-1]" />

      <div className="w-full max-w-md h-[80vh] flex flex-col relative z-10">
        
        {/* Chat UI */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${m.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2.5 max-w-[80%] rounded-2xl text-sm md:text-base ${
                    m.sender === "me"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-gray-800 text-pink-50 rounded-bl-sm border border-gray-700"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Countdown Overlay */}
        <AnimatePresence>
          {showCountdown && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full glass-card p-6 rounded-t-3xl border-b-0 flex flex-col items-center shadow-[0_-10px_40px_rgba(236,72,153,0.15)]"
            >
              <div className="flex items-center gap-2 text-pink-300 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="font-medium text-sm">Waktu Bersama Sejak Matcha Date 🍵</h3>
              </div>
              
              <div className="flex gap-4 text-center w-full justify-center mb-6">
                {[
                  { label: "Hari", val: timeLeft.days },
                  { label: "Jam", val: timeLeft.hours },
                  { label: "Menit", val: timeLeft.mins },
                  { label: "Detik", val: timeLeft.secs },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-white bg-black/40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl border border-pink-500/20 shadow-inner">
                      {item.val}
                    </span>
                    <span className="text-[10px] text-pink-200/60 mt-1 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/story")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-primary text-white font-bold text-base active:scale-[0.97] transition-all"
              >
                Lanjut ke Cerita ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
