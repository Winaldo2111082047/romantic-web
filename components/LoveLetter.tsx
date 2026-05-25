"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart } from "lucide-react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Hidden easter egg logic
  useEffect(() => {
    if (clickCount >= 3) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 5000); // hilang setelah 5 detik
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <>
      {/* Floating Letter Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-pink-600/20 backdrop-blur-md border border-pink-400/30 flex items-center justify-center text-pink-300 hover:bg-pink-600/40 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]"
      >
        <Mail className="w-5 h-5" />
      </motion.button>

      {/* Love Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#2a0816] to-[#120208] border border-pink-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-primary" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-pink-400/60 hover:text-pink-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div 
                className="flex justify-center mb-4 cursor-pointer"
                onClick={() => setClickCount(p => p + 1)}
              >
                <Heart className={`w-10 h-10 ${showEasterEgg ? "text-red-500 fill-red-500 animate-bounce" : "text-primary fill-primary"}`} />
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-pink-200 font-serif italic">My Dearest...</h3>
                <p className="text-pink-100/80 text-sm leading-relaxed text-left font-serif">
                  Mungkin aku jarang bilang ini secara langsung, tapi keberadaanmu benar-benar mengubah duniaku jadi lebih cerah. 
                  Setiap notifikasi darimu, setiap senyummu, adalah hal favoritku di dunia ini.<br/><br/>
                  Terima kasih ya sudah jadi dirimu sendiri. I'm so lucky to have you. 🌹
                </p>
                <p className="text-pink-400 font-serif italic text-right mt-4">- Always Yours</p>
              </div>

              {/* Easter egg message */}
              <AnimatePresence>
                {showEasterEgg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  >
                    You found the secret! I love you! 🥺❤️
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
